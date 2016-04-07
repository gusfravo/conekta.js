describe("Conekta js", function() {

  beforeEach(function(){
    loadFixtures("credit_card.html");
    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
  });


  it("the window should contain a conekta object", function() {
    expect(window.Conekta).toExist();
  });


  it("the window should contain a conektaAjax function", function() {
    expect(window.conektaAjax).toBeDefined();
    expect(window.conektaAjax).toBeDefined();
  });

  it("Should call AJAx request ", function() {
    $('button').click();
    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
  });


  it("should retunr call xDomainPost ", function() {
    spyOn(Conekta._helpers, 'xDomainPost').and.callThrough();
    $('button').click();
    expect(Conekta._helpers.xDomainPost).toHaveBeenCalled();
  });


});