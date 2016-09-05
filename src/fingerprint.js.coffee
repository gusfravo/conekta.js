Date.prototype.stdTimezoneOffset = () ->
  jan = new Date(this.getFullYear(), 0, 1)
  jul = new Date(this.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())

Conekta.Fingerprint = (done) ->

  options = {
    detectScreenOrientation: true,
    excludeJsFonts: false,
    excludeFlashFonts: false,
    excludePlugins: false,
    excludeIEPlugins: false,
    userDefinedFonts: [],
    sortPluginsFor: [/palemoon/i]
  }

  nativeForEach = Array.prototype.forEach;
  nativeMap = Array.prototype.map;

  each = (obj, iterator, context) ->
    if (obj == null)
      return

    if (nativeForEach && obj.forEach == nativeForEach)
      obj.forEach(iterator, context);
    else if (obj.length == +obj.length)
      for x, i in obj
        if iterator.call(context, obj[i], i, obj == {})
          return
    else
      for key in obj
        if (obj.hasOwnProperty(key))
          if (iterator.call(context, obj[key], key, obj) == {}) 
            return;

  map = (obj, iterator, context) ->
    results = [];
    # Not using strict equality so that this acts as a
    # shortcut to checking for `null` and `undefined`.
    if (obj == null) 
      return results
    if (this.nativeMap && obj.map == this.nativeMap)
      return obj.map(iterator, context)

    each(obj, (value, index, list) ->
      results[results.length] = iterator.call(context, value, index, list);
    )

    return results

  userAgentKey = (keys) ->
    keys.push({key: "ua", value: navigator.userAgent})
    return keys

  languageKey = (keys) ->
    keys.push({ key: "l", value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "" })
    return keys

  colorDepthKey = (keys) ->
    keys.push({key: "cd", value: screen.colorDepth})
    return keys

  pixelRatioKey = (keys) ->
    keys.push({key: "pr", value: window.devicePixelRatio || ""})
    return keys

  screenResolutionKey = (keys) ->
    getScreenResolution(keys)
    return keys

  getScreenResolution = (keys) ->
    if (options.detectScreenOrientation)
      resolution = [screen.width, screen.height]
      resolution = [screen.height, screen.width] if (screen.height > screen.width)
    else
      resolution = [screen.width, screen.height]
    
    if (typeof resolution != "undefined")
      keys.push({key: "sw", value: resolution[0]})
      keys.push({key: "sh", value: resolution[1]})
    
    return keys

  getCharacterSet = () ->
    charset = document.inputEncoding || document.characterSet || document.charset || document.defaultCharset
    if (typeof charset != "undefined")
      keys.push({key: 'cs', value: charset})

    return keys

  timezoneOffsetKey = () ->
    keys.push({key: "to", value: new Date().getTimezoneOffset()})
    return keys

  stdTimezoneOffset = () ->
    keys.push({key: "d", value: (new Date().stdTimezoneOffset() - new Date().getTimezoneOffset())})
    return keys

  sessionStorageKey = () ->
    keys.push({key: "ss", value: if window.hasOwnProperty('sessionStorage') then 1 else 0})
    return keys

  localStorageKey = () ->
    keys.push({key: "ls", value: if window.hasOwnProperty('localStorage') then 1 else 0})
    return keys

  indexedDbKey = () ->
    keys.push({key: "idx", value: if window.hasOwnProperty('indexedDB') then 1 else 0})
    return keys

  addBehaviorKey = () ->
    if(document.body && document.body.addBehavior)
      keys.push({key: "add_behavior", value: 1})
    
    return keys

  openDatabaseKey = () ->
    keys.push({key: "odb", value: if window.openDatabase then 1 else 0})
    return keys

  cpuClassKey = () ->
    keys.push({key: "cc", value: navigator.cpuClass || ""})
    return keys

  platformKey = () ->
    keys.push({key: "np", value: navigator.platform || ""})
    return keys

  hasLiedLanguagesKey = (keys) ->
    keys.push({key: "hll", value: if getHasLiedLanguages() then 1 else 0});
    return keys;

  getHasLiedLanguages = () ->
    if (typeof navigator.languages != "undefined")
      try
        firstLanguages = navigator.languages[0].substr(0, 2);
        if (firstLanguages != navigator.language.substr(0, 2))
          return true;
      catch err
        return true;
    return false;

  mimeTypesKey = (keys) ->
    mtypes = []

    for mime in navigator.mimeTypes
      mtypes.push(mime.type)

    keys.push({key: "mtn", value: mtypes.length});
    keys.push({key: "mth", value: md5(mtypes.join(';'))});

    return keys

  isIE = ->
    if navigator.appName == 'Microsoft Internet Explorer'
      return true
    else if navigator.appName == 'Netscape' and /Trident/.test(navigator.userAgent)
      # IE 11
      return true
    false

  pluginsKey = (keys) ->
    if !options.excludePlugins
      if isIE()
        if !options.excludeIEPlugins
          _plugins = getIEPlugins()

          keys.push
            key: 'ieph'
            value: md5(_plugins.join(';'))

          keys.push
            key: 'iepn'
            value: _plugins.length

      else
        _plugins = getRegularPlugins()

        keys.push
          key: 'rph'
          value: md5(_plugins.join(';'))

        keys.push
          key: 'rpn'
          value: _plugins.length
    keys

  getRegularPlugins = ->
    plugins = []
    i = 0
    l = navigator.plugins.length
    while i < l
      plugins.push navigator.plugins[i]
      i++
    # sorting plugins only for those user agents, that we know randomize the plugins
    # every time we try to enumerate them
    if pluginsShouldBeSorted()
      plugins = plugins.sort((a, b) ->
        if a.name > b.name
          return 1
        if a.name < b.name
          return -1
        0
      )
    map plugins, ((p) ->
      mimeTypes = map(p, (mt) ->
        [
          mt.type
          mt.suffixes
        ].join '~'
      ).join(',')
      [
        p.name
        p.description
        mimeTypes
      ].join '::'
    ), this

  getIEPlugins = ->
    result = []
    if Object.getOwnPropertyDescriptor and Object.getOwnPropertyDescriptor(window, 'ActiveXObject') or 'ActiveXObject' of window
      names = [
        'AcroPDF.PDF'
        'Adodb.Stream'
        'AgControl.AgControl'
        'DevalVRXCtrl.DevalVRXCtrl.1'
        'MacromediaFlashPaper.MacromediaFlashPaper'
        'Msxml2.DOMDocument'
        'Msxml2.XMLHTTP'
        'PDF.PdfCtrl'
        'QuickTime.QuickTime'
        'QuickTimeCheckObject.QuickTimeCheck.1'
        'RealPlayer'
        'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)'
        'RealVideo.RealVideo(tm) ActiveX Control (32-bit)'
        'Scripting.Dictionary'
        'SWCtl.SWCtl'
        'Shell.UIHelper'
        'ShockwaveFlash.ShockwaveFlash'
        'Skype.Detection'
        'TDCCtl.TDCCtl'
        'WMPlayer.OCX'
        'rmocx.RealPlayer G2 Control'
        'rmocx.RealPlayer G2 Control.1'
      ]
      # starting to detect plugins in IE
      result = map(names, (name) ->
        try
          new ActiveXObject(name)
          # eslint-disable-no-new
          return name
        catch e
          return null
        return
      )
    if navigator.plugins
      result = result.concat(getRegularPlugins())
    result

  pluginsShouldBeSorted = ->
    should = false
    i = 0
    l = options.sortPluginsFor.length
    while i < l
      re = options.sortPluginsFor[i]
      if navigator.userAgent.match(re)
        should = true
        break
      i++
    should

  # kudos to http://www.lalit.org/lab/javascript-css-font-detect/
  getFonts = (keys, done) ->
    # doing js fonts detection in a pseudo-async fashion
    callback = () ->

      # a font will be compared against all the three default fonts.
      # and if it doesn't match all 3 then that font is not available.
      baseFonts = ["monospace", "sans-serif", "serif"];

      fontList = [
                      "Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS",
                      "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style",
                      "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New",
                      "Garamond", "Geneva", "Georgia",
                      "Helvetica", "Helvetica Neue",
                      "Impact",
                      "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode",
                      "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO",
                      "Palatino", "Palatino Linotype",
                      "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol",
                      "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS",
                      "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"
                    ];

      extendedFontList = [
                      "Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter",
                      "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER",
                       "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville",
                      "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD",
                      "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed",
                      "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara",
                      "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer",
                      "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold",
                      "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark",
                      "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC",
                      "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte",
                      "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER",
                      "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT",
                      "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD",
                      "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV",
                      "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT",
                      "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN",
                      "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island",
                      "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic",
                      "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le",
                      "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti",
                      "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli",
                      "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN",
                      "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB",
                      "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla",
                      "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood",
                      "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket",
                      "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC",
                      "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold",
                      "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin",
                      "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];

      if (options.extendedJsFonts)
        fontList = fontList.concat(extendedFontList);

      fontList = fontList.concat(options.userDefinedFonts);

      # we use m or w because these two characters take up the maximum width.
      # And we use a LLi so that the same matching fonts can get separated
      testString = "conekticute";

      # we test using 72px font size, we may use any size. I guess larger the better.
      testSize = "72px";

      h = document.getElementsByTagName("body")[0];

      # div to load spans for the base fonts
      baseFontsDiv = document.createElement("div");

      # div to load spans for the fonts to detect
      fontsDiv = document.createElement("div");

      defaultWidth = {}
      defaultHeight = {}

      # creates a span where the fonts will be loaded
      createSpan = () ->
        s = document.createElement("span");
        '''
         We need this css as in some weird browser this
         span elements shows up for a microSec which creates a
         bad user experience
        '''
        s.style.position = "absolute"
        s.style.left = "-9999px"
        s.style.fontSize = testSize
        s.innerHTML = testString
        return s

      # creates a span and load the font to detect and a base font for fallback
      createSpanWithFonts = (fontToDetect, baseFont) ->
        s = createSpan()
        s.style.fontFamily = "'" + fontToDetect + "'," + baseFont
        return s

      # creates spans for the base fonts and adds them to baseFontsDiv
      initializeBaseFontsSpans = () ->
        spans = []

        for baseFont in baseFonts
          s = createSpan()
          s.style.fontFamily = baseFonts[index]
          baseFontsDiv.appendChild(s)
          spans.push(s)

        return spans

      # creates spans for the fonts to detect and adds them to fontsDiv
      initializeFontsSpans = () ->
        spans = {}

        for fontItem, i in fontList
          fontSpans = []
          for item, j in baseFonts
            s = createSpanWithFonts(fontItem, item)
            fontsDiv.appendChild(s)
            fontSpans.push(s)
          spans[fontItem] = fontSpans # Stores {fontName : [spans for that font]}

        return spans

      # checks if a font is available
      isFontAvailable = (fontSpans) ->
        detected = false;
        for baseItem, i in baseFonts
          detected = (fontSpans[i].offsetWidth != defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight != defaultHeight[baseFonts[i]])
          if (detected)
            return detected

      # create spans for base fonts
      baseFontsSpans = initializeBaseFontsSpans();

      # add the spans to the DOM
      h.appendChild(baseFontsDiv);

      # get the default width for the three base fonts
      for baseFont, index in baseFonts
        defaultWidth[baseFont] = baseFontsSpans[index].offsetWidth; # width for the default font
        defaultHeight[baseFont] = baseFontsSpans[index].offsetHeight; # height for the default font

      # create spans for fonts to detect
      fontsSpans = initializeFontsSpans();

      # add all the spans to the DOM
      h.appendChild(fontsDiv);

      # check available fonts
      available = [];
      for fontItem, i in fontList
        if (isFontAvailable(fontsSpans[fontItem]))
          available.push(fontItem)

      # remove spans from DOM
      h.removeChild(fontsDiv);
      h.removeChild(baseFontsDiv);

      keys.push({key: "hf", value: md5(available.join(';'))});
      keys.push({key: "nf", value: available.length});

      done(keys);
    
    return setTimeout(callback, 1)

  fontsKey = (keys, done) ->
    return getFonts(keys, done);

  keys = []

  keys = userAgentKey(keys)
  keys = languageKey(keys)
  keys = colorDepthKey(keys)
  keys = pixelRatioKey(keys)
  keys = screenResolutionKey(keys)
  keys = timezoneOffsetKey(keys)
  keys = sessionStorageKey(keys)
  keys = localStorageKey(keys)
  keys = indexedDbKey(keys)
  keys = addBehaviorKey(keys)
  keys = openDatabaseKey(keys)
  keys = cpuClassKey(keys)
  keys = platformKey(keys)
  keys = getCharacterSet(keys)
  keys = stdTimezoneOffset(keys)
  keys = hasLiedLanguagesKey(keys)
  keys = mimeTypesKey(keys)
  keys = pluginsKey(keys)

  fontsKey(keys, (newKeys) ->
    values = [];
    each(newKeys, (pair) ->
      values.push(pair.key + '=' + pair.value);
    );
    
    return done(values);
  );

  return
