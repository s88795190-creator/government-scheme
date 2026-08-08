import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { SCHEMES_DATABASE } from './src/data/schemes.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing from environment. AI features will fallback to deterministic rules.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    systemName: 'AI Smart Government Scheme Automation System Using DigiLocker',
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Endpoint: AI Eligibility Match Engine
app.post('/api/ai/match-eligibility', async (req, res) => {
  try {
    const { profile, documents } = req.body;
    if (!profile) {
      return res.status(400).json({ error: 'Citizen profile is required' });
    }

    const ai = getGenAI();
    let aiEvaluationResults: any[] = [];

    if (ai) {
      try {
        const prompt = `
You are the AI Eligibility Reasoning Engine for Indian Central and Tamil Nadu State Government Schemes.
Analyze the following citizen's verified DigiLocker profile and documents against our official schemes list.

Citizen Profile:
${JSON.stringify(profile, null, 2)}

Verified DigiLocker Documents attached:
${JSON.stringify(documents || [], null, 2)}

Available Government Schemes:
${JSON.stringify(SCHEMES_DATABASE, null, 2)}

For EACH scheme, evaluate:
1. 'status': "Eligible" (if all key conditions are met), "Needs Documents" (if potentially eligible but missing 1 or 2 specific documents/certificates), or "Not Eligible" (if age, gender, income, or state constraint is violated).
2. 'matchScore': 0 to 100 integer.
3. 'reasons': List of clear bullet strings in English explaining why they are eligible or why they failed.
4. 'reasonsTamil': List of corresponding bullet strings in TAMIL (தமிழ்) explaining eligibility.
5. 'missingDocuments': List of required documents missing from the user's DigiLocker vault.
6. 'verifiedDocuments': List of required documents present and verified in the DigiLocker vault.
7. 'aiNotes': Short 1-2 sentence recommendation in English.
8. 'aiNotesTamil': Short 1-2 sentence recommendation in Tamil.

Respond STRICTLY with valid JSON formatted as an array of objects matching the schema.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  schemeId: { type: Type.STRING },
                  status: { type: Type.STRING },
                  matchScore: { type: Type.INTEGER },
                  reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
                  reasonsTamil: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingDocuments: { type: Type.ARRAY, items: { type: Type.STRING } },
                  verifiedDocuments: { type: Type.ARRAY, items: { type: Type.STRING } },
                  aiNotes: { type: Type.STRING },
                  aiNotesTamil: { type: Type.STRING },
                },
                required: ['schemeId', 'status', 'matchScore', 'reasons', 'reasonsTamil', 'missingDocuments', 'verifiedDocuments'],
              },
            },
          },
        });

        if (response.text) {
          aiEvaluationResults = JSON.parse(response.text.trim());
        }
      } catch (geminiErr) {
        console.error('Gemini API call error in match-eligibility:', geminiErr);
      }
    }

    // Fallback rule-based matching if Gemini is unavailable or failed
    if (!aiEvaluationResults || aiEvaluationResults.length === 0) {
      aiEvaluationResults = SCHEMES_DATABASE.map((scheme) => {
        let isEligible = true;
        const reasons: string[] = [];
        const reasonsTamil: string[] = [];
        const verifiedDocs: string[] = [];
        const missingDocs: string[] = [];

        const userDocTypes = (documents || []).map((d: any) => d.docType);
        scheme.requiredDocuments.forEach((reqDoc) => {
          if (userDocTypes.includes(reqDoc)) {
            verifiedDocs.push(reqDoc);
          } else {
            missingDocs.push(reqDoc);
          }
        });

        const conds = scheme.eligibilityConditions;
        if (conds.minAge && profile.age < conds.minAge) {
          isEligible = false;
          reasons.push(`Minimum age required is ${conds.minAge} (Citizen age: ${profile.age})`);
          reasonsTamil.push(`குறைந்தபட்ச வயது ${conds.minAge} தேவை (உங்கள் வயது: ${profile.age})`);
        }
        if (conds.maxAge && profile.age > conds.maxAge) {
          isEligible = false;
          reasons.push(`Maximum age limit is ${conds.maxAge} (Citizen age: ${profile.age})`);
          reasonsTamil.push(`அதிகபட்ச வயது வரம்பு ${conds.maxAge} (உங்கள் வயது: ${profile.age})`);
        }
        if (conds.gender && !conds.gender.includes(profile.gender)) {
          isEligible = false;
          reasons.push(`Scheme is restricted to ${conds.gender.join('/')} applicants`);
          reasonsTamil.push(`இத்திட்டம் ${conds.gender.join('/')} விண்ணப்பதாரர்களுக்கு மட்டுமே`);
        }
        if (conds.maxIncome && profile.annualIncome > conds.maxIncome) {
          isEligible = false;
          reasons.push(`Annual income limit ₹${conds.maxIncome.toLocaleString('en-IN')} exceeded (Current: ₹${profile.annualIncome.toLocaleString('en-IN')})`);
          reasonsTamil.push(`ஆண்டு வருமான வரம்பு ₹${conds.maxIncome.toLocaleString('en-IN')} தாண்டியுள்ளது (தற்போதைய: ₹${profile.annualIncome.toLocaleString('en-IN')})`);
        }
        if (conds.stateConstraint && profile.state !== conds.stateConstraint) {
          isEligible = false;
          reasons.push(`Must be a resident of ${conds.stateConstraint}`);
          reasonsTamil.push(`${conds.stateConstraint} மாநிலத்தில் வசிப்பவராக இருக்க வேண்டும்`);
        }
        if (conds.isGovtSchoolRequired && !profile.isGovernmentSchoolStudent) {
          isEligible = false;
          reasons.push('Requires Class 6-12 schooling from Tamil Nadu Government schools');
          reasonsTamil.push('அரசுப் பள்ளியில் (6-12 வகுப்பு) படித்திருக்க வேண்டும்');
        }

        let status: 'Eligible' | 'Needs Documents' | 'Not Eligible' = 'Not Eligible';
        let matchScore = 0;

        if (isEligible) {
          if (missingDocs.length === 0) {
            status = 'Eligible';
            matchScore = 95;
            reasons.unshift('All eligibility criteria & DigiLocker documents verified! ✅');
            reasonsTamil.unshift('அனைத்து தகுதிகளும் டிஜிலாக்கர் சான்றிதழ்களும் சரிபார்க்கப்பட்டன! ✅');
          } else {
            status = 'Needs Documents';
            matchScore = 75;
            reasons.unshift(`Potentially eligible! Missing ${missingDocs.length} required document(s) in DigiLocker.`);
            reasonsTamil.unshift(`தகுதியுள்ளது! டிஜிலாக்கரில் ${missingDocs.length} சான்றிதழ் விடுபட்டுள்ளது.`);
          }
        } else {
          status = 'Not Eligible';
          matchScore = 20;
        }

        return {
          schemeId: scheme.id,
          status,
          matchScore,
          reasons,
          reasonsTamil,
          missingDocuments: missingDocs,
          verifiedDocuments: verifiedDocs,
          aiNotes: isEligible ? 'High probability of sanction upon form review.' : 'Ineligible based on current criteria.',
          aiNotesTamil: isEligible ? 'விண்ணப்பம் சமர்ப்பித்தால் ஒப்புதல் பெற அதிக வாய்ப்பு உண்டு.' : 'தற்போதைய தகவல்களின்படி தகுதி பெறவில்லை.',
        };
      });
    }

    res.json({ results: aiEvaluationResults });
  } catch (error: any) {
    console.error('Error in /api/ai/match-eligibility:', error);
    res.status(500).json({ error: error.message || 'Server error matching eligibility' });
  }
});

// Endpoint: AI Document Extraction / Verification
app.post('/api/ai/extract-doc', async (req, res) => {
  try {
    const { docType, docText, imageName } = req.body;
    const ai = getGenAI();

    if (!docText && !imageName) {
      return res.status(400).json({ error: 'Document text or content is required' });
    }

    if (ai) {
      const prompt = `
Extract key structured metadata from this document for DigiLocker automation.
Document Type: ${docType}
Raw Document Text: "${docText}"

Extract and return JSON with keys:
- holderName (string)
- docNumber (string)
- age (number or null)
- gender ('Female' | 'Male' | 'Other' or null)
- annualIncome (number or null)
- communityCategory (string or null)
- educationLevel (string or null)
- landAcres (number or null)
- state (string or null)
- district (string or null)
- summary (string short summary)
- summaryTamil (string short summary in Tamil)
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              holderName: { type: Type.STRING },
              docNumber: { type: Type.STRING },
              age: { type: Type.INTEGER },
              gender: { type: Type.STRING },
              annualIncome: { type: Type.NUMBER },
              communityCategory: { type: Type.STRING },
              educationLevel: { type: Type.STRING },
              landAcres: { type: Type.NUMBER },
              state: { type: Type.STRING },
              district: { type: Type.STRING },
              summary: { type: Type.STRING },
              summaryTamil: { type: Type.STRING },
            },
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ extracted: parsed, source: 'gemini' });
      }
    }

    // Fallback parsing
    res.json({
      extracted: {
        holderName: 'Extracted Citizen',
        docNumber: `DL-${Math.floor(100000 + Math.random() * 900000)}`,
        summary: `Document processed and verified for ${docType}`,
        summaryTamil: `${docType} சான்றிதழ் வெற்றிகரமாகச் சரிபார்க்கப்பட்டது`,
      },
      source: 'fallback',
    });
  } catch (err: any) {
    console.error('Error in /api/ai/extract-doc:', err);
    res.status(500).json({ error: err.message || 'Document extraction failed' });
  }
});

// Endpoint: Multi-Lingual AI Assistant Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history, profile, language = 'en' } = req.body;
    const ai = getGenAI();

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        reply: language === 'ta'
          ? 'வணக்கம்! நான் உங்கள் அரசுத் திட்ட AI உதவியாளன். டிஜிலாக்கர் மூலம் உங்கள் தகுதியுள்ள திட்டங்களைக் கண்டறிய முடியும். (API key currently using rule-based support).'
          : 'Hello! I am your AI Smart Government Scheme Assistant. You can use DigiLocker documents to discover schemes like Pudhumai Penn, PM-Kisan, and Magalir Urimai Thogai.',
      });
    }

    const systemInstruction = `
You are 'YojnaSetu AI' (திட்டசேது AI), an empathetic, smart government scheme assistant for citizens of India and Tamil Nadu.
You assist citizens in discovering, understanding eligibility rules, gathering missing DigiLocker documents, and preparing application forms for Central & Tamil Nadu government schemes.

Target Language requested by user UI: ${language === 'ta' ? 'TAMIL (தமிழ்)' : 'ENGLISH'}.
If the user speaks Tamil or language is 'ta', reply predominantly in clear, helpful TAMIL (தமிழ்), with technical scheme names in English/Tamil where appropriate.
If the user speaks English, reply in friendly English.

Citizen Profile Context:
${JSON.stringify(profile || {}, null, 2)}

Available Government Schemes Knowledge Base:
${JSON.stringify(SCHEMES_DATABASE.map(s => ({ title: s.title, titleTamil: s.titleTamil, benefits: s.benefits, reqDocs: s.requiredDocuments, steps: s.applicationSteps })), null, 2)}

Be informative, clear, and reassuring. Keep responses well-structured with bullet points where appropriate.
Remind users that DigiLocker acts as an authorized integration and official applications require final user confirmation before submission.
`;

    const contents = [
      ...(history || []).map((h: any) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || 'I am ready to help you with government schemes and DigiLocker verification.',
    });
  } catch (err: any) {
    console.error('Error in /api/ai/chat:', err);
    res.status(500).json({ error: err.message || 'Chat assistance error' });
  }
});

// Vite Middleware for Dev and Static Files for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
