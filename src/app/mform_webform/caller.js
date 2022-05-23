function initForm(selector, data, _listner){
    let ele = document.querySelector(selector);
    ele.setAttribute('questionresponse',JSON.stringify(data));
    ele.addEventListener('submitQuestion', _listner )
}