function onDOMContentLoaded() {
  // Fix Google Maps bug
  let d = document.querySelector(".google-map");
  if (d != null) {
    // Found an embedded Google Map. Replace it with the correct embed code
    d.innerHTML = "<iframe src='https://www.google.com/maps/d/u/3/embed?mid=1b6ta3GNvFg57niWnHsRneZh4fnKCCB6m'></iframe>";
  }

  // Should we insert Google Form? We look for text of the form "[gform height=850]".
  let forms = document.querySelectorAll("form");
  for (let i = 0; i < forms.length; i++) {
    let replace = false;
    let height = 0;
    let ps = forms[i].querySelectorAll("p");
    for (let j = 0; j < ps.length; j++) {
      let start = ps[j].textContent.indexOf("[gform");
      if (start != -1) {
        // Found the start of the magic text: "[gform".
        let end = ps[j].textContent.indexOf("]", start);
        if (end != -1) {
          // Found the end. Now we need to extract the height.
          // 14 is the number of characters in "[gform height="
          height = ps[j].textContent.substring(start + 14, end);
          replace = true;
          break;
        }
      }
    }
    if (replace) {
      forms[i].parentNode.innerHTML = "<iframe src='https://docs.google.com/forms/d/e/1FAIpQLSepKciYiAik6TyW9GtyPQEdhSUIEWTtztAZ0iF4ZOZtEWlxJQ/viewform?embedded=true' height='" + height + "'>Loading…</iframe>";
    }
  }
}  

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);