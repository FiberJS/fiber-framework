
function root() {
    return global.__Fiber || (global.__Fiber = {});
}

export function afterSystemLoaded(initScript) {
    if(root().system) {
        initScript(root().system);
    } else {
        root().afterSystemLoaded || (root().afterSystemLoaded = []);
        root().afterSystemLoaded.push(initScript);
    }
}

export function registerSystemLoaded(systemNamespace) {
    root().system = systemNamespace;
    root().afterSystemLoaded && root().afterSystemLoaded.forEach(script => {
        script(systemNamespace);
    });
    root().afterSystemLoaded = []; 
}
