window.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { capture: false, passive: false },
);
if (
  typeof window.devicePixelRatio != "undefined" &&
  window.devicePixelRatio > 2
) {
  var meta = document.getElementById("viewport");
  meta.setAttribute(
    "content",
    "width=device-width, initial-scale=" +
      2 / window.devicePixelRatio +
      ", user-scalable=no",
  );
}
// don't leave page on backspace
window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier == "U+0008" ||
      e.keyIdentifier == "Backspace" ||
      e.keyCode == 8
    ) {
      if (e.target == document.body) {
        e.preventDefault();
        return false;
      }
    }
  },
  true,
);

flowAudio = new FlowAudio();
var page_theme = {};
var favorited = false;
var gameEl;

// on load
const pageSetup = function () {
  // prevent page from moving around with mouse wheel
  // while we are in edit mode. otherwise let us scroll
  //
  gameEl = document.getElementById("builder");
  gameEl.onwheel = function (event) {
    if (isEditMode || isFakeFullscreen) {
      event.preventDefault();
    }
  };
};

if (document.readyState !== "loading") {
  pageSetup();
} else {
  document.addEventListener("DOMContentLoaded", pageSetup);
}

// Haxe mockups for dealing with cross-compiled expressions
var Std = {
  string: function (str) {
    return str + "";
  },
};

class HxOverrides {
  static substr(s, pos, len) {
    if (len == null) {
      len = s.length;
    } else if (len < 0) {
      if (pos == 0) {
        len = s.length + len;
      } else {
        return "";
      }
    }
    return s.substr(pos, len);
  }
  static now() {
    return Date.now();
  }
}
function toggleCursor(showMouse) {
  if (showMouse) {
    console.log("[+] show mouse cursor");
    cursorHidden = false;
    validateCursorState();
    removeCursorValidation();
    document.getElementById("builder").style.cursor = "auto";
  } else {
    console.log("[-] hide mouse cursor");
    cursorHidden = true;
    validateCursorState();
    addCursorValidation();
  }
}
function addCursorValidation() {
  gameEl.addEventListener("mousedown", validateCursorState);
  gameEl.addEventListener("mouseover", validateCursorState);
  console.log("cursor validation: on");
  cursorValidateTimer = setTimeout(validateCursorState, 1000);
}
function removeCursorValidation() {
  gameEl.removeEventListener("mousedown", validateCursorState);
  gameEl.removeEventListener("mouseover", validateCursorState);
  console.log("cursor validation: off");
  if (cursorValidateTimer) {
    clearTimeout(cursorValidateTimer);
  }
}
// various events can ruin our toggleCursor state - stage mouse events during
// loading, buttonMode sprites, etc
function validateCursorState() {
  //console.log("cursor validate hidden:"+cursorHidden);
  var b = document.getElementById("builder");
  if (b && cursorHidden && b.style.cursor != "none") {
    b.style.cursor = "none";
    //console.log("cursor FIX**");
  }
}
