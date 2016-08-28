$(document).ready(function() {

  var flag = true;
  $('.switch').click(function() {
    if(flag) {
      $('.flipper').css('transform', 'rotateY(180deg)');
      flag = false;
    } else {
      $('.flipper').css('transform', 'rotateY(0deg)');
      flag = true;
    }
  });

  var global = new MyGlobal();

  $('.action').click(function(e) {
    e.preventDefault();
    var responseDom = $(this).parents('form').siblings('.message');
    if($(this).attr('id') === 'register') {
      var formFieldIds = ['fullname', 'regemail', 'regpassword', 'confirmpassword'];
      var data = global.getFormData(formFieldIds);
      if(data === 'null') responseDom.text('All fields are compulsory').removeClass('label-success').addClass('label-danger');
      else if(data.confirmpassword !== data.regpassword) responseDom.text('Passwords do not match').removeClass('label-success').addClass('label-danger');
      else if(data.fullname.split(' ').length <= 1) responseDom.text('Your fullname is required(at least 2)').removeClass('label-success').addClass('label-danger');
      else {
        var apiresponse = global.customAjax('POST', data, '/api/register', $(this));
        apiresponse.done(function(reply) {
          if(reply != false) {
            responseDom.text('Registration successfull').removeClass('label-danger').addClass('label-success');
            setTimeout(function() {
              global.loginAction({'email':data.regemail, 'password':data.regpassword}, $(this), responseDom)
            }, 1000);
          } else {
            responseDom.text('This email already exists').removeClass('label-success').addClass('label-danger');
          }
        })
      }
      
    } else if($(this).attr('id') === 'signin') {
      var formFieldIds = ['email', 'password'];
      var data = global.getFormData(formFieldIds);
      if(data === 'null') {
        responseDom.text('All fields are compulsory').css('color', '#f00');
      } else {
        global.loginAction(data, $(this), responseDom);
      }
    }
  })
})