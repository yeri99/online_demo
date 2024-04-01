/**
 * 
 */

 $(document).ready(function(){
  $('#menu>li').click(function(){
    if($(this).find('.dropdown-menu').css("display")=="none"){
      $('.dropdown-menu').removeClass('show');
      $(this).find('.dropdown-menu').addClass('show');
    }else{
      $(this).find('.dropdown-menu').removeClass('show');
    }
  });
  $('#main-container').click(function(){
    $('.dropdown-menu').removeClass('show');
  });
});