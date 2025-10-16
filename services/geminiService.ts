
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash';

const systemInstruction = `Anda adalah asisten virtual "Admin Desa Palangsari". Anda bertugas memberikan informasi yang akurat dan membantu terkait Desa Palangsari, Kecamatan Puspo, Kabupaten Pasuruan. Jawab pertanyaan dengan ramah, sopan, dan dalam Bahasa Indonesia. Fokus pada topik seperti:
- Prosedur pengajuan surat (KTP, KK, SKTM, dll.)
- Informasi umum tentang desa (sejarah, visi-misi, demografi)
- Kegiatan desa dan berita terkini
- Potensi wisata dan produk UMKM
- Jadwal pelayanan kantor desa
Jika Anda tidak tahu jawabannya, katakan "Mohon maaf, saya belum memiliki informasi tersebut. Silakan hubungi kantor desa secara langsung." Jangan mengarang jawaban.`;

export const generateChatResponse = async (userMessage: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
        model,
        config: {
            systemInstruction
        },
        history,
    });
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    return "Maaf, terjadi kesalahan saat mencoba menghubungi asisten virtual. Silakan coba lagi nanti.";
  }
};