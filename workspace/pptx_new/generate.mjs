import pptxgen from 'pptxgenjs';
import { pathToFileURL } from 'url';
import path from 'path';

const html2pptxPath = pathToFileURL('C:/Users/vasiv/.claude/skills/pptx/scripts/html2pptx.js').href;
const html2pptxModule = await import(html2pptxPath);
const html2pptx = html2pptxModule.default;

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'ООО Красный Яр';
    pptx.title = 'Красный Яр - Индустриальный парк';
    pptx.company = 'ООО Красный Яр';

    const slideDir = 'D:/Claude Code/parametr-clone/workspace/pptx_new';

    // Generate all 8 slides
    for (let i = 1; i <= 8; i++) {
        console.log(`Processing slide ${i}...`);
        try {
            await html2pptx(path.join(slideDir, `slide${i}.html`), pptx);
            console.log(`Slide ${i} done`);
        } catch (err) {
            console.error(`Error on slide ${i}:`, err.message);
        }
    }

    // Save presentation
    const outputPath = 'D:/Красный Яр/Красный_Яр_2026_Лаконичная.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
