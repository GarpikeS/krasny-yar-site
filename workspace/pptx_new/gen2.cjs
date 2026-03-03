const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'ООО Красный Яр';
    pptx.title = 'Красный Яр - Индустриальный парк';
    pptx.company = 'ООО Красный Яр';

    // Modern color palette based on "Красный Яр" branding
    const red = 'C62828';        // Vibrant red
    const darkRed = '8B0000';    // Dark red
    const black = '1A1A1A';
    const darkGrey = '2D2D2D';
    const white = 'FFFFFF';
    const lightGrey = 'F5F5F5';
    const grey = '757575';

    // ========== SLIDE 1 - HERO ==========
    let slide = pptx.addSlide();
    slide.background = { color: black };

    // Red accent bar on left
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 0.15, h: '100%', fill: { color: red } });

    // Main content
    slide.addText('ИНДУСТРИАЛЬНЫЙ ПАРК', {
        x: 0.6, y: 0.8, w: 5, h: 0.4,
        fontSize: 12, color: red, fontFace: 'Arial',
        charSpacing: 6, bold: true
    });

    slide.addText('КРАСНЫЙ\nЯР', {
        x: 0.6, y: 1.3, w: 6, h: 2,
        fontSize: 72, color: white, fontFace: 'Arial',
        bold: true, lineSpacing: 65
    });

    slide.addText('Строительство современных производственных\nи складских помещений под ключ', {
        x: 0.6, y: 3.5, w: 5, h: 0.8,
        fontSize: 14, color: grey, fontFace: 'Arial', lineSpacing: 22
    });

    // Stats block
    slide.addShape(pptx.shapes.RECTANGLE, { x: 6.5, y: 1.5, w: 3, h: 2.5, fill: { color: red } });
    slide.addText('50 000', { x: 6.7, y: 1.7, w: 2.6, h: 0.7, fontSize: 36, color: white, fontFace: 'Arial', bold: true, align: 'center' });
    slide.addText('м² площадей', { x: 6.7, y: 2.3, w: 2.6, h: 0.3, fontSize: 11, color: white, fontFace: 'Arial', align: 'center' });
    slide.addText('12.2 Га', { x: 6.7, y: 2.9, w: 2.6, h: 0.5, fontSize: 28, color: white, fontFace: 'Arial', bold: true, align: 'center' });
    slide.addText('территория парка', { x: 6.7, y: 3.35, w: 2.6, h: 0.3, fontSize: 11, color: white, fontFace: 'Arial', align: 'center' });

    // Bottom tagline
    slide.addText('BUILD-TO-SUIT  •  КРАСНОЯРСК', {
        x: 0.6, y: 4.8, w: 4, h: 0.3,
        fontSize: 10, color: grey, fontFace: 'Arial', charSpacing: 3
    });

    // ========== SLIDE 2 - BTS FORMAT ==========
    slide = pptx.addSlide();
    slide.background = { color: lightGrey };

    // Left content area
    slide.addText('ФОРМАТ BUILD-TO-SUIT', {
        x: 0.6, y: 0.5, w: 4, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('Строим под\nваши задачи', {
        x: 0.6, y: 0.9, w: 5, h: 1.2,
        fontSize: 40, color: black, fontFace: 'Arial', bold: true, lineSpacing: 42
    });

    // Three steps with numbers
    const steps = [
        ['01', 'Земельный участок', 'Подбираем участок нужной площади под ваш проект'],
        ['02', 'Проектирование', 'Разрабатываем полноценный проект под ваши цели'],
        ['03', 'Строительство', 'Строим за 10 месяцев с полным сопровождением']
    ];

    steps.forEach((step, idx) => {
        const y = 2.4 + idx * 0.85;
        slide.addText(step[0], { x: 0.6, y: y, w: 0.6, h: 0.5, fontSize: 24, color: red, fontFace: 'Arial', bold: true });
        slide.addText(step[1], { x: 1.3, y: y, w: 3, h: 0.35, fontSize: 14, color: black, fontFace: 'Arial', bold: true });
        slide.addText(step[2], { x: 1.3, y: y + 0.35, w: 4, h: 0.35, fontSize: 11, color: grey, fontFace: 'Arial' });
    });

    // Right panel - dark
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.5, y: 0, w: 4.5, h: '100%', fill: { color: darkGrey } });
    slide.addText('BTS', { x: 5.8, y: 2, w: 4, h: 1.2, fontSize: 80, color: white, fontFace: 'Arial', bold: true, align: 'center' });
    slide.addText('BUILD TO SUIT', { x: 5.8, y: 3.2, w: 4, h: 0.4, fontSize: 12, color: grey, fontFace: 'Arial', align: 'center', charSpacing: 4 });

    // ========== SLIDE 3 - ADVANTAGES ==========
    slide = pptx.addSlide();
    slide.background = { color: white };

    // Red top bar
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: red } });

    slide.addText('НАШИ ПРЕИМУЩЕСТВА', {
        x: 0.6, y: 0.4, w: 4, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('Почему выбирают нас', {
        x: 0.6, y: 0.75, w: 6, h: 0.6,
        fontSize: 36, color: black, fontFace: 'Arial', bold: true
    });

    // Advantage cards - 2x3 grid
    const advantages = [
        ['🏙️', 'Городская черта', 'Участки в черте Красноярска с развитой инфраструктурой'],
        ['⚡', '31.5 МВт', 'Электрическая мощность для энергоёмких производств'],
        ['🏭', 'IV-V класс', 'Разрешённые виды производств без ограничений'],
        ['🔧', 'Своя УК', 'Собственная управляющая компания на территории'],
        ['📅', '10 месяцев', 'Срок строительства помещений под ключ'],
        ['💰', 'Гибкие условия', 'Лояльная ценовая политика и рассрочка']
    ];

    advantages.forEach((adv, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const x = 0.4 + col * 3.15;
        const y = 1.55 + row * 1.55;

        // Card background
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: x, y: y, w: 3, h: 1.4,
            fill: { color: lightGrey }
        });

        // Red left accent
        slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.06, h: 1.4, fill: { color: red } });

        slide.addText(adv[1], { x: x + 0.2, y: y + 0.15, w: 2.6, h: 0.4, fontSize: 14, color: black, fontFace: 'Arial', bold: true });
        slide.addText(adv[2], { x: x + 0.2, y: y + 0.55, w: 2.6, h: 0.7, fontSize: 10, color: grey, fontFace: 'Arial' });
    });

    // ========== SLIDE 4 - FORMATS ==========
    slide = pptx.addSlide();
    slide.background = { color: black };

    slide.addText('ФОРМАТЫ ПОМЕЩЕНИЙ', {
        x: 0.6, y: 0.4, w: 4, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('Варианты сотрудничества', {
        x: 0.6, y: 0.75, w: 6, h: 0.6,
        fontSize: 36, color: white, fontFace: 'Arial', bold: true
    });

    // Three format cards
    const formats = [
        ['MINI', 'от 480 м²', 'Компактные блоки для небольших производств'],
        ['MIDI', 'от 960 м²', 'Оптимальный формат для среднего бизнеса'],
        ['MAXI', 'от 1920 м²', 'Крупные площади с мощностью до 5 МВт']
    ];

    formats.forEach((fmt, idx) => {
        const x = 0.5 + idx * 3.15;

        slide.addShape(pptx.shapes.RECTANGLE, {
            x: x, y: 1.6, w: 3, h: 2.4,
            fill: { color: darkGrey }
        });

        // Top accent
        slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.6, w: 3, h: 0.08, fill: { color: red } });

        slide.addText(fmt[0], { x: x + 0.3, y: 1.85, w: 2.4, h: 0.6, fontSize: 28, color: white, fontFace: 'Arial', bold: true });
        slide.addText(fmt[1], { x: x + 0.3, y: 2.45, w: 2.4, h: 0.4, fontSize: 18, color: red, fontFace: 'Arial', bold: true });
        slide.addText(fmt[2], { x: x + 0.3, y: 2.95, w: 2.4, h: 0.8, fontSize: 11, color: grey, fontFace: 'Arial' });
    });

    // Bottom highlight bar
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 4.3, w: '100%', h: 0.9, fill: { color: red } });
    slide.addText('Высота потолков 8 м  •  Шаг колонн 6×6 м  •  Нагрузка на пол 3 т/м²', {
        x: 0.5, y: 4.55, w: 9, h: 0.4,
        fontSize: 14, color: white, fontFace: 'Arial', align: 'center'
    });

    // ========== SLIDE 5 - LOCATION ==========
    slide = pptx.addSlide();
    slide.background = { color: lightGrey };

    slide.addText('РАСПОЛОЖЕНИЕ', {
        x: 0.6, y: 0.4, w: 4, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('В сердце Красноярска', {
        x: 0.6, y: 0.75, w: 6, h: 0.6,
        fontSize: 36, color: black, fontFace: 'Arial', bold: true
    });

    // Location details
    slide.addText('📍 ул. Кутузова, д.1, стр.37', { x: 0.6, y: 1.6, w: 4, h: 0.4, fontSize: 16, color: black, fontFace: 'Arial', bold: true });
    slide.addText('Интегрирован в мкр. Мичуринский\nВблизи федеральной трассы Р-255 «Сибирь»\n15 минут от центра города', {
        x: 0.6, y: 2.1, w: 4.5, h: 1, fontSize: 12, color: grey, fontFace: 'Arial', lineSpacing: 20
    });

    // Stats
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.4, w: 2.8, h: 1.3, fill: { color: white } });
    slide.addText('50 000 м²', { x: 0.6, y: 3.55, w: 2.6, h: 0.5, fontSize: 24, color: red, fontFace: 'Arial', bold: true });
    slide.addText('производственных\nи офисных площадей', { x: 0.6, y: 4, w: 2.6, h: 0.6, fontSize: 10, color: grey, fontFace: 'Arial' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 3.5, y: 3.4, w: 2.8, h: 1.3, fill: { color: white } });
    slide.addText('1 300+', { x: 3.6, y: 3.55, w: 2.6, h: 0.5, fontSize: 24, color: red, fontFace: 'Arial', bold: true });
    slide.addText('рабочих мест\nсоздано в парке', { x: 3.6, y: 4, w: 2.6, h: 0.6, fontSize: 10, color: grey, fontFace: 'Arial' });

    // Right panel - map placeholder
    slide.addShape(pptx.shapes.RECTANGLE, { x: 6.5, y: 0.3, w: 3.3, h: 4.6, fill: { color: darkGrey } });
    slide.addText('🗺️', { x: 6.5, y: 2, w: 3.3, h: 1, fontSize: 48, color: grey, fontFace: 'Arial', align: 'center' });
    slide.addText('Карта', { x: 6.5, y: 2.8, w: 3.3, h: 0.4, fontSize: 14, color: grey, fontFace: 'Arial', align: 'center' });

    // ========== SLIDE 6 - CONSTRUCTION PHASES ==========
    slide = pptx.addSlide();
    slide.background = { color: white };

    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: red } });

    slide.addText('II ОЧЕРЕДЬ СТРОИТЕЛЬСТВА', {
        x: 0.6, y: 0.4, w: 5, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('План развития парка', {
        x: 0.6, y: 0.75, w: 6, h: 0.6,
        fontSize: 36, color: black, fontFace: 'Arial', bold: true
    });

    // Phase 1
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.4, h: 3.2, fill: { color: lightGrey } });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.4, h: 0.6, fill: { color: red } });
    slide.addText('I ЭТАП', { x: 0.7, y: 1.6, w: 2, h: 0.4, fontSize: 18, color: white, fontFace: 'Arial', bold: true });

    slide.addText('21 000 м²', { x: 0.7, y: 2.3, w: 3, h: 0.5, fontSize: 28, color: black, fontFace: 'Arial', bold: true });
    slide.addText('площадь строительства', { x: 0.7, y: 2.75, w: 3, h: 0.3, fontSize: 10, color: grey, fontFace: 'Arial' });

    slide.addText('2.8 Га', { x: 0.7, y: 3.2, w: 2, h: 0.4, fontSize: 20, color: red, fontFace: 'Arial', bold: true });
    slide.addText('площадь участка', { x: 0.7, y: 3.55, w: 3, h: 0.3, fontSize: 10, color: grey, fontFace: 'Arial' });

    slide.addText('5 МВт  •  37 м³/сут  •  2.4 Гкал', { x: 0.7, y: 4.1, w: 4, h: 0.3, fontSize: 11, color: black, fontFace: 'Arial' });
    slide.addText('электро / водо / тепло', { x: 0.7, y: 4.4, w: 4, h: 0.25, fontSize: 9, color: grey, fontFace: 'Arial' });

    // Phase 2
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.1, y: 1.5, w: 4.4, h: 3.2, fill: { color: darkGrey } });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.1, y: 1.5, w: 4.4, h: 0.6, fill: { color: black } });
    slide.addText('II ЭТАП', { x: 5.3, y: 1.6, w: 2, h: 0.4, fontSize: 18, color: white, fontFace: 'Arial', bold: true });

    slide.addText('3.8 Га', { x: 5.3, y: 2.3, w: 3, h: 0.5, fontSize: 28, color: white, fontFace: 'Arial', bold: true });
    slide.addText('площадь участка', { x: 5.3, y: 2.75, w: 3, h: 0.3, fontSize: 10, color: grey, fontFace: 'Arial' });

    slide.addText('Скоро', { x: 5.3, y: 3.4, w: 3, h: 0.4, fontSize: 16, color: red, fontFace: 'Arial', bold: true });
    slide.addText('начало строительства', { x: 5.3, y: 3.75, w: 3, h: 0.3, fontSize: 10, color: grey, fontFace: 'Arial' });

    // ========== SLIDE 7 - PRICING ==========
    slide = pptx.addSlide();
    slide.background = { color: black };

    slide.addText('УСЛОВИЯ СОТРУДНИЧЕСТВА', {
        x: 0.6, y: 0.4, w: 5, h: 0.3,
        fontSize: 10, color: red, fontFace: 'Arial', charSpacing: 3, bold: true
    });

    slide.addText('Стоимость', {
        x: 0.6, y: 0.75, w: 4, h: 0.6,
        fontSize: 36, color: white, fontFace: 'Arial', bold: true
    });

    // Pricing cards
    const pricing = [
        ['АРЕНДА', '700 ₽/м²', '2 700 м²', 'доступно'],
        ['BTS ПРОДАЖА', '95 000 ₽/м²', '12 714 м²', 'под заказ'],
        ['ГОТОВЫЕ', '110 000 ₽/м²', '12 714 м²', 'в наличии']
    ];

    pricing.forEach((price, idx) => {
        const x = 0.5 + idx * 3.15;

        slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.6, w: 3, h: 2.6, fill: { color: darkGrey } });

        slide.addText(price[0], { x: x + 0.25, y: 1.75, w: 2.5, h: 0.4, fontSize: 12, color: grey, fontFace: 'Arial', charSpacing: 2 });
        slide.addText(price[1], { x: x + 0.25, y: 2.2, w: 2.5, h: 0.6, fontSize: 26, color: red, fontFace: 'Arial', bold: true });

        slide.addShape(pptx.shapes.RECTANGLE, { x: x + 0.25, y: 2.9, w: 2.5, h: 0.02, fill: { color: '444444' } });

        slide.addText(price[2], { x: x + 0.25, y: 3.1, w: 2.5, h: 0.35, fontSize: 16, color: white, fontFace: 'Arial' });
        slide.addText(price[3], { x: x + 0.25, y: 3.45, w: 2.5, h: 0.3, fontSize: 11, color: grey, fontFace: 'Arial' });
    });

    // Bottom note
    slide.addText('Все цены указаны с НДС. Возможна рассрочка и индивидуальные условия.', {
        x: 0.5, y: 4.5, w: 9, h: 0.3,
        fontSize: 10, color: grey, fontFace: 'Arial', align: 'center'
    });

    // ========== SLIDE 8 - CONTACTS ==========
    slide = pptx.addSlide();

    // Split background
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 5, h: '100%', fill: { color: red } });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5, y: 0, w: 5, h: '100%', fill: { color: black } });

    // Left side - CTA
    slide.addText('Готовы\nобсудить\nваш проект?', {
        x: 0.5, y: 1, w: 4, h: 1.8,
        fontSize: 32, color: white, fontFace: 'Arial', bold: true, lineSpacing: 38
    });

    slide.addText('Напишите «СТРОЙКА» в сообщении\nи мы свяжемся с вами', {
        x: 0.5, y: 3, w: 4, h: 0.7,
        fontSize: 12, color: 'FFCCCC', fontFace: 'Arial', lineSpacing: 18
    });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.9, w: 2.2, h: 0.6, fill: { color: white } });
    slide.addText('СТРОЙКА', { x: 0.6, y: 4.05, w: 2, h: 0.3, fontSize: 16, color: red, fontFace: 'Arial', bold: true, charSpacing: 3 });

    // Right side - Contact info
    slide.addText('КОНТАКТЫ', {
        x: 5.5, y: 0.8, w: 4, h: 0.3,
        fontSize: 10, color: grey, fontFace: 'Arial', charSpacing: 3
    });

    slide.addText('Константин Семенов', {
        x: 5.5, y: 1.2, w: 4, h: 0.5,
        fontSize: 22, color: white, fontFace: 'Arial', bold: true
    });
    slide.addText('Коммерческий директор', {
        x: 5.5, y: 1.7, w: 4, h: 0.3,
        fontSize: 11, color: grey, fontFace: 'Arial'
    });

    slide.addText('+7 (391) 989-99-49', { x: 5.5, y: 2.4, w: 4, h: 0.4, fontSize: 20, color: white, fontFace: 'Arial', bold: true });
    slide.addText('+7 924 042-49-00', { x: 5.5, y: 2.85, w: 4, h: 0.4, fontSize: 20, color: white, fontFace: 'Arial' });

    slide.addText('office@kr-yar.com', { x: 5.5, y: 3.5, w: 4, h: 0.35, fontSize: 14, color: red, fontFace: 'Arial' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.5, y: 4, w: 4, h: 0.02, fill: { color: '444444' } });

    slide.addText('г. Красноярск\nул. Кутузова, 1, стр. 37, оф. 307', {
        x: 5.5, y: 4.2, w: 4, h: 0.6,
        fontSize: 11, color: grey, fontFace: 'Arial', lineSpacing: 16
    });

    const outputPath = 'D:/Красный Яр/Красный_Яр_2026_Premium.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(console.error);
