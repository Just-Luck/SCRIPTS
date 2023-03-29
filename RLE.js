function EscapeEncoder(s) {
  var len = s.length;
  s = s.split("");
  var count = 1;
  var cs = 0;
  var g = [];
  while (len + 1 != cs) {
    symbol = s[cs];
    cs++;
    if (s[cs] == symbol) {
      count++;
    } else if (count > 3) {
      g.push("@" + String.fromCharCode(count) + symbol);
      count = 1;
    } else if ((count >= 256) & (s[cs] != symbol)) {
      while (count != 0) {
        if (count - 255 != 0) {
          g.push("@" + String.fromCharCode(255) + s[cs]);
          count -= 255;
        } else {
          g.push("@" + String.fromCharCode(count) + s[cs]);
          count = 1;
        }
      }
    } else if (
      (symbol == "@") &
      (s[cs - 2] == "@") &
      (s[cs - 3] == "@") &
      (s[cs] != "@")
    ) {
      g.push("@" + String.fromCharCode(3) + "@");
      count = 1;
    } else if ((symbol == "@") & (s[cs - 2] == "@") & (s[cs] != "@")) {
      g.push("@" + String.fromCharCode(2) + "@");
      count = 1;
    } else if ((symbol == "@") & (s[cs] != "@")) {
      g.push("@" + String.fromCharCode(1) + "@");
      count = 1;
    } else if ((count < 4) & (symbol != s[cs])) {
      for (i = 0; i < count; i++) {
        g.push(symbol);
      }
      count = 1;
    } else {
      g.push(symbol);
      count = 1;
    }
  }
  return g.join("");
}

function EscapeDecoder(s) {
  len = s.length;
  var s = s.split("");
  var cs = 0;
  var g = [];
  while (cs != len) {
    if ((s[cs] == "@") & (cs != len - 1)) {
      var symbol = s[cs + 1].charCodeAt(0);
      var simvol = s[cs + 2];
      for (i = 0; i < symbol; i++) {
        g.push(simvol);
      }
      cs += 3;
    } else {
      g.push(s[cs]);
      cs++;
    }
  }
  return g.join("");
}

function JumpEncoder(s) {
  let g = "";
  let startElem = 0;
  let endElem = 0;
  let typeElements = 0;
  let count = 0;
  const len = s.length;

  for (let i = 0; i < len; i++) {
    if (s.charAt(i) === s.charAt(i + 1) && count < 63) {
      count++;
      typeElements = 1;
    } else {
      if (typeElements === 0) {
        while (s.charAt(i) !== s.charAt(i + 1)) {
          endElem = i;
          i++;
        }
        const kol = String.fromCharCode(endElem + 1 - startElem + 64);
        g += kol + s.substring(startElem, endElem + 1);
        count = 1;
      } else {
        count++;
        const kol = String.fromCharCode(count);
        g += kol + s.charAt(i);
        typeElements = 0;
        startElem = i + 1;
        count = 0;
      }
    }
  }
  return g;
}

function JumpDecoder(s) {
  let g = "";
  for (let i = 0; i < s.length; i++) {
    const elem = s.charAt(i);
    const m = elem.charCodeAt(0);
    if (m > 64) {
      const numChars = m - 64;
      g += s.substr(i + 1, numChars);
      i += numChars;
    } else {
      for (let e = 0; e < m; e++) {
        g += s.charAt(i + 1);
      }
      i++;
    }
  }
  return g;
}

//? Запуск функций
testEscape("lkkkklllll@ippppp@@f@@@ds;ssssssssssssssssssssssspppkfhlk");
testEscape("@");
testEscape("@ @ @ @ @");
testEscape(
  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!@!@@@@@@@@@@@@@@@@@@@@@@@@@#$#$@@@@@@@@@"
);

testJump("lkkkklllll@ippppp@@f@@@ds;ssssssssssssssssssssssspppkfhlk");
testJump("@");
testJump("@ @ @ @ @");
testJump(
  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!@!@@@@@@@@@@@@@@@@@@@@@@@@@#$#$@@@@@@@@@"
);

function TableOutput(string, encoded, decoded, method) {
  this.method = method;
  this.string = string;
  this.encoded = encoded;
  this.decoded = decoded;
}

function testEscape(input) {
  encoded = EscapeEncoder(input);
  decoded = EscapeDecoder(encoded);
  Table = new TableOutput(input, encoded, decoded, "Escape RLE");
  console.table(Table);
}

function testJump(input) {
  encoded = JumpEncoder(input);
  decoded = JumpDecoder(encoded);
  Table = new TableOutput(input, encoded, decoded, "Jump RLE");
  console.table(Table);
}
