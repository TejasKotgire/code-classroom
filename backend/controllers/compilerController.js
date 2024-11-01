var compiler = require("compilex");
var options = { stats: true };
compiler.init(options);

exports.compiler = async (req, res) => {
    let code = req.body.code;
    let input = req.body.input;
    let inputRadio = req.body.inputRadio;
    let lang = req.body.language;

    const handleResponse = (data) => {
        if (data.error) {
            return res.status(400).send(data.error);
        }
        return res.send({ data: data.output });
    };

    if (lang === "cpp") {
        const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        
        if (inputRadio === true) {
            compiler.compileCPPWithInput(envData, code, input, (data) => handleResponse(data));
        } else {
            compiler.compileCPP(envData, code, (data) => handleResponse(data));
        }
    } else if (lang === "python") {
        const envData = { OS: "windows" };
        
        if (inputRadio === true) {
            compiler.compilePythonWithInput(envData, code, input, (data) => handleResponse(data));
        } else {
            compiler.compilePython(envData, code, (data) => handleResponse(data));
        }
    } else if (lang === "java") {
        const envData = { OS: "windows" };
        
        if (inputRadio === true) {
            compiler.compileJavaWithInput(envData, code, input, (data) => handleResponse(data));
        } else {
            compiler.compileJava(envData, code, (data) => handleResponse(data));
        }
    } else {
        return res.status(400).send("Unsupported language");
    }
};
