var rtcPubNub = new RtcPubNub();
var rtcXirsys = new RtcXirsys();
lime.embed("Flowlab", "builder", 0, 0, {
  rootPath: "https://flowlab.io/game/embed/html5/bin",
  parameters: {
    auth_token: "",
    game: "2599888",
    asset_root: "assets2",
    splash: "student",
    splash_bg: null,
    splash_bar: null,
    splash_logo: false,
    splash_logo_x: null,
    splash_logo_y: null,
    uid: "",
    mode: "embed",
    chrome: !!window.chrome,
    membership: "student",
    send_events: true,
    viewW: "288.0",
    viewH: "448.0",
  },
});
window.addEventListener("keydown", function (e) {
  // prevent space and arrow up/down from scrolling page
  if (
    (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40) &&
    e.target == document.body
  ) {
    e.preventDefault();
  }
});
// stub this out
function displayConnectionStatus(msg, state) {
  console.log("connection status:" + msg + "/" + state);
}
