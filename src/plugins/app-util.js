var RecaptchaUtil = {
    setRecaptchaJs : function(){
        var scriptEl = document.createElement('script');
        scriptEl.src = "//www.google.com/recaptcha/api.js";
        document.head.appendChild(scriptEl);
    },
    checkReCaptcha : function(){
        if( typeof grecaptcha === 'undefined' ) return;

        const reCaptchaKey = window.grecaptcha.getResponse();
        if( reCaptchaKey.length > 0 ) return reCaptchaKey;
        return;
    },
};

// -------------------------------------------------------------------------------------------------

var ValidateUtil = {
    errMsg : {
        email : {
            empty : '*You must enter an email.',
            form : '*Please enter a valid email address.',
        },
        pwd : {
            empty : '*Password can’t be blank.',
            length : '*Password must be min 8 characters and Max 20 characters.',
        },
        captcha : {
            empty : '*Please confirm the CAPTCHA.'
        },
        confirmPwd : {
            empty : '*Password confirmation can’t be blank.',
            match : '*Password confirmation doesn’t match password.'
        },
        name : {
            empty : '*Name can’t be blank.',
            length : '*Name must be min 2 characters and Max 15 characters.'
        },
        phoneNo : {
            empty : '*Mobile number can’t be blank.',
            length : '*Mobile number must be min 10 numbers and max 12 numbers.'
        },
        agree : {
            signUpCheck : '*Promo T&C and Data Privacy must be accepted.'
        }
    },
    checkIsEmpty(word) {
        return ( word == null || word.trim() == '' );
    },
    checkIsNumber(word){
        if( /[^\d]/.test(word) ){
            return false;
        }
        return true;
    },
    checkIsEmail(word) {
        return ( /.+@.+\..+/.test(word) );
    },
    checkPassword(word) {
        // 현재는 자릿수만 체크
        if ( word == null ) return false;
        return ( word.length >= 8 && word.length <= 20);
    },
    checkName(word) {
        if ( word == null ) return false;
        return ( word.trim().length >= 2 && word.trim().length <= 15 );
    },
    checkNameForSMS(word){
        if ( word == null ) return false;
        return ( word.trim().length >= 2 && word.trim().length <= 7 );
    },
    checkPhone(word) {
        if ( word == null) return false;
        return ( word.trim().length >= 10 && word.trim().length <= 12 );
    },
    checkZipcode(word){
        if ( this.checkIsEmpty(word) ) return;
        return ( word.trim().length <= 7 );
    },
    checkTinNumber( tin ){
        if(!tin) return false;
        if( /[^\d]/.test(tin) ) return false;
        
        return (tin.trim().length == 12);
    },
    matchPassword(pwd, cPwd) {
        return ( pwd == cPwd );
    },
    convertPhoneLocalToGlobal(word) {
        var phoneNum = '';
        if( ! word ) return false;

        phoneNum = word;
        if( !/^(63)/.test(phoneNum) ){
            phoneNum = '63'+phoneNum;
        }
        // if( /^(0)/.test(word) ){
        //     phoneNum = '63'+word.substr(1);
        // }
        // if( /^(9)/.test(word)){
        //     phoneNum = '63'+word;
        // }
        // if( /^(2)/.test(word)){
        //     phoneNum = '63'+word;
        // }
        if (phoneNum.length < 11){
            return false;
        }
        if( !this.checkIsNumber( phoneNum ) ){
            return false;
        }
        return phoneNum;
    },
    convertPhoneGlobalToLocal(word) {
        if( ! word ) return;
        if( /^(63)/.test(word) ){
            return '0'+word.substr(2); // 0XXXXX
        }
        if( /^(9)/.test(word) ){
            return '0'+word; // 0XXXXX
        }
        
        return '';
    },
    over15Charaters(word){
        if(!word) return word;        

        if(word.length < 16) return word;
        return word.substring(0, 16) + "...";
    },
    over15CharFromFullName( word ){
        if( !word ) return word;

        const [ first, middle, last ] = word.split(' '); 
        if( !last ) return ValidateUtil.over15Charaters([first, middle].join(", "));
        return ValidateUtil.over15Charaters( [first, last].join(", ") );
    },
    employeeNameSave(first, middle, last){
        [ first , middle, last ] = [ first , middle, last ].map(this.trimData);  

        if(!first || !last) return;
        if(!middle) return [first, last].join(' ');
        return [first, middle, last].join(' ');
    },
    trimData( word ){
        if(!word) return word;
        return word.trim();
    },
};

// ----------------------------------------------------------------------------------
const DefaultImage= {
    imgUrl : '/images/empty_image_rectangle.png',
    imgUrlForMain : '/images/empty_image_square.png',
    replaceByDefault(e){
        e.target.src = DefaultImage.imgUrl;
    },
    replaceByDefaultForMain(e){
        e.target.src = DefaultImage.imgUrlForMain
    }
}
// -------------------------------------------------------------------------------------------------

export {
    RecaptchaUtil,
    ValidateUtil,
    DefaultImage
};