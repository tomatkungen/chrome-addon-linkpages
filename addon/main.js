// Extension CustomerElemtent Hack preventing collision between onsenui lib and chrome extension lib
window.AppView = () => {};
window.ExtensionOptions = () => {};
window.WebView = () => {};

require(["cmain"], function() {});