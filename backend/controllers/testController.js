const {
    analyzeTaste
}
=
require(
"../services/aiService"
);

exports.testAI=
async(req,res)=>{

    const result=
    await analyzeTaste([
        {
            title:"Death Note"
        },
        {
            title:"Monster"
        },
        {
            title:"Breaking Bad"
        }
    ]);

    res.send(result);

};