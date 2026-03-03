const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'ООО Красный Яр';
    pptx.title = 'Красный Яр - Индустриальный парк';
    pptx.company = 'ООО Красный Яр';

    // Colors
    const burgundy = '8B1538';
    const black = '0D0D0D';
    const white = 'FFFFFF';
    const grey = '888888';

    // Slide 1 - Title
    let slide = pptx.addSlide();
    slide.background = { color: black };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: '100%', fill: { color: burgundy } });
    slide.addText('BUILD-TO-SUIT', { x: 0.8, y: 1.2, w: 6, h: 0.4, fontSize: 14, color: burgundy, fontFace: 'Arial', charSpacing: 4 });
    slide.addText('КРАСНЫЙ ЯР', { x: 0.8, y: 1.6, w: 8, h: 1.2, fontSize: 56, color: white, fontFace: 'Arial', bold: true });
    slide.addText('Строительство современных производственных и складских помещений под ключ в Красноярске', { x: 0.8, y: 3, w: 5, h: 0.8, fontSize: 12, color: grey, fontFace: 'Arial' });
    slide.addText('ИНДУСТРИАЛЬНЫЙ ПАРК', { x: 7.5, y: 5, w: 2, h: 0.3, fontSize: 10, color: white, fontFace: 'Arial', align: 'right' });

    // Slide 2 - Format
    slide = pptx.addSlide();
    slide.background = { color: 'FAFAFA' };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.5, y: 0, w: 4.5, h: '100%', fill: { color: black } });
    slide.addText('ФОРМАТ РАБОТЫ', { x: 0.7, y: 0.7, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('Режим одного окна', { x: 0.7, y: 1, w: 4, h: 0.6, fontSize: 28, color: black, fontFace: 'Arial', bold: true });
    slide.addText([
        { text: '01', options: { fontSize: 20, color: burgundy, bold: true, breakLine: true } },
        { text: 'Земельный участок нужной площади', options: { fontSize: 11, color: '333333' } }
    ], { x: 0.7, y: 1.8, w: 4, h: 0.7, fontFace: 'Arial' });
    slide.addText([
        { text: '02', options: { fontSize: 20, color: burgundy, bold: true, breakLine: true } },
        { text: 'Полноценный проект под ваши задачи', options: { fontSize: 11, color: '333333' } }
    ], { x: 0.7, y: 2.6, w: 4, h: 0.7, fontFace: 'Arial' });
    slide.addText([
        { text: '03', options: { fontSize: 20, color: burgundy, bold: true, breakLine: true } },
        { text: 'Строительство за 10 месяцев', options: { fontSize: 11, color: '333333' } }
    ], { x: 0.7, y: 3.4, w: 4, h: 0.7, fontFace: 'Arial' });
    slide.addText('BTS', { x: 6.2, y: 2.2, w: 3, h: 1, fontSize: 48, color: white, fontFace: 'Arial', bold: true, align: 'center' });
    slide.addText('BUILD TO SUIT', { x: 6.2, y: 3.1, w: 3, h: 0.4, fontSize: 10, color: grey, fontFace: 'Arial', align: 'center' });

    // Slide 3 - Advantages
    slide = pptx.addSlide();
    slide.background = { color: black };
    slide.addText('ПРЕИМУЩЕСТВА', { x: 0.7, y: 0.5, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('Почему мы', { x: 0.7, y: 0.8, w: 4, h: 0.6, fontSize: 32, color: white, fontFace: 'Arial', bold: true });

    const advantages = [
        ['Городская черта', 'Участки под застройку в черте Красноярска'],
        ['IV-V класс опасности', 'Разрешённые виды производств'],
        ['Своя УК', 'Собственная управляющая компания'],
        ['10 месяцев', 'Срок строительства под ключ'],
        ['Мощности', 'Электро- и водоснабжение'],
        ['Гибкие условия', 'Лояльная ценовая политика']
    ];

    advantages.forEach((adv, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const x = 0.5 + col * 3.1;
        const y = 1.6 + row * 1.4;
        slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.05, h: 0.8, fill: { color: burgundy } });
        slide.addText(adv[0], { x: x + 0.2, y: y, w: 2.7, h: 0.35, fontSize: 12, color: white, fontFace: 'Arial', bold: true });
        slide.addText(adv[1], { x: x + 0.2, y: y + 0.35, w: 2.7, h: 0.4, fontSize: 9, color: '666666', fontFace: 'Arial' });
    });

    // Slide 4 - Formats
    slide = pptx.addSlide();
    slide.background = { color: 'FAFAFA' };
    slide.addText('ФОРМАТЫ', { x: 0.7, y: 0.5, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('Варианты сотрудничества', { x: 0.7, y: 0.8, w: 5, h: 0.6, fontSize: 32, color: black, fontFace: 'Arial', bold: true });

    const formats = [
        ['01', 'Аренда', 'Строим и сдаём в аренду готовые помещения'],
        ['02', 'BTS Продажа', 'Продаём участок и строим под ваши цели'],
        ['03', 'Готовые', 'Продажа готовых помещений']
    ];

    formats.forEach((fmt, idx) => {
        const x = 0.5 + idx * 3.1;
        slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.6, w: 2.9, h: 1.8, fill: { color: white }, line: { color: 'E0E0E0', width: 0.5 } });
        slide.addText(fmt[0], { x: x + 0.3, y: 1.75, w: 0.8, h: 0.5, fontSize: 28, color: burgundy, fontFace: 'Arial', bold: true });
        slide.addText(fmt[1], { x: x + 0.3, y: 2.25, w: 2.3, h: 0.35, fontSize: 13, color: black, fontFace: 'Arial', bold: true });
        slide.addText(fmt[2], { x: x + 0.3, y: 2.6, w: 2.3, h: 0.5, fontSize: 10, color: '666666', fontFace: 'Arial' });
    });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.7, w: 9, h: 0.8, fill: { color: burgundy } });
    slide.addText('480 м²', { x: 0.7, y: 3.85, w: 1.2, h: 0.5, fontSize: 24, color: white, fontFace: 'Arial', bold: true });
    slide.addText('Минимальная площадь помещения. Гибкий подход к делению зданий на блоки', { x: 2, y: 3.95, w: 7, h: 0.4, fontSize: 11, color: white, fontFace: 'Arial' });

    // Slide 5 - Location
    slide = pptx.addSlide();
    slide.background = { color: black };
    slide.addText('МЕСТОПОЛОЖЕНИЕ', { x: 0.7, y: 0.7, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('Красноярск', { x: 0.7, y: 1, w: 4, h: 0.6, fontSize: 28, color: white, fontFace: 'Arial', bold: true });
    slide.addText('ул. Кутузова, д.1, стр.37\nИнтеграция в мкр. Мичуринский', { x: 0.7, y: 1.7, w: 4, h: 0.7, fontSize: 11, color: grey, fontFace: 'Arial' });

    slide.addText('50', { x: 0.7, y: 2.8, w: 1, h: 0.6, fontSize: 32, color: white, fontFace: 'Arial', bold: true });
    slide.addText(' тыс', { x: 1.5, y: 2.9, w: 0.5, h: 0.4, fontSize: 12, color: burgundy, fontFace: 'Arial' });
    slide.addText('м² площадей', { x: 0.7, y: 3.35, w: 2, h: 0.3, fontSize: 9, color: '666666', fontFace: 'Arial' });

    slide.addText('12.2', { x: 2.5, y: 2.8, w: 1.2, h: 0.6, fontSize: 32, color: white, fontFace: 'Arial', bold: true });
    slide.addText(' Га', { x: 3.5, y: 2.9, w: 0.5, h: 0.4, fontSize: 12, color: burgundy, fontFace: 'Arial' });
    slide.addText('территория', { x: 2.5, y: 3.35, w: 2, h: 0.3, fontSize: 9, color: '666666', fontFace: 'Arial' });

    // Slide 6 - Construction phases
    slide = pptx.addSlide();
    slide.background = { color: 'FAFAFA' };
    slide.addText('II ОЧЕРЕДЬ', { x: 0.7, y: 0.5, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('План строительства', { x: 0.7, y: 0.8, w: 5, h: 0.6, fontSize: 28, color: black, fontFace: 'Arial', bold: true });

    // Stage 1
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.3, h: 3, fill: { color: white }, line: { color: 'E0E0E0', width: 0.5 } });
    slide.addText('I', { x: 0.7, y: 1.7, w: 0.4, h: 0.5, fontSize: 22, color: burgundy, fontFace: 'Arial', bold: true });
    slide.addText('этап', { x: 1.1, y: 1.8, w: 0.6, h: 0.4, fontSize: 12, color: black, fontFace: 'Arial', bold: true });
    slide.addText('21 000 м²', { x: 0.7, y: 2.4, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('площадь строительства', { x: 0.7, y: 2.75, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });
    slide.addText('2.8 Га', { x: 0.7, y: 3.15, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('площадь участка', { x: 0.7, y: 3.5, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });
    slide.addText('5 мВт', { x: 0.7, y: 3.9, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('электроснабжение', { x: 0.7, y: 4.25, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });

    // Stage 2
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.3, h: 3, fill: { color: white }, line: { color: 'E0E0E0', width: 0.5 } });
    slide.addText('II', { x: 5.4, y: 1.7, w: 0.5, h: 0.5, fontSize: 22, color: burgundy, fontFace: 'Arial', bold: true });
    slide.addText('этап', { x: 5.9, y: 1.8, w: 0.6, h: 0.4, fontSize: 12, color: black, fontFace: 'Arial', bold: true });
    slide.addText('3.8 Га', { x: 5.4, y: 2.4, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('площадь участка', { x: 5.4, y: 2.75, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });
    slide.addText('37 м³/сут', { x: 5.4, y: 3.15, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('водоснабжение', { x: 5.4, y: 3.5, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });
    slide.addText('2.4 Гкал', { x: 5.4, y: 3.9, w: 3, h: 0.4, fontSize: 18, color: black, fontFace: 'Arial', bold: true });
    slide.addText('теплоснабжение', { x: 5.4, y: 4.25, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial' });

    // Slide 7 - Pricing
    slide = pptx.addSlide();
    slide.background = { color: black };
    slide.addText('УСЛОВИЯ', { x: 0.7, y: 0.5, w: 3, h: 0.3, fontSize: 10, color: burgundy, fontFace: 'Arial', charSpacing: 3 });
    slide.addText('Стоимость', { x: 0.7, y: 0.8, w: 4, h: 0.6, fontSize: 28, color: white, fontFace: 'Arial', bold: true });

    // Table header
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 9, h: 0.5, line: { color: burgundy, width: 1.5 } });
    slide.addText('ФОРМАТ', { x: 0.7, y: 1.6, w: 3.5, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial', charSpacing: 1 });
    slide.addText('ПЛОЩАДЬ', { x: 4.5, y: 1.6, w: 2, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial', charSpacing: 1 });
    slide.addText('ЦЕНА ЗА М²', { x: 7, y: 1.6, w: 2, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial', charSpacing: 1 });

    const pricing = [
        ['Аренда', '2 700 м²', '700 ₽'],
        ['Продажа по BTS', '12 714 м²', '95 000 ₽'],
        ['Готовые помещения', '12 714 м²', '110 000 ₽']
    ];

    pricing.forEach((row, idx) => {
        const y = 2.2 + idx * 0.7;
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: y, w: 9, h: 0.6, line: { color: '333333', width: 0.5 } });
        slide.addText(row[0], { x: 0.7, y: y + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: white, fontFace: 'Arial' });
        slide.addText(row[1], { x: 4.5, y: y + 0.15, w: 2, h: 0.3, fontSize: 12, color: white, fontFace: 'Arial' });
        slide.addText(row[2], { x: 7, y: y + 0.15, w: 2, h: 0.3, fontSize: 16, color: burgundy, fontFace: 'Arial', bold: true });
    });

    // Slide 8 - Contacts
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 5, h: '100%', fill: { color: burgundy } });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5, y: 0, w: 5, h: '100%', fill: { color: black } });

    slide.addText('Готовы обсудить\nваш проект', { x: 0.5, y: 1.5, w: 4, h: 1.2, fontSize: 26, color: white, fontFace: 'Arial', bold: true });
    slide.addText('Предложим выгодные условия по продаже и аренде помещений', { x: 0.5, y: 2.8, w: 4, h: 0.6, fontSize: 11, color: 'CCCCCC', fontFace: 'Arial' });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.6, w: 1.8, h: 0.5, fill: { color: white } });
    slide.addText('СТРОЙКА', { x: 0.6, y: 3.7, w: 1.6, h: 0.3, fontSize: 12, color: burgundy, fontFace: 'Arial', bold: true, charSpacing: 2 });

    slide.addText('КОНТАКТЫ', { x: 5.5, y: 1.3, w: 3, h: 0.3, fontSize: 9, color: grey, fontFace: 'Arial', charSpacing: 2 });
    slide.addText('Константин Семенов', { x: 5.5, y: 1.7, w: 4, h: 0.4, fontSize: 18, color: white, fontFace: 'Arial', bold: true });
    slide.addText('Коммерческий директор', { x: 5.5, y: 2.1, w: 3, h: 0.3, fontSize: 10, color: '666666', fontFace: 'Arial' });
    slide.addText('+7 (391) 989-99-49', { x: 5.5, y: 2.7, w: 3, h: 0.35, fontSize: 16, color: white, fontFace: 'Arial' });
    slide.addText('+7 924 042-49-00', { x: 5.5, y: 3.1, w: 3, h: 0.35, fontSize: 16, color: white, fontFace: 'Arial' });
    slide.addText('office@kr-yar.com', { x: 5.5, y: 3.6, w: 3, h: 0.3, fontSize: 12, color: burgundy, fontFace: 'Arial' });

    const outputPath = 'D:/Красный Яр/Красный_Яр_2026_Лаконичная.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
