$(function(){
  function buildPost(message){
    include_image =(message.image_url) ? `<img src="${message.image_url}">` : "";
    var html = `
        <div class="message__main__left__user" data-message-id=${message.id}>
        <div class="message__main__left__user--name">
        ${message.user_name}
        </div>
        <div class="message__main__left__user--picture"></div>
        <div class="message__main__left__text">
        ${message.content}
        </div>
        ${include_image}
        </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.message__main__left').append(html);
      $('.message__main').animate({ scrollTop: $('.message__main__left')[0].scrollHeight });
       $('form')[0].reset();
    });
    .fail(function(message){
      alert('エラーが出ました。確認してください');
    })
    return false;
  })
});
