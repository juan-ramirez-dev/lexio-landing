// The page in English (also the HTML's own text, for no-JS and search engines) and Spanish.
// data-i18n → text, data-i18n-html → trusted markup from here, data-i18n-attr="attr:key;attr:key".
// Phrases, sentences and the demo's reading stay in English in both: that's what Lexio teaches.
const I18N = (() => {
  const TEXT = {
    en: {
      'meta.title': 'Lexio — learn English from what you already read',
      'meta.description':
        'Paste a reading or a meeting transcript. Lexio finds the phrasal verbs, idioms and expressions in it and turns them into lessons and exercises. Free and open source for macOS and Windows.',

      'top.home': 'Lexio, home',
      'top.how': 'How it works',
      'top.contribute': 'Contribute',
      'top.code': 'Code',
      'top.download': 'Download',
      'top.language': 'Language',

      'hero.badge': 'Free and open source',
      'hero.line1': 'Learn the English',
      'hero.line2': 'you already read,',
      'hero.line3': 'one phrase',
      'hero.line4': 'at a time.',
      'hero.lead':
        'Paste a reading or a meeting transcript. Lexio finds the phrasal verbs, idioms and expressions in it and turns the ones you pick into lessons and exercises. Free for macOS and Windows. Everything stays on your computer.',
      'download.mac': 'Download for macOS',
      'download.windows': 'Download for Windows',
      'download.otherWindows': 'On Windows? Download here',
      'download.otherMac': 'On a Mac? Download here',
      'download.elsewhere': 'Lexio is for macOS and Windows. Download it from your computer.',

      'app.today': 'Today',
      'app.practice': 'Practice',
      'app.material': 'Material',
      'app.progress': 'Progress',

      'type.phrasal': 'Phrasal verb',
      'type.idiom': 'Idiom',
      'type.collocation': 'Collocation',
      'type.expression': 'Expression',

      'swipe.step': '{i} of {n}',
      'swipe.known': 'I know it',
      'swipe.learn': 'Learn it',
      'swipe.skip': 'Skip',
      'swipe.keys': '← know · → learn · ↑ skip',
      'toast.learn': 'Added to learn',
      'toast.known': 'You already know it',

      'how.eyebrow': 'How it works',
      'how.title': 'Your texts in. <span class="muted">Real English out.</span>',
      'how.lead': 'Not a word list someone else picked. The phrases come from what you read and hear at work.',
      'how.step1': 'Paste',
      'how.step1Text': 'Paste a reading or a meeting transcript, or import a .txt file.',
      'how.step2': 'Lexio finds the phrases',
      'how.step2Text': 'Phrasal verbs, idioms, collocations and expressions, highlighted in your own text.',
      'how.step3': 'Swipe',
      'how.step3Text': 'Left if you know it, right if you want to learn it. With the arrow keys or the buttons.',
      'how.step4': 'Practice',
      'how.step4Text':
        'Your AI writes a short lesson and exercises for each phrase. Then you keep your streak going.',

      'demo.textTitle': 'Team sync — March 3',
      'demo.pause': 'Pause demo',
      'demo.play': 'Play demo',
      'add.title': 'Add a text',
      'add.subtitle': 'Paste it, or import a .txt file.',
      'add.titleLabel': 'Title',
      'add.textLabel': 'Text',
      'add.import': 'Import .txt',
      'add.save': 'Save and extract',
      'add.saving': 'Extracting…',
      'material.found': '5 expressions',
      'material.pick': 'Pick what to learn',
      'lesson.title': 'New phrase',
      'lesson.translation': 'In Spanish',
      'lesson.examples': 'Examples',
      'lesson.dialog': 'In a conversation',
      'lesson.start': 'Got it, let’s practice',
      'exercise.context': 'Which one fits?',
      'exercise.step': '1 of 6',
      'exercise.correct': 'Correct!',

      'ai.eyebrow': 'Your AI, your choice',
      'ai.title': 'Private on your computer, <span class="muted">with your key or free with Claude.</span>',
      'ai.lead': 'The AI writes the meaning, examples and exercises for each phrase. You pick which one in Settings.',
      'ai.recommended': 'Recommended',
      'ai.downloaded': 'Downloaded · 2.1 GB',
      'ai.offline': 'Offline',
      'ai.localTitle': 'AI on your computer',
      'ai.localText': '100% private: nothing leaves your computer. It downloads once and works offline.',
      'ai.keychain': 'In your system keychain',
      'ai.keyTitle': 'Or with your key',
      'ai.keyText':
        "Paste your OpenAI, Claude or Gemini key. It's stored in the system keychain, never in Lexio. Only the phrases go to the provider.",
      'ai.copy': 'Copy prompt',
      'ai.paste': 'Paste the answer',
      'ai.claudeTitle': 'Or copy and paste',
      'ai.claudeText': 'No key and no download: copy the prompt, paste it into Claude and paste its answer back.',

      'what.eyebrow': 'What it does',
      'what.title': 'The English people really use, <span class="muted">from your own texts.</span>',
      'what.textsTitle': 'Your texts, your phrases',
      'what.textsText':
        'Readings, articles or meeting transcripts. A built-in list of about 1,800 phrases finds them, even without AI.',
      'kinds.meaning': 'What does it mean?',
      'kinds.gap': 'Fill the gap',
      'kinds.context': 'Which one fits?',
      'kinds.match': 'Match the pairs',
      'kinds.order': 'Put the words in order',
      'kinds.usage': 'Which one uses it right?',
      'what.practiceTitle': 'A lesson, then practice',
      'what.practiceText': 'Meaning, when to use it, examples and a short dialog. Then six kinds of exercises so it sticks.',
      'what.file': 'lexio.db · on your computer',
      'what.privateTitle': 'Private by design',
      'what.privateText': 'No account and no server. Your texts and progress are one file on your computer.',

      'progress.eyebrow': 'Your progress',
      'progress.title': 'From new to mastered, <span class="muted">one session at a time.</span>',
      'progress.lead': 'Every phrase has a level. Each practice session moves it up. A daily streak keeps you coming back.',
      'progress.round': 'Practice a round',
      'progress.streak': '{n} day streak',
      'mastery.new': 'New',
      'mastery.learning': 'Learning',
      'mastery.mastered': 'Mastered',

      'code.eyebrow': 'Open source · MIT',
      'code.title': 'Built in the open. <span class="muted">Build it with us.</span>',
      'code.lead':
        'Lexio is free and every line is on GitHub. Fix a bug, add phrases, improve a translation or build the next feature. Download it, use it, and send your changes.',
      'code.forkTitle': '1. Fork it',
      'code.forkText': 'Make your own copy on GitHub and clone it.',
      'code.running': '✓ Lexio is running',
      'code.runTitle': '2. Run it',
      'code.runText': 'Node 20, pnpm and Rust. The app opens with live reload.',
      'code.prTitle': '3. Open a PR',
      'code.prText': 'Branch from main, run pnpm check and open the PR. CI builds both apps for you.',
      'code.ideas': 'Good first contributions',
      'code.idea1': 'Add phrases to the built-in list',
      'code.idea2': 'New kinds of exercises',
      'code.idea3': 'Improve a translation',
      'code.idea4': 'Report a bug',
      'code.repo': 'See the code on GitHub',
      'code.guide': 'How to contribute',
      'code.issues': 'Ideas and bugs',

      'first.eyebrow': 'The first time you open it',
      'first.title': 'Your system will warn you. <span class="muted">That’s normal.</span>',
      'first.lead':
        "Lexio is open source and doesn't pay for Apple or Microsoft certificates. So your system asks you to confirm once.",
      'first.mac1': 'Open the <code>.dmg</code> and drag Lexio to Applications.',
      'first.mac2': 'Open it. A warning shows up: click <strong>Done</strong>.',
      'first.mac3': 'System Settings → Privacy &amp; Security → <strong>Open Anyway</strong>.',
      'first.technical': 'If you’re technical',
      'first.win1': 'Open the installer.',
      'first.win2': '“Windows protected your PC” shows up: click <strong>More info</strong>.',
      'first.win3': 'Click <strong>Run anyway</strong>.',
      'first.note': '<i class="pulse" aria-hidden="true"></i>After that it updates itself.',

      'cta.title': 'Your English, from your own texts. <span class="muted">Free and open source.</span>',
      'cta.download': 'Download Lexio',
      'cta.contribute': 'or help build it',
    },

    es: {
      'meta.title': 'Lexio — aprende inglés con lo que ya lees',
      'meta.description':
        'Pega una lectura o la transcripción de una reunión. Lexio encuentra los phrasal verbs, modismos y expresiones y los convierte en lecciones y ejercicios. Gratis y de código abierto para macOS y Windows.',

      'top.home': 'Lexio, inicio',
      'top.how': 'Cómo funciona',
      'top.contribute': 'Contribuir',
      'top.code': 'Código',
      'top.download': 'Descargar',
      'top.language': 'Idioma',

      'hero.badge': 'Gratis y de código abierto',
      'hero.line1': 'Aprende el inglés',
      'hero.line2': 'que ya lees,',
      'hero.line3': 'una frase',
      'hero.line4': 'a la vez.',
      'hero.lead':
        'Pega una lectura o la transcripción de una reunión. Lexio encuentra los phrasal verbs, modismos y expresiones, y convierte los que elijas en lecciones y ejercicios. Gratis para macOS y Windows. Todo se queda en tu computador.',
      'download.mac': 'Descargar para macOS',
      'download.windows': 'Descargar para Windows',
      'download.otherWindows': '¿Usas Windows? Descárgalo aquí',
      'download.otherMac': '¿Usas Mac? Descárgalo aquí',
      'download.elsewhere': 'Lexio es para macOS y Windows. Descárgalo desde tu computador.',

      'app.today': 'Hoy',
      'app.practice': 'Practicar',
      'app.material': 'Material',
      'app.progress': 'Progreso',

      'type.phrasal': 'Phrasal verb',
      'type.idiom': 'Modismo',
      'type.collocation': 'Colocación',
      'type.expression': 'Expresión',

      'swipe.step': '{i} de {n}',
      'swipe.known': 'Ya la sé',
      'swipe.learn': 'Aprenderla',
      'swipe.skip': 'Saltar',
      'swipe.keys': '← la sé · → aprender · ↑ saltar',
      'toast.learn': 'Añadida para aprender',
      'toast.known': 'Ya te la sabes',

      'how.eyebrow': 'Cómo funciona',
      'how.title': 'Entran tus textos. <span class="muted">Sale inglés real.</span>',
      'how.lead': 'No es una lista que eligió otro. Las frases salen de lo que lees y escuchas en el trabajo.',
      'how.step1': 'Pega',
      'how.step1Text': 'Pega una lectura o la transcripción de una reunión, o importa un .txt.',
      'how.step2': 'Lexio encuentra las frases',
      'how.step2Text': 'Phrasal verbs, modismos, colocaciones y expresiones, resaltados en tu propio texto.',
      'how.step3': 'Desliza',
      'how.step3Text': 'A la izquierda si ya la sabes, a la derecha si quieres aprenderla. Con las flechas o los botones.',
      'how.step4': 'Practica',
      'how.step4Text': 'Tu IA escribe una lección corta y ejercicios para cada frase. Y tú mantienes tu racha.',

      'demo.textTitle': 'Reunión del equipo — 3 de marzo',
      'demo.pause': 'Pausar demo',
      'demo.play': 'Reproducir demo',
      'add.title': 'Añadir un texto',
      'add.subtitle': 'Pégalo o importa un archivo .txt.',
      'add.titleLabel': 'Título',
      'add.textLabel': 'Texto',
      'add.import': 'Importar .txt',
      'add.save': 'Guardar y extraer',
      'add.saving': 'Extrayendo…',
      'material.found': '5 expresiones',
      'material.pick': 'Elegir qué aprender',
      'lesson.title': 'Frase nueva',
      'lesson.translation': 'En español',
      'lesson.examples': 'Ejemplos',
      'lesson.dialog': 'En una conversación',
      'lesson.start': 'Entendido, a practicar',
      'exercise.context': '¿Cuál encaja?',
      'exercise.step': '1 de 6',
      'exercise.correct': '¡Correcto!',

      'ai.eyebrow': 'Tu IA, tú eliges',
      'ai.title': 'Privada en tu computador, <span class="muted">con tu clave o gratis con Claude.</span>',
      'ai.lead': 'La IA escribe el significado, los ejemplos y los ejercicios de cada frase. Tú eliges cuál en Ajustes.',
      'ai.recommended': 'Recomendado',
      'ai.downloaded': 'Descargado · 2,1 GB',
      'ai.offline': 'Sin internet',
      'ai.localTitle': 'IA en tu computador',
      'ai.localText': '100% privada: nada sale de tu computador. Se descarga una vez y funciona sin internet.',
      'ai.keychain': 'En el llavero del sistema',
      'ai.keyTitle': 'O con tu clave',
      'ai.keyText':
        'Pega tu clave de OpenAI, Claude o Gemini. Se guarda en el llavero del sistema, nunca en Lexio. Al proveedor solo van las frases.',
      'ai.copy': 'Copiar prompt',
      'ai.paste': 'Pegar la respuesta',
      'ai.claudeTitle': 'O copia y pega',
      'ai.claudeText': 'Sin clave y sin descargas: copia el prompt, pégalo en Claude y pega aquí su respuesta.',

      'what.eyebrow': 'Qué hace',
      'what.title': 'El inglés que de verdad se usa, <span class="muted">sacado de tus textos.</span>',
      'what.textsTitle': 'Tus textos, tus frases',
      'what.textsText':
        'Lecturas, artículos o transcripciones de reuniones. Una lista integrada de unas 1.800 frases las encuentra, incluso sin IA.',
      'kinds.meaning': '¿Qué significa?',
      'kinds.gap': 'Completa el hueco',
      'kinds.context': '¿Cuál encaja?',
      'kinds.match': 'Empareja',
      'kinds.order': 'Ordena las palabras',
      'kinds.usage': '¿Cuál la usa bien?',
      'what.practiceTitle': 'Una lección, luego práctica',
      'what.practiceText':
        'Significado, cuándo usarla, ejemplos y un diálogo corto. Luego seis tipos de ejercicios para que se quede.',
      'what.file': 'lexio.db · en tu computador',
      'what.privateTitle': 'Privado por diseño',
      'what.privateText': 'Sin cuenta y sin servidor. Tus textos y tu progreso son un archivo en tu computador.',

      'progress.eyebrow': 'Tu progreso',
      'progress.title': 'De nueva a dominada, <span class="muted">una sesión a la vez.</span>',
      'progress.lead': 'Cada frase tiene un nivel. Cada sesión de práctica la sube. Una racha diaria te hace volver.',
      'progress.round': 'Practicar una ronda',
      'progress.streak': 'Racha de {n} días',
      'mastery.new': 'Nueva',
      'mastery.learning': 'Aprendiendo',
      'mastery.mastered': 'Dominada',

      'code.eyebrow': 'Código abierto · MIT',
      'code.title': 'Hecho a la vista de todos. <span class="muted">Constrúyelo con nosotros.</span>',
      'code.lead':
        'Lexio es gratis y cada línea está en GitHub. Arregla un bug, añade frases, mejora una traducción o construye la próxima función. Descárgalo, úsalo y envía tus cambios.',
      'code.forkTitle': '1. Haz un fork',
      'code.forkText': 'Crea tu propia copia en GitHub y clónala.',
      'code.running': '✓ Lexio está corriendo',
      'code.runTitle': '2. Córrelo',
      'code.runText': 'Node 20, pnpm y Rust. La app se abre y se recarga sola con cada cambio.',
      'code.prTitle': '3. Abre un PR',
      'code.prText': 'Crea una rama desde main, corre pnpm check y abre el PR. El CI compila las dos apps por ti.',
      'code.ideas': 'Para empezar a contribuir',
      'code.idea1': 'Añadir frases a la lista integrada',
      'code.idea2': 'Nuevos tipos de ejercicios',
      'code.idea3': 'Mejorar una traducción',
      'code.idea4': 'Reportar un bug',
      'code.repo': 'Ver el código en GitHub',
      'code.guide': 'Cómo contribuir',
      'code.issues': 'Ideas y bugs',

      'first.eyebrow': 'La primera vez que lo abras',
      'first.title': 'Tu sistema te avisará. <span class="muted">Es normal.</span>',
      'first.lead':
        'Lexio es de código abierto y no paga certificados de Apple ni de Microsoft. Por eso tu sistema te pide confirmar una vez.',
      'first.mac1': 'Abre el <code>.dmg</code> y arrastra Lexio a Aplicaciones.',
      'first.mac2': 'Ábrelo. Sale un aviso: haz clic en <strong>Aceptar</strong>.',
      'first.mac3': 'Ajustes del Sistema → Privacidad y seguridad → <strong>Abrir igualmente</strong>.',
      'first.technical': 'Si eres técnico',
      'first.win1': 'Abre el instalador.',
      'first.win2': 'Sale “Windows protegió su PC”: haz clic en <strong>Más información</strong>.',
      'first.win3': 'Haz clic en <strong>Ejecutar de todas formas</strong>.',
      'first.note': '<i class="pulse" aria-hidden="true"></i>Después de eso se actualiza solo.',

      'cta.title': 'Tu inglés, desde tus propios textos. <span class="muted">Gratis y de código abierto.</span>',
      'cta.download': 'Descargar Lexio',
      'cta.contribute': 'o ayuda a construirlo',
    },
  }

  const STORE = 'lexio-lang'
  const supported = value => value === 'en' || value === 'es'

  function initial() {
    const fromUrl = new URLSearchParams(location.search).get('lang')
    if (supported(fromUrl)) return fromUrl
    try {
      const saved = localStorage.getItem(STORE)
      if (supported(saved)) return saved
    } catch {}
    for (const tag of navigator.languages ?? [navigator.language]) {
      const base = String(tag).toLowerCase().split('-')[0]
      if (supported(base)) return base
    }
    return 'en'
  }

  let lang = initial()
  const listeners = []
  // {name} placeholders get filled from vars.
  const t = (key, vars = {}) => TEXT[lang][key].replace(/\{(\w+)\}/g, (_, name) => vars[name])

  function apply() {
    document.documentElement.lang = lang
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]').content = t('meta.description')
    for (const el of document.querySelectorAll('[data-i18n]')) {
      el.textContent = t(el.dataset.i18n)
    }
    for (const el of document.querySelectorAll('[data-i18n-html]')) {
      el.innerHTML = t(el.dataset.i18nHtml)
    }
    for (const el of document.querySelectorAll('[data-i18n-attr]')) {
      for (const pair of el.dataset.i18nAttr.split(';')) {
        const [attr, key] = pair.split(':')
        el.setAttribute(attr, t(key))
      }
    }
    for (const button of document.querySelectorAll('[data-lang]')) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang))
    }
    for (const listener of listeners) listener(lang)
  }

  function set(next) {
    if (!supported(next) || next === lang) return
    lang = next
    try {
      localStorage.setItem(STORE, lang)
    } catch {}
    apply()
  }

  for (const button of document.querySelectorAll('[data-lang]')) {
    button.addEventListener('click', () => set(button.dataset.lang))
  }

  apply()
  // The head script hid the page so nobody sees the English text flash first.
  document.documentElement.classList.remove('i18n-wait')

  return {
    get lang() {
      return lang
    },
    t,
    apply,
    onChange: listener => listeners.push(listener),
  }
})()
