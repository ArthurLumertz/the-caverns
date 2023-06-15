const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="z-3 shadow-sm alert alert-${type} alert-dismissible fade show" role="alert">`,
        `   <div class='me-5'>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper);
}

// const alertTrigger = document.getElementById('liveAlertBtn')
// if (alertTrigger) {
//     alertTrigger.addEventListener('click', () => {
//         appendAlert('Nice, you triggered this alert message!', 'success')
//     })
// }