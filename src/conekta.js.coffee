base_url = 'https://api.conekta.io/' #'https://api.conekta.io/'
s_url = 'https://s.conekta.io'
session_id = ""
_language = 'es'
kount_merchant_id = '205000'
antifraud_config = {}

unless window.conektaAjax
  if typeof jQuery != 'undefined'
    window.conektaAjax = jQuery.ajax #fallback to jquery
  else
    console.error("no either a jQuery or ajax function provided")

localstorageGet = (key)->
  if typeof localStorage != 'undefined' and typeof localStorage.getItem != 'undefined'
    try
      localStorage.setItem('testKey', '1')
      localStorage.removeItem('testKey')
      return localStorage.getItem(key)
    catch error
      return null
  else
    null

localstorageSet = (key, value)->
  if typeof localStorage != 'undefined' and typeof localStorage.setItem != 'undefined'
    try
      localStorage.setItem('testKey', '1')
      localStorage.removeItem('testKey')
      return localStorage.setItem(key, value)
    catch error
      return null
  else
    return null

public_key = localstorageGet('_conekta_publishable_key')

fingerprint = ->
  if typeof document != 'undefined' and typeof document.body != 'undefined' and document.body and (document.readyState == 'interactive' or document.readyState == 'complete') and 'undefined' != typeof Conekta
    if Conekta._helpers.finger_printed() != '1'
      #kount
      body = document.getElementsByTagName('body')[0]

      #if ! (location.protocol == 'https:' and (navigator.userAgent.match(/MSIE/) or navigator.userAgent.match(/Trident\/7\./)))
      #fingerprinting png
      iframe = document.createElement('iframe')
      iframe.setAttribute("height", "1")
      iframe.setAttribute("scrolling", "no")
      iframe.setAttribute("frameborder", "0")
      iframe.setAttribute("width", "1")
      iframe.setAttribute("src", "#{base_url}fraud_providers/kount/logo.htm?m=#{kount_merchant_id}&s=#{session_id}")

      image = document.createElement('img')
      image.setAttribute("height", "1")
      image.setAttribute("width", "1")
      image.setAttribute("src", "#{base_url}fraud_providers/kount/logo.gif?m=#{kount_merchant_id}&s=#{session_id}")

      # shield
      Conekta.Fingerprint((params) ->
        img = document.createElement('img')
        img.setAttribute("width", "1")
        img.setAttribute("height", "1")
        img.setAttribute("border", "0")
        img.setAttribute("scrolling", "no")
        img.setAttribute("src", "#{s_url}/images/#{session_id}.gif?" + params.join('&'))

        body.appendChild(img)
      )

      try
        iframe.appendChild(image)
      catch e
        #do nothing

      body.appendChild(iframe)

      localstorageSet('_conekta_finger_printed', '1');
  else
    setTimeout(fingerprint, 150)

  return

send_beacon = ->
  if typeof document != 'undefined' and typeof document.body != 'undefined' and document.body and (document.readyState == 'interactive' or document.readyState == 'complete') and 'undefined' != typeof Conekta
    if ! Conekta._helpers.beacon_sent
      if antifraud_config['riskified']
        ls = ->
          store_domain = antifraud_config['riskified']['domain']
          session_id = session_id
          url = (if 'https:' == document.location.protocol then 'https://' else 'http://') + 'beacon.riskified.com?shop=' + store_domain + '&sid=' + session_id
          s = document.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = url
          x = document.getElementsByTagName('script')[0]
          x.parentNode.insertBefore s, x
          return
        ls()

      if antifraud_config['siftscience']
        _user_id = session_id

        window._sift = window._sift or []

        _sift.push [
          "_setAccount"
          antifraud_config['siftscience']['beacon_key']
        ]

        _sift.push [
          "_setSessionId"
          session_id
        ]
        _sift.push ["_trackPageview"]

        ls = ->
          e = document.createElement("script")
          e.type = "text/javascript"
          e.async = true
          e.src = (if 'https:' == document.location.protocol then 'https://' else 'http://') + 'cdn.siftscience.com/s.js'
          s = document.getElementsByTagName("script")[0]
          s.parentNode.insertBefore e, s
          return
        ls()
  else
    setTimeout(send_beacon, 150)

  return


if localstorageGet('_conekta_session_id') and localstorageGet('_conekta_session_id_timestamp') and ((new Date).getTime() - 600000) < parseInt(localstorageGet('_conekta_session_id_timestamp'))
  session_id = localStorage.getItem('_conekta_session_id')
  fingerprint()
else if typeof Shopify != 'undefined'

  # verify Shopify.getCart is defined
  if typeof Shopify.getCart == 'undefined' and typeof jQuery != 'undefined'
    Shopify.getCart = (callback) ->
        jQuery.getJSON("/cart.js", (cart) ->
            callback(cart) if "function" == typeof callback
        )

  getCartCallback = (cart)->
    session_id = cart['token']
    if session_id != null and session_id != ''
      fingerprint()
      send_beacon()
      localstorageSet('_conekta_session_id', session_id)
      localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString())
    return

  #getting cart
  if typeof Shopify.getCart != 'undefined'
    Shopify.getCart (cart)->
      getCartCallback(cart)
      return

  #tapping getCart
  originalGetCart = Shopify.getCart
  Shopify.getCart = (callback)->
    tapped_callback = (cart)->
      getCartCallback(cart)

      callback(cart)
      return

    originalGetCart(tapped_callback)
    return

  #tapping onItemAdded
  originalOnItemAdded = Shopify.onItemAdded
  Shopify.onItemAdded = (callback)->
    tapped_callback = (item)->
      Shopify.getCart (cart)->
        getCartCallback(cart)
        return

      callback(item)
      return

    originalOnItemAdded(tapped_callback)
    return

  #tapping onCartUpdated
  originalOnCartUpdated = Shopify.onCartUpdated
  Shopify.onCartUpdated = (callback)->
    tapped_callback = (cart)->
      getCartCallback(cart)

      callback(cart)
      return

    originalOnCartUpdated(tapped_callback)
    return

  #fire fingerprints whenever an item is added to the cart
  if typeof jQuery != 'undefined'
    jQuery(document).ajaxSuccess (event, request, options, data)->
      if options['url'] == 'cart/add.js'
        Shopify.getCart (cart)->
          getCartCallback(cart)
          return
      return

else
  useable_characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  if typeof crypto != 'undefined' and typeof crypto.getRandomValues != 'undefined'
    random_value_array = new Uint32Array(32)
    crypto.getRandomValues(random_value_array)
    for i in [0..random_value_array.length-1]
      session_id += useable_characters.charAt(random_value_array[i] % 36)
  else
    for i in [0..30]
      random_index = Math.floor(Math.random() * 36)
      session_id += useable_characters.charAt(random_index)
  localstorageSet('_conekta_session_id', session_id)
  localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString())

  fingerprint()

getAntifraudConfig = ()->
  unparsed_antifraud_config = localstorageGet('conekta_antifraud_config')

  if unparsed_antifraud_config and unparsed_antifraud_config.match(/^\{/)
    antifraud_config = JSON.parse(unparsed_antifraud_config)
  else
    success_callback = (config)->
      antifraud_config = config
      localstorageSet('conekta_antifraud_config', antifraud_config)
      send_beacon()

    error_callback = ()->
      #no config, fallback

    url = "https://d3fxnri0mz3rya.cloudfront.net/antifraud/#{public_key}.js"

    conektaAjax(
      url: url
      dataType: 'jsonp'
      jsonpCallback: 'conekta_antifraud_config_jsonp'
      success: success_callback
      error: error_callback
    )

getAntifraudConfig()

Base64 =
  # private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  # public method for encoding
  encode: (input) ->
    output = ""
    chr1 = undefined
    chr2 = undefined
    chr3 = undefined
    enc1 = undefined
    enc2 = undefined
    enc3 = undefined
    enc4 = undefined
    i = 0
    input = Base64._utf8_encode(input)
    while i < input.length
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if isNaN(chr2)
        enc3 = enc4 = 64
      else enc4 = 64  if isNaN(chr3)
      output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4)
    output


  # public method for decoding
  decode: (input) ->
    output = ""
    chr1 = undefined
    chr2 = undefined
    chr3 = undefined
    enc1 = undefined
    enc2 = undefined
    enc3 = undefined
    enc4 = undefined
    i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
    while i < input.length
      enc1 = Base64._keyStr.indexOf(input.charAt(i++))
      enc2 = Base64._keyStr.indexOf(input.charAt(i++))
      enc3 = Base64._keyStr.indexOf(input.charAt(i++))
      enc4 = Base64._keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      output = output + String.fromCharCode(chr2)  unless enc3 is 64
      output = output + String.fromCharCode(chr3)  unless enc4 is 64
    output = Base64._utf8_decode(output)
    output


  # private method for UTF-8 encoding
  _utf8_encode: (string) ->
    string = string.replace(/\r\n/g, "\n")
    utftext = ""
    n = 0

    while n < string.length
      c = string.charCodeAt(n)
      if c < 128
        utftext += String.fromCharCode(c)
      else if (c > 127) and (c < 2048)
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      else
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      n++
    utftext


  # private method for UTF-8 decoding
  _utf8_decode: (utftext) ->
    string = ""
    i = 0
    c = c1 = c2 = 0
    while i < utftext.length
      c = utftext.charCodeAt(i)
      if c < 128
        string += String.fromCharCode(c)
        i++
      else if (c > 191) and (c < 224)
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      else
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
    string

if !window.Conekta

  window.Conekta =

    b64: Base64

    setLanguage: (language)->
      _language = language

    getLanguage: ()->
      _language

    setPublicKey: (key) ->
      if typeof key == 'string' and key.match(/^[a-zA-Z0-9_]*$/) and key.length >= 20 and key.length < 30
        public_key = key
        localstorageSet('_conekta_publishable_key', public_key)
      else
        Conekta._helpers.log('Unusable public key: ' + key)
      return

    # TODO: Deprecate on version 2.0.0
    setPublishableKey: (key) ->
      return setPublicKey(key)

    getPublicKey: (key) ->
      public_key

    # TODO: Deprecate on version 2.0.0
    getPublishableKey: () ->
      return getPublicKey()

    _helpers:
      finger_printed: () ->
        return localstorageGet('_conekta_finger_printed')
      beacon_sent: false
      objectKeys:(obj)->
        keys = []
        for p of obj
          if Object.prototype.hasOwnProperty.call(obj,p)
            keys.push(p)
        return keys

      parseForm:(form_object)->
        json_object = {}
        if typeof form_object == 'object'
          if typeof jQuery != 'undefined' and (form_object instanceof jQuery or 'jquery' of Object(form_object))
            form_object = form_object.get()[0]
            #if jquery selector returned nothing
            if typeof form_object != 'object'
              return {}

          if form_object.nodeType
            textareas = form_object.getElementsByTagName('textarea')
            inputs = form_object.getElementsByTagName('input')
            selects = form_object.getElementsByTagName('select')
            all_inputs = new Array(textareas.length + inputs.length + selects.length)

            for i in [0..textareas.length-1] by 1
              all_inputs[i] = textareas[i]

            for i in [0..inputs.length-1] by 1
              all_inputs[i+textareas.length] = inputs[i]

            for i in [0..selects.length-1] by 1
              all_inputs[i+textareas.length + inputs.length] = selects[i]

            for input in all_inputs
              if input
                attribute_name = input.getAttribute('data-conekta')
                if attribute_name
                  if input.tagName == 'SELECT'
                      val = input.value
                  else
                      val = input.getAttribute('value') || input.innerHTML || input.value
                  attributes = attribute_name.replace(/\]/g, '').replace(/\-/g,'_').split(/\[/)

                  parent_node = null
                  node = json_object
                  last_attribute = null
                  for attribute in attributes
                    if ! node[attribute]
                      node[attribute] = {}

                    parent_node = node
                    last_attribute = attribute
                    node = node[attribute]

                  parent_node[last_attribute] = val
          else
            json_object = form_object

        json_object

      getSessionId:()->
        session_id

      xDomainPost:(params)->
        success_callback = (data, textStatus, jqXHR)->
          if ! data or (data.object == 'error') or ! data.id
            params.error(data || {
              object: 'error'
              type:'api_error'
              message:"Something went wrong on Conekta's end"
              message_to_purchaser:"Your code could not be processed, please try again later"
            })
          else
            params.success(data)

        error_callback = ()->
          params.error({
            object: 'error'
            type:'api_error'
            message:'Something went wrong, possibly a connectivity issue'
            message_to_purchaser:"Your code could not be processed, please try again later"
          })

        if document.location.protocol == 'file:' and navigator.userAgent.indexOf("MSIE") != -1
          params.url = (params.jsonp_url || params.url) + '/create.js'
          params.data['_Version'] = "0.3.0"
          params.data['_RaiseHtmlError'] = false
          params.data['auth_token'] = Conekta.getPublicKey()
          params.data['conekta_client_user_agent'] = '{"agent":"Conekta JavascriptBindings/0.3.0"}'

          conektaAjax(
            url: base_url + params.url
            dataType: 'jsonp'
            data: params.data
            success: success_callback
            error: error_callback
          )
        else
          if typeof (new XMLHttpRequest()).withCredentials != 'undefined'
            conektaAjax(
              url: base_url + params.url
              type: 'POST'
              dataType: 'json'
              data: JSON.stringify(params.data)
              contentType:'application/json'
              headers:
                'RaiseHtmlError': false
                'Accept': 'application/vnd.conekta-v0.3.0+json'
                'Accept-Language': Conekta.getLanguage()
                'Conekta-Client-User-Agent':'{"agent":"Conekta JavascriptBindings/0.3.0"}'
                'Authorization':'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
              success: success_callback
              error:error_callback
            )
          else
            rpc = new easyXDM.Rpc({
              swf:"https://conektaapi.s3.amazonaws.com/v0.3.2/flash/easyxdm.swf"
              remote: base_url + "easyxdm_cors_proxy.html"
            },{
              remote:{
                request:{}
              }
            })
            rpc.request({
              url: base_url + params.url
              method:'POST'
              headers:
                'RaiseHtmlError': false
                'Accept': 'application/vnd.conekta-v0.3.0+json'
                'Accept-Language': Conekta.getLanguage()
                'Conekta-Client-User-Agent':'{"agent":"Conekta JavascriptBindings/0.3.0"}'
                'Authorization':'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
              data:JSON.stringify(params.data)
            }, success_callback, error_callback)

      log: (data)->
        if typeof console != 'undefined' and console.log
          console.log(data)

      querySelectorAll: (selectors)->
        if !document.querySelectorAll
          style = document.createElement('style')
          elements = []

          document.documentElement.firstChild.appendChild(style)
          document._qsa = []
          if style.styleSheet
            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
          else
            style.style.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
          window.scrollBy(0, 0)
          style.parentNode.removeChild(style)

          while document._qsa.length
            element = document._qsa.shift()
            element.style.removeAttribute('x-qsa')
            elements.push(element)
          document._qsa = null
          elements
        else
          document.querySelectorAll(selectors)

      querySelector: (selectors)->
        if !document.querySelector
          elements = this.querySelectorAll(selectors)
          if elements.length > 0
            elements[0]
          else
            null
        else
          document.querySelector(selectors)

  if Conekta._helpers.querySelectorAll('script[data-conekta-session-id]').length > 0
    $tag = Conekta._helpers.querySelectorAll('script[data-conekta-session-id]')[0];
    session_id = $tag.getAttribute('data-conekta-session-id')

  if Conekta._helpers.querySelectorAll('script[data-conekta-public-key]').length > 0
    $tag = Conekta._helpers.querySelectorAll('script[data-conekta-public-key]')[0];
    window.Conekta.setPublicKey($tag.getAttribute('data-conekta-public-key'));
