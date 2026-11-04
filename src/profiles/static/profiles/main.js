const avatarBox = document.getElementById('avatar-box')
const alertBox = document.getElementById('alert-box')
const profileForm = document.getElementById('profile-form')
const currentAvatar = document.getElementById('current-avatar')
const saveBtn = profileForm.querySelector('button[type="submit"]')

const bioInput = document.getElementById('id_bio')
const avatarInput = document.getElementById('id_avatar')

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0]
    if (!file) {
        avatarBox.querySelector('img').src = currentAvatar.href
        return
    }
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        avatarBox.querySelector('img').src = reader.result
    })
    reader.readAsDataURL(file)
})

profileForm.addEventListener('submit', e => {
    e.preventDefault()
    if (saveBtn.disabled) return
    saveBtn.disabled = true
    alertBox.innerHTML = ''

    const formData = new FormData(profileForm)

    $.ajax({
        type: 'POST',
        url: '',
        enctype: 'multipart/form-data',
        data: formData,
        success: function(response){
            avatarBox.querySelector('img').src = response.avatar
            currentAvatar.href = response.avatar
            avatarInput.value = ''
            bioInput.value = response.bio
            handleAlerts('success', 'Your profile has been updated.')
        },
        error: function(error){
            handleAlerts('danger', 'Your profile could not be saved. Check the image and try again.')
        },
        complete: function(){
            saveBtn.disabled = false
        },
        processData: false,
        contentType: false,
        cache: false,
    })
})
