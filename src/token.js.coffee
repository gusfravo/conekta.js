Conekta.Token = {}

Conekta.Token.create = (token_form, success_callback, failure_callback)->

  if typeof success_callback != 'function'
    success_callback = Conekta._helpers.log

  if typeof failure_callback != 'function'
    failure_callback = Conekta._helpers.log

  token = Conekta._helpers.parseForm(token_form)

  if typeof token == 'object'
    if Conekta._helpers.objectKeys(token).length > 0
      if token.card
        token.card.device_fingerprint = Conekta._helpers.getSessionId()
      else
        failure_callback(
          'object':'error'
          'type':'invalid_request_error'
          'message':"The form or hash has no attributes 'card'.  If you are using a form, please ensure that you have have an input or text area with the data-conekta attribute 'card[number]'.  For an example form see: https://github.com/conekta/conekta.js/blob/master/examples/credit_card.html"
          'message_to_purchaser':"The card could not be processed, please try again later"
        )

      if token.card and token.card.address and !(token.card.address.street1 or token.card.address.street2 or token.card.address.street3 or token.card.address.city or token.card.address.state or token.card.address.country or token.card.address.zip)
        delete(token.card.address)

      Conekta._helpers.xDomainPost(
        jsonp_url:'tokens' #'https://api.conekta.io'
        url:'tokens'#'https://api.conekta.io'
        data:token
        success:success_callback
        error:failure_callback
      )
    else
      failure_callback(
        'object':'error'
        'type':'invalid_request_error'
        'message':"supplied parameter 'token' is usable object but has no values (e.g. amount, description) associated with it"
        'message_to_purchaser':"The card could not be processed, please try again later"
      )
  else
    failure_callback(
      'object':'error'
      'type':'invalid_request_error'
      'message':"Supplied parameter 'token' is not a javascript object or a form"
      'message_to_purchaser':"The card could not be processed, please try again later"
    )

# TODO: Deprecate on version 2.0.0
Conekta.token = {}
Conekta.token.create = Conekta.Token.create
