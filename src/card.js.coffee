card_types = [
  {
    name: 'amex'
    pattern: /^3[47]/
    valid_length: [ 15 ]
  }
  {
    name: 'diners_club_carte_blanche'
    pattern: /^30[0-5]/
    valid_length: [ 14 ]
  }
  {
    name: 'diners_club_international'
    pattern: /^36/
    valid_length: [ 14 ]
  }
  {
    name: 'jcb'
    pattern: /^35(2[89]|[3-8][0-9])/
    valid_length: [ 16 ]
  }
  {
    name: 'laser'
    pattern: /^(6304|670[69]|6771)/
    valid_length: [ 16..19 ]
  }
  {
    name: 'visa_electron'
    pattern: /^(4026|417500|4508|4844|491(3|7))/
    valid_length: [ 16 ]
  }
  {
    name: 'visa'
    pattern: /^4/
    valid_length: [ 16 ]
  }
  {
    name: 'mastercard'
    pattern: /^5[1-5]/
    valid_length: [ 16 ]
  }
  {
    name: 'maestro'
    pattern: /^(5018|5020|5038|6304|6759|676[1-3])/
    valid_length: [ 12..19 ]
  }
  {
    name: 'discover'
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/
    valid_length: [ 16 ]
  }
]

is_valid_luhn = (number) ->
  sum = 0
  for digit, n in number.split('').reverse()
    digit = +digit # the + casts the string to int
    if n % 2
      digit *= 2
      if digit < 10 then sum += digit else sum += digit - 9
    else
      sum += digit

  sum % 10 == 0

is_valid_length = (number, card_type) ->
  number.length in card_type.valid_length

accepted_cards = ['visa', 'mastercard', 'maestro', 'visa_electron', 'amex', 'laser', 'diners_club_carte_blanche', 'diners_club_international', 'discover', 'jcb']

get_card_type = (number) ->
  for card_type in (card for card in card_types when card.name in accepted_cards)
    if number.match card_type.pattern
      return card_type

  null

parseMonth = (month)->
  if typeof month == 'string' and month.match(/^[\d]{1,2}$/)
    parseInt(month)
  else
    month

parseYear = (year)->
  if typeof year == 'number' and year < 100
    year += 2000

  if typeof year == 'string' and year.match(/^([\d]{2,2}|20[\d]{2,2})$/)
    if year.match(/^([\d]{2,2})$/)
      year = '20' + year
    parseInt(year)
  else
    year

Conekta.card = {}

Conekta.card.getBrand = (number)->
  if typeof number == 'string'
    number = number.replace /[ -]/g, ''
  else if typeof number == 'number'
    number = toString(number)

  brand = get_card_type number

  if brand and brand.name
    return brand.name

  null

Conekta.card.validateCVC = (cvc)->
  (typeof cvc == 'number' and cvc >=0 and cvc < 10000) or (typeof cvc == 'string' and cvc.match(/^[\d]{3,4}$/) != null)

Conekta.card.validateExpMonth = (exp_month)->
  month = parseMonth(exp_month)
  (typeof month == 'number' and month > 0 and month < 13)

Conekta.card.validateExpYear = (exp_year)->
  year = parseYear(exp_year)
  (typeof year == 'number' and year > 2013 and year < 2035)

Conekta.card.validateExpirationDate = (exp_month, exp_year)->
  month = parseMonth(exp_month)
  year = parseYear(exp_year)

  if (typeof month == 'number' and month > 0 and month < 13) and (typeof year == 'number' and year > 2013 and year < 2035)
    ((new Date(year, month, new Date(year, month,0).getDate())) > (new Date()))
  else
    false

#Deprecating this method
Conekta.card.validateExpiry = (exp_month, exp_year)->
  Conekta.card.validateExpirationDate(exp_month, exp_year)

Conekta.card.validateName = (name) ->
  (typeof name == 'string' and name.match(/^\s*[A-z]+\s+[A-z]+[\sA-z]*$/) != null and name.match(/visa|master\s*card|amex|american\s*express|banorte|banamex|bancomer|hsbc|scotiabank|jcb|diners\s*club|discover/i) == null)

Conekta.card.validateNumber = (number) ->
  if typeof number == 'string'
    number = number.replace /[ -]/g, ''
  else if typeof number == 'number'
    number = number.toString()
  else
    number = ""

  card_type =  get_card_type number
  luhn_valid = false
  length_valid = false

  if card_type?
    luhn_valid = is_valid_luhn number
    length_valid = is_valid_length number, card_type

  luhn_valid && length_valid

Conekta.Card = Conekta.card
