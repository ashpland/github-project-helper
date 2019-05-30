setTimeout(function(){
  const innerText = Array.from(document.getElementsByTagName("small")).map(e => e.innerText);

  const objects = innerText.map(e => { return { 
    repo: e.substr(0, e.indexOf('#')), 
    assignee: e.split(" ").splice(-1)[0] 
  }});

  const baseUrl = window.location.origin + window.location.pathname;

  function cleanValues(objects, key) {
    const values = objects
      .map((o => o[key].trim()))
      .filter(v => v != "");
    const valuesSet = new Set(values);
    const sorted = Array.from(valuesSet).sort();
    return sorted;
  }

  function makeUrl(value, key) {
    let separator = "%3A";
    if (key === "repo") separator = separator + "opengb/";
    const url = baseUrl + "?fullscreen=true&card_filter_query=" + key + separator + value;
    return url;
  }

  function pairValueAndUrl(objects, key) {
    const cleaned = cleanValues(objects, key);
    const addUrls = cleaned.map(v => {
      return { 
        value: v,
        url: makeUrl(v, key)
      }
    });
    return addUrls;
  }


  function convertToLink(pair) {
    let a = document.createElement('a');
    let linkText = document.createTextNode(pair.value);
    a.appendChild(linkText);
    a.href = pair.url;
    a.target = "_self";
    a.style.color = "hsla(0,0%,100%,.75)";
    return a;
  }

  function wrapInLi(el) {
    let li = document.createElement('li');
    li.appendChild(el);
    li.style.display = "inline-block";
    li.style.paddingLeft = "1em";
    
    return li;
  }

  const repos = pairValueAndUrl(objects, "repo").map(convertToLink).map(wrapInLi);
  // const assignees = pairValueAndUrl(objects, "assignee").map(convertToLink).map(wrapInLi);
  // const allUrls = repos.concat(assignees);

  const header = document.getElementsByClassName("js-header-wrapper")[0];
  let list = document.createElement('ul');
  list.style.backgroundColor = "#24292e";
  list.style.padding = "0.5em 0";
  list.style.borderBottom = "1px solid hsla(0,0%,100%,.75)";

  repos.map(a => list.appendChild(a));
  header.appendChild(list);

}, 1000);
