function loadShader(shadertype) {
    return document.getElementById(shadertype).textContent;
}



function customMat(vertName, fragName){

    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        //attributes: attributes,
        vertexShader: document.getElementById( vertName ).textContent,
        fragmentShader: document.getElementById( fragName ).textContent
    })
}