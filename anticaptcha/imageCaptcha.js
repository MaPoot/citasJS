var CryptoJS = require("crypto-js");
var anticaptcha = require('./anticaptcha')(process.env.USER_KEY);

function resolveCatpchaImage(body){
    return new Promise((resolve, reject) => {
        anticaptcha.getBalance(function (err, balance) {
            if (err) {
                console.error(err);
                return;
            }
    
            // captcha params can be set here
            anticaptcha.setMinLength(5);
    
            if (balance > 0) {
                anticaptcha.createImageToTextTask({
                    case: true,
                    body: body
                },
                    function (err, taskId) {
                        if (err) {
                            console.error(err);
                            return;
                        }
    
                        console.log(taskId);
    
                        anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                            if (err) {
                                console.error(err);
                                return;
                            }
    
                            console.log(taskSolution);
                            resolve(taskSolution);
                        });
                    }
                );
            }
        });
    });
}

module.exports =  resolveCatpchaImage;