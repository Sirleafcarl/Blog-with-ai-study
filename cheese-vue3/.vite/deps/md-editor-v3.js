import {
  markdown
} from "./chunk-UVZR4QZK.js";
import "./chunk-WXKRM75G.js";
import "./chunk-JL3CXLWB.js";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from "./chunk-IMB5L3AU.js";
import "./chunk-F2VOPIXA.js";
import {
  Annotation,
  ChangeDesc,
  ChangeSet,
  CharCategory,
  Compartment,
  Decoration,
  Direction,
  EditorSelection,
  EditorState,
  EditorView,
  Facet,
  GutterMarker,
  HighlightStyle,
  IndentContext,
  LanguageDescription,
  LanguageSupport,
  NodeProp,
  Prec,
  RangeSet,
  RangeSetBuilder,
  StateEffect,
  StateField,
  StreamLanguage,
  Text,
  Transaction,
  ViewPlugin,
  WidgetType,
  bracketMatching,
  codePointAt,
  codePointSize,
  combineConfig,
  countColumn,
  crosshairCursor,
  defaultHighlightStyle,
  drawSelection,
  dropCursor,
  findClusterBreak,
  foldGutter,
  foldKeymap,
  fromCodePoint,
  getIndentUnit,
  getIndentation,
  getPanel,
  gutter,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  hoverTooltip,
  indentOnInput,
  indentString,
  indentUnit,
  keymap,
  lineNumbers,
  logException,
  matchBrackets,
  placeholder,
  rectangularSelection,
  runScopeHandlers,
  showPanel,
  showTooltip,
  syntaxHighlighting,
  syntaxTree,
  tags
} from "./chunk-6LEIGOGM.js";
import {
  require_markdown_it
} from "./chunk-ZJ7RGJGY.js";
import {
  Fragment,
  cloneVNode,
  computed,
  createVNode,
  defineComponent,
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  watch
} from "./chunk-LLTYFZEM.js";
import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM
} from "./chunk-IGLCBFGR.js";

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
  "node_modules/toggle-selection/index.js"(exports, module) {
    module.exports = function() {
      var selection = document.getSelection();
      if (!selection.rangeCount) {
        return function() {
        };
      }
      var active = document.activeElement;
      var ranges = [];
      for (var i2 = 0; i2 < selection.rangeCount; i2++) {
        ranges.push(selection.getRangeAt(i2));
      }
      switch (active.tagName.toUpperCase()) {
        case "INPUT":
        case "TEXTAREA":
          active.blur();
          break;
        default:
          active = null;
          break;
      }
      selection.removeAllRanges();
      return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) {
          ranges.forEach(function(range) {
            selection.addRange(range);
          });
        }
        active && active.focus();
      };
    };
  }
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
  "node_modules/copy-to-clipboard/index.js"(exports, module) {
    "use strict";
    var deselectCurrent = require_toggle_selection();
    var clipboardToIE11Formatting = {
      "text/plain": "Text",
      "text/html": "Url",
      "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format(message) {
      var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
      return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy(text, options) {
      var debug, message, reselectPrevious, range, selection, mark, success = false;
      if (!options) {
        options = {};
      }
      debug = options.debug || false;
      try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        mark.ariaHidden = "true";
        mark.style.all = "unset";
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e2) {
          e2.stopPropagation();
          if (options.format) {
            e2.preventDefault();
            if (typeof e2.clipboardData === "undefined") {
              debug && console.warn("unable to use e.clipboardData");
              debug && console.warn("trying IE specific stuff");
              window.clipboardData.clearData();
              var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
              window.clipboardData.setData(format2, text);
            } else {
              e2.clipboardData.clearData();
              e2.clipboardData.setData(options.format, text);
            }
          }
          if (options.onCopy) {
            e2.preventDefault();
            options.onCopy(e2.clipboardData);
          }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("copy command was unsuccessful");
        }
        success = true;
      } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
          window.clipboardData.setData(options.format || "text", text);
          options.onCopy && options.onCopy(window.clipboardData);
          success = true;
        } catch (err2) {
          debug && console.error("unable to copy using clipboardData: ", err2);
          debug && console.error("falling back to prompt");
          message = format("message" in options ? options.message : defaultMessage);
          window.prompt(message, text);
        }
      } finally {
        if (selection) {
          if (typeof selection.removeRange == "function") {
            selection.removeRange(range);
          } else {
            selection.removeAllRanges();
          }
        }
        if (mark) {
          document.body.removeChild(mark);
        }
        reselectPrevious();
      }
      return success;
    }
    module.exports = copy;
  }
});

// node_modules/markdown-it-task-lists/index.js
var require_markdown_it_task_lists = __commonJS({
  "node_modules/markdown-it-task-lists/index.js"(exports, module) {
    var disableCheckboxes = true;
    var useLabelWrapper = false;
    var useLabelAfter = false;
    module.exports = function(md, options) {
      if (options) {
        disableCheckboxes = !options.enabled;
        useLabelWrapper = !!options.label;
        useLabelAfter = !!options.labelAfter;
      }
      md.core.ruler.after("inline", "github-task-lists", function(state) {
        var tokens = state.tokens;
        for (var i2 = 2; i2 < tokens.length; i2++) {
          if (isTodoItem(tokens, i2)) {
            todoify(tokens[i2], state.Token);
            attrSet(tokens[i2 - 2], "class", "task-list-item" + (!disableCheckboxes ? " enabled" : ""));
            attrSet(tokens[parentToken(tokens, i2 - 2)], "class", "contains-task-list");
          }
        }
      });
    };
    function attrSet(token, name, value) {
      var index = token.attrIndex(name);
      var attr = [name, value];
      if (index < 0) {
        token.attrPush(attr);
      } else {
        token.attrs[index] = attr;
      }
    }
    function parentToken(tokens, index) {
      var targetLevel = tokens[index].level - 1;
      for (var i2 = index - 1; i2 >= 0; i2--) {
        if (tokens[i2].level === targetLevel) {
          return i2;
        }
      }
      return -1;
    }
    function isTodoItem(tokens, index) {
      return isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithTodoMarkdown(tokens[index]);
    }
    function todoify(token, TokenConstructor) {
      token.children.unshift(makeCheckbox(token, TokenConstructor));
      token.children[1].content = token.children[1].content.slice(3);
      token.content = token.content.slice(3);
      if (useLabelWrapper) {
        if (useLabelAfter) {
          token.children.pop();
          var id = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
          token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
          token.children.push(afterLabel(token.content, id, TokenConstructor));
        } else {
          token.children.unshift(beginLabel(TokenConstructor));
          token.children.push(endLabel(TokenConstructor));
        }
      }
    }
    function makeCheckbox(token, TokenConstructor) {
      var checkbox = new TokenConstructor("html_inline", "", 0);
      var disabledAttr = disableCheckboxes ? ' disabled="" ' : "";
      if (token.content.indexOf("[ ] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
      } else if (token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
      }
      return checkbox;
    }
    function beginLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "<label>";
      return token;
    }
    function endLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "</label>";
      return token;
    }
    function afterLabel(content, id, TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = '<label class="task-list-item-label" for="' + id + '">' + content + "</label>";
      token.attrs = [{ for: id }];
      return token;
    }
    function isInline(token) {
      return token.type === "inline";
    }
    function isParagraph(token) {
      return token.type === "paragraph_open";
    }
    function isListItem(token) {
      return token.type === "list_item_open";
    }
    function startsWithTodoMarkdown(token) {
      return token.content.indexOf("[ ] ") === 0 || token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0;
    }
  }
});

// node_modules/markdown-it-codetabs/index.js
var require_markdown_it_codetabs = __commonJS({
  "node_modules/markdown-it-codetabs/index.js"(exports, module) {
    "use strict";
    module.exports = function(md, opts) {
      var defaultRender = md.renderer.rules.fence, unescapeAll = md.utils.unescapeAll, re = /\[(\w*)(?::([\w ]*))?\]/;
      function getInfo(token) {
        return token.info ? unescapeAll(token.info).trim() : "";
      }
      function getGroupAndTab(token) {
        var info = getInfo(token), [group = null, tab = ""] = (re.exec(info) || []).slice(1);
        return [group, tab];
      }
      function getLangName(token) {
        var info = getInfo(token);
        return info ? info.split(/(\s+)/g)[0] : "";
      }
      function fenceGroup(tokens, idx, options, env, slf) {
        if (tokens[idx].hidden) {
          return "";
        }
        const [GROUP, _] = getGroupAndTab(tokens[idx]);
        if (GROUP === null) {
          return defaultRender(tokens, idx, options, env, slf);
        }
        var token, group, tab, checked, labels = "", pres = "";
        for (let i2 = idx; i2 < tokens.length; i2++) {
          token = tokens[i2];
          [group, tab] = getGroupAndTab(token);
          if (group !== GROUP) {
            break;
          }
          token.info = token.info.replace(re, "");
          token.hidden = true;
          checked = i2 - idx > 0 ? "" : " checked";
          labels += `<li><input type="radio" name="label-group-${idx}"${checked}><label for="group-${idx}-tab-${i2 - idx}" onclick="this.previousElementSibling.click()">${tab || getLangName(token)}</label></li>
`;
          pres += `<input type="radio" id="group-${idx}-tab-${i2 - idx}" name="group-${idx}"${checked}>
` + defaultRender(tokens, i2, options, env, slf);
        }
        return '<div class="code-tabs">\n<ul>\n' + labels + "</ul>\n" + pres + "</div>";
      }
      md.renderer.rules.fence = fenceGroup;
    };
  }
});

// node_modules/@codemirror/commands/dist/index.js
var toggleComment = (target) => {
  let { state } = target, line = state.doc.lineAt(state.selection.main.from), config = getConfig(target.state, line.from);
  return config.line ? toggleLineComment(target) : config.block ? toggleBlockCommentByLine(target) : false;
};
function command(f, option) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let tr = f(option, state);
    if (!tr)
      return false;
    dispatch(state.update(tr));
    return true;
  };
}
var toggleLineComment = command(
  changeLineComment,
  0
  /* CommentOption.Toggle */
);
var lineComment = command(
  changeLineComment,
  1
  /* CommentOption.Comment */
);
var lineUncomment = command(
  changeLineComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockComment = command(
  changeBlockComment,
  0
  /* CommentOption.Toggle */
);
var blockComment = command(
  changeBlockComment,
  1
  /* CommentOption.Comment */
);
var blockUncomment = command(
  changeBlockComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockCommentByLine = command(
  (o, s2) => changeBlockComment(o, s2, selectedLineRanges(s2)),
  0
  /* CommentOption.Toggle */
);
function getConfig(state, pos) {
  let data = state.languageDataAt("commentTokens", pos);
  return data.length ? data[0] : {};
}
var SearchMargin = 50;
function findBlockComment(state, { open, close }, from, to2) {
  let textBefore = state.sliceDoc(from - SearchMargin, from);
  let textAfter = state.sliceDoc(to2, to2 + SearchMargin);
  let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
  let beforeOff = textBefore.length - spaceBefore;
  if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
    return {
      open: { pos: from - spaceBefore, margin: spaceBefore && 1 },
      close: { pos: to2 + spaceAfter, margin: spaceAfter && 1 }
    };
  }
  let startText, endText;
  if (to2 - from <= 2 * SearchMargin) {
    startText = endText = state.sliceDoc(from, to2);
  } else {
    startText = state.sliceDoc(from, from + SearchMargin);
    endText = state.sliceDoc(to2 - SearchMargin, to2);
  }
  let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
  let endOff = endText.length - endSpace - close.length;
  if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
    return {
      open: {
        pos: from + startSpace + open.length,
        margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
      },
      close: {
        pos: to2 - endSpace - close.length,
        margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
      }
    };
  }
  return null;
}
function selectedLineRanges(state) {
  let ranges = [];
  for (let r2 of state.selection.ranges) {
    let fromLine = state.doc.lineAt(r2.from);
    let toLine = r2.to <= fromLine.to ? fromLine : state.doc.lineAt(r2.to);
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last].to > fromLine.from)
      ranges[last].to = toLine.to;
    else
      ranges.push({ from: fromLine.from + /^\s*/.exec(fromLine.text)[0].length, to: toLine.to });
  }
  return ranges;
}
function changeBlockComment(option, state, ranges = state.selection.ranges) {
  let tokens = ranges.map((r2) => getConfig(state, r2.from).block);
  if (!tokens.every((c) => c))
    return null;
  let comments = ranges.map((r2, i2) => findBlockComment(state, tokens[i2], r2.from, r2.to));
  if (option != 2 && !comments.every((c) => c)) {
    return { changes: state.changes(ranges.map((range, i2) => {
      if (comments[i2])
        return [];
      return [{ from: range.from, insert: tokens[i2].open + " " }, { from: range.to, insert: " " + tokens[i2].close }];
    })) };
  } else if (option != 1 && comments.some((c) => c)) {
    let changes = [];
    for (let i2 = 0, comment; i2 < comments.length; i2++)
      if (comment = comments[i2]) {
        let token = tokens[i2], { open, close } = comment;
        changes.push({ from: open.pos - token.open.length, to: open.pos + open.margin }, { from: close.pos - close.margin, to: close.pos + token.close.length });
      }
    return { changes };
  }
  return null;
}
function changeLineComment(option, state, ranges = state.selection.ranges) {
  let lines = [];
  let prevLine = -1;
  for (let { from, to: to2 } of ranges) {
    let startI = lines.length, minIndent = 1e9;
    let token = getConfig(state, from).line;
    if (!token)
      continue;
    for (let pos = from; pos <= to2; ) {
      let line = state.doc.lineAt(pos);
      if (line.from > prevLine && (from == to2 || to2 > line.from)) {
        prevLine = line.from;
        let indent = /^\s*/.exec(line.text)[0].length;
        let empty2 = indent == line.length;
        let comment = line.text.slice(indent, indent + token.length) == token ? indent : -1;
        if (indent < line.text.length && indent < minIndent)
          minIndent = indent;
        lines.push({ line, comment, token, indent, empty: empty2, single: false });
      }
      pos = line.to + 1;
    }
    if (minIndent < 1e9) {
      for (let i2 = startI; i2 < lines.length; i2++)
        if (lines[i2].indent < lines[i2].line.text.length)
          lines[i2].indent = minIndent;
    }
    if (lines.length == startI + 1)
      lines[startI].single = true;
  }
  if (option != 2 && lines.some((l) => l.comment < 0 && (!l.empty || l.single))) {
    let changes = [];
    for (let { line, token, indent, empty: empty2, single } of lines)
      if (single || !empty2)
        changes.push({ from: line.from + indent, insert: token + " " });
    let changeSet = state.changes(changes);
    return { changes: changeSet, selection: state.selection.map(changeSet, 1) };
  } else if (option != 1 && lines.some((l) => l.comment >= 0)) {
    let changes = [];
    for (let { line, comment, token } of lines)
      if (comment >= 0) {
        let from = line.from + comment, to2 = from + token.length;
        if (line.text[to2 - line.from] == " ")
          to2++;
        changes.push({ from, to: to2 });
      }
    return { changes };
  }
  return null;
}
var fromHistory = Annotation.define();
var isolateHistory = Annotation.define();
var invertedEffects = Facet.define();
var historyConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (_t2, isAdjacent2) => isAdjacent2
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (a, b) => (tr, adj) => a(tr, adj) || b(tr, adj)
    });
  }
});
function changeEnd(changes) {
  let end = 0;
  changes.iterChangedRanges((_, to2) => end = to2);
  return end;
}
var historyField_ = StateField.define({
  create() {
    return HistoryState.empty;
  },
  update(state, tr) {
    let config = tr.state.facet(historyConfig);
    let fromHist = tr.annotation(fromHistory);
    if (fromHist) {
      let selection = tr.docChanged ? EditorSelection.single(changeEnd(tr.changes)) : void 0;
      let item = HistEvent.fromTransaction(tr, selection), from = fromHist.side;
      let other = from == 0 ? state.undone : state.done;
      if (item)
        other = updateBranch(other, other.length, config.minDepth, item);
      else
        other = addSelection(other, tr.startState.selection);
      return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
    }
    let isolate = tr.annotation(isolateHistory);
    if (isolate == "full" || isolate == "before")
      state = state.isolate();
    if (tr.annotation(Transaction.addToHistory) === false)
      return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
    let event = HistEvent.fromTransaction(tr);
    let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
    if (event)
      state = state.addChanges(event, time, userEvent, config, tr);
    else if (tr.selection)
      state = state.addSelection(tr.startState.selection, time, userEvent, config.newGroupDelay);
    if (isolate == "full" || isolate == "after")
      state = state.isolate();
    return state;
  },
  toJSON(value) {
    return { done: value.done.map((e2) => e2.toJSON()), undone: value.undone.map((e2) => e2.toJSON()) };
  },
  fromJSON(json) {
    return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
  }
});
function history(config = {}) {
  return [
    historyField_,
    historyConfig.of(config),
    EditorView.domEventHandlers({
      beforeinput(e2, view) {
        let command2 = e2.inputType == "historyUndo" ? undo : e2.inputType == "historyRedo" ? redo : null;
        if (!command2)
          return false;
        e2.preventDefault();
        return command2(view);
      }
    })
  ];
}
function cmd(side, selection) {
  return function({ state, dispatch }) {
    if (!selection && state.readOnly)
      return false;
    let historyState = state.field(historyField_, false);
    if (!historyState)
      return false;
    let tr = historyState.pop(side, state, selection);
    if (!tr)
      return false;
    dispatch(tr);
    return true;
  };
}
var undo = cmd(0, false);
var redo = cmd(1, false);
var undoSelection = cmd(0, true);
var redoSelection = cmd(1, true);
function depth(side) {
  return function(state) {
    let histState = state.field(historyField_, false);
    if (!histState)
      return 0;
    let branch = side == 0 ? histState.done : histState.undone;
    return branch.length - (branch.length && !branch[0].changes ? 1 : 0);
  };
}
var undoDepth = depth(
  0
  /* BranchName.Done */
);
var redoDepth = depth(
  1
  /* BranchName.Undone */
);
var HistEvent = class _HistEvent {
  constructor(changes, effects, mapped, startSelection, selectionsAfter) {
    this.changes = changes;
    this.effects = effects;
    this.mapped = mapped;
    this.startSelection = startSelection;
    this.selectionsAfter = selectionsAfter;
  }
  setSelAfter(after) {
    return new _HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
  }
  toJSON() {
    var _a, _b, _c;
    return {
      changes: (_a = this.changes) === null || _a === void 0 ? void 0 : _a.toJSON(),
      mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
      startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s2) => s2.toJSON())
    };
  }
  static fromJSON(json) {
    return new _HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(tr, selection) {
    let effects = none;
    for (let invert of tr.startState.facet(invertedEffects)) {
      let result = invert(tr);
      if (result.length)
        effects = effects.concat(result);
    }
    if (!effects.length && tr.changes.empty)
      return null;
    return new _HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection || tr.startState.selection, none);
  }
  static selection(selections) {
    return new _HistEvent(void 0, none, void 0, void 0, selections);
  }
};
function updateBranch(branch, to2, maxLen, newEvent) {
  let start = to2 + 1 > maxLen + 20 ? to2 - maxLen - 1 : 0;
  let newBranch = branch.slice(start, to2);
  newBranch.push(newEvent);
  return newBranch;
}
function isAdjacent(a, b) {
  let ranges = [], isAdjacent2 = false;
  a.iterChangedRanges((f, t2) => ranges.push(f, t2));
  b.iterChangedRanges((_f, _t2, f, t2) => {
    for (let i2 = 0; i2 < ranges.length; ) {
      let from = ranges[i2++], to2 = ranges[i2++];
      if (t2 >= from && f <= to2)
        isAdjacent2 = true;
    }
  });
  return isAdjacent2;
}
function eqSelectionShape(a, b) {
  return a.ranges.length == b.ranges.length && a.ranges.filter((r2, i2) => r2.empty != b.ranges[i2].empty).length === 0;
}
function conc(a, b) {
  return !a.length ? b : !b.length ? a : a.concat(b);
}
var none = [];
var MaxSelectionsPerEvent = 200;
function addSelection(branch, selection) {
  if (!branch.length) {
    return [HistEvent.selection([selection])];
  } else {
    let lastEvent = branch[branch.length - 1];
    let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
    if (sels.length && sels[sels.length - 1].eq(selection))
      return branch;
    sels.push(selection);
    return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
  }
}
function popSelection(branch) {
  let last = branch[branch.length - 1];
  let newBranch = branch.slice();
  newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
  return newBranch;
}
function addMappingToBranch(branch, mapping) {
  if (!branch.length)
    return branch;
  let length = branch.length, selections = none;
  while (length) {
    let event = mapEvent(branch[length - 1], mapping, selections);
    if (event.changes && !event.changes.empty || event.effects.length) {
      let result = branch.slice(0, length);
      result[length - 1] = event;
      return result;
    } else {
      mapping = event.mapped;
      length--;
      selections = event.selectionsAfter;
    }
  }
  return selections.length ? [HistEvent.selection(selections)] : none;
}
function mapEvent(event, mapping, extraSelections) {
  let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s2) => s2.map(mapping)) : none, extraSelections);
  if (!event.changes)
    return HistEvent.selection(selections);
  let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
  let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
  return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
}
var joinableUserEvent = /^(input\.type|delete)($|\.)/;
var HistoryState = class _HistoryState {
  constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
    this.done = done;
    this.undone = undone;
    this.prevTime = prevTime;
    this.prevUserEvent = prevUserEvent;
  }
  isolate() {
    return this.prevTime ? new _HistoryState(this.done, this.undone) : this;
  }
  addChanges(event, time, userEvent, config, tr) {
    let done = this.done, lastEvent = done[done.length - 1];
    if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < config.newGroupDelay && config.joinToEvent(tr, isAdjacent(lastEvent.changes, event.changes)) || // For compose (but not compose.start) events, always join with previous event
    userEvent == "input.type.compose")) {
      done = updateBranch(done, done.length - 1, config.minDepth, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none));
    } else {
      done = updateBranch(done, done.length, config.minDepth, event);
    }
    return new _HistoryState(done, none, time, userEvent);
  }
  addSelection(selection, time, userEvent, newGroupDelay) {
    let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none;
    if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection))
      return this;
    return new _HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
  }
  addMapping(mapping) {
    return new _HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
  }
  pop(side, state, selection) {
    let branch = side == 0 ? this.done : this.undone;
    if (branch.length == 0)
      return null;
    let event = branch[branch.length - 1];
    if (selection && event.selectionsAfter.length) {
      return state.update({
        selection: event.selectionsAfter[event.selectionsAfter.length - 1],
        annotations: fromHistory.of({ side, rest: popSelection(branch) }),
        userEvent: side == 0 ? "select.undo" : "select.redo",
        scrollIntoView: true
      });
    } else if (!event.changes) {
      return null;
    } else {
      let rest = branch.length == 1 ? none : branch.slice(0, branch.length - 1);
      if (event.mapped)
        rest = addMappingToBranch(rest, event.mapped);
      return state.update({
        changes: event.changes,
        selection: event.startSelection,
        effects: event.effects,
        annotations: fromHistory.of({ side, rest }),
        filter: false,
        userEvent: side == 0 ? "undo" : "redo",
        scrollIntoView: true
      });
    }
  }
};
HistoryState.empty = new HistoryState(none, none);
var historyKeymap = [
  { key: "Mod-z", run: undo, preventDefault: true },
  { key: "Mod-y", mac: "Mod-Shift-z", run: redo, preventDefault: true },
  { linux: "Ctrl-Shift-z", run: redo, preventDefault: true },
  { key: "Mod-u", run: undoSelection, preventDefault: true },
  { key: "Alt-u", mac: "Mod-Shift-u", run: redoSelection, preventDefault: true }
];
function updateSel(sel, by) {
  return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
}
function setSel(state, selection) {
  return state.update({ selection, scrollIntoView: true, userEvent: "select" });
}
function moveSel({ state, dispatch }, how) {
  let selection = updateSel(state.selection, how);
  if (selection.eq(state.selection))
    return false;
  dispatch(setSel(state, selection));
  return true;
}
function rangeEnd(range, forward) {
  return EditorSelection.cursor(forward ? range.to : range.from);
}
function cursorByChar(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
}
function ltrAtCursor(view) {
  return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
}
var cursorCharLeft = (view) => cursorByChar(view, !ltrAtCursor(view));
var cursorCharRight = (view) => cursorByChar(view, ltrAtCursor(view));
function cursorByGroup(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
}
var cursorGroupLeft = (view) => cursorByGroup(view, !ltrAtCursor(view));
var cursorGroupRight = (view) => cursorByGroup(view, ltrAtCursor(view));
function interestingNode(state, node, bracketProp) {
  if (node.type.prop(bracketProp))
    return true;
  let len = node.to - node.from;
  return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
}
function moveBySyntax(state, start, forward) {
  let pos = syntaxTree(state).resolveInner(start.head);
  let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
  for (let at2 = start.head; ; ) {
    let next = forward ? pos.childAfter(at2) : pos.childBefore(at2);
    if (!next)
      break;
    if (interestingNode(state, next, bracketProp))
      pos = next;
    else
      at2 = forward ? next.to : next.from;
  }
  let bracket = pos.type.prop(bracketProp), match, newPos;
  if (bracket && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched)
    newPos = forward ? match.end.to : match.end.from;
  else
    newPos = forward ? pos.to : pos.from;
  return EditorSelection.cursor(newPos, forward ? -1 : 1);
}
var cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function cursorByLine(view, forward) {
  return moveSel(view, (range) => {
    if (!range.empty)
      return rangeEnd(range, forward);
    let moved = view.moveVertically(range, forward);
    return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
  });
}
var cursorLineUp = (view) => cursorByLine(view, false);
var cursorLineDown = (view) => cursorByLine(view, true);
function pageInfo(view) {
  let selfScroll = view.scrollDOM.clientHeight < view.scrollDOM.scrollHeight - 2;
  let marginTop = 0, marginBottom = 0, height;
  if (selfScroll) {
    for (let source of view.state.facet(EditorView.scrollMargins)) {
      let margins = source(view);
      if (margins === null || margins === void 0 ? void 0 : margins.top)
        marginTop = Math.max(margins === null || margins === void 0 ? void 0 : margins.top, marginTop);
      if (margins === null || margins === void 0 ? void 0 : margins.bottom)
        marginBottom = Math.max(margins === null || margins === void 0 ? void 0 : margins.bottom, marginBottom);
    }
    height = view.scrollDOM.clientHeight - marginTop - marginBottom;
  } else {
    height = (view.dom.ownerDocument.defaultView || window).innerHeight;
  }
  return {
    marginTop,
    marginBottom,
    selfScroll,
    height: Math.max(view.defaultLineHeight, height - 5)
  };
}
function cursorByPage(view, forward) {
  let page = pageInfo(view);
  let { state } = view, selection = updateSel(state.selection, (range) => {
    return range.empty ? view.moveVertically(range, forward, page.height) : rangeEnd(range, forward);
  });
  if (selection.eq(state.selection))
    return false;
  let effect;
  if (page.selfScroll) {
    let startPos = view.coordsAtPos(state.selection.main.head);
    let scrollRect = view.scrollDOM.getBoundingClientRect();
    let scrollTop = scrollRect.top + page.marginTop, scrollBottom = scrollRect.bottom - page.marginBottom;
    if (startPos && startPos.top > scrollTop && startPos.bottom < scrollBottom)
      effect = EditorView.scrollIntoView(selection.main.head, { y: "start", yMargin: startPos.top - scrollTop });
  }
  view.dispatch(setSel(state, selection), { effects: effect });
  return true;
}
var cursorPageUp = (view) => cursorByPage(view, false);
var cursorPageDown = (view) => cursorByPage(view, true);
function moveByLineBoundary(view, start, forward) {
  let line = view.lineBlockAt(start.head), moved = view.moveToLineBoundary(start, forward);
  if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
    moved = view.moveToLineBoundary(start, forward, false);
  if (!forward && moved.head == line.from && line.length) {
    let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
    if (space && start.head != line.from + space)
      moved = EditorSelection.cursor(line.from + space);
  }
  return moved;
}
var cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
var cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
var cursorLineBoundaryLeft = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var cursorLineBoundaryRight = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
var cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
function toMatchingBracket(state, dispatch, extend) {
  let found = false, selection = updateSel(state.selection, (range) => {
    let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
    if (!matching || !matching.end)
      return range;
    found = true;
    let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
    return extend ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
  });
  if (!found)
    return false;
  dispatch(setSel(state, selection));
  return true;
}
var cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, false);
function extendSel(view, how) {
  let selection = updateSel(view.state.selection, (range) => {
    let head = how(range);
    return EditorSelection.range(range.anchor, head.head, head.goalColumn, head.bidiLevel || void 0);
  });
  if (selection.eq(view.state.selection))
    return false;
  view.dispatch(setSel(view.state, selection));
  return true;
}
function selectByChar(view, forward) {
  return extendSel(view, (range) => view.moveByChar(range, forward));
}
var selectCharLeft = (view) => selectByChar(view, !ltrAtCursor(view));
var selectCharRight = (view) => selectByChar(view, ltrAtCursor(view));
function selectByGroup(view, forward) {
  return extendSel(view, (range) => view.moveByGroup(range, forward));
}
var selectGroupLeft = (view) => selectByGroup(view, !ltrAtCursor(view));
var selectGroupRight = (view) => selectByGroup(view, ltrAtCursor(view));
var selectSyntaxLeft = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var selectSyntaxRight = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function selectByLine(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward));
}
var selectLineUp = (view) => selectByLine(view, false);
var selectLineDown = (view) => selectByLine(view, true);
function selectByPage(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward, pageInfo(view).height));
}
var selectPageUp = (view) => selectByPage(view, false);
var selectPageDown = (view) => selectByPage(view, true);
var selectLineBoundaryForward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, true));
var selectLineBoundaryBackward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, false));
var selectLineBoundaryLeft = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var selectLineBoundaryRight = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var selectLineStart = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from));
var selectLineEnd = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to));
var cursorDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: 0 }));
  return true;
};
var cursorDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.doc.length }));
  return true;
};
var selectDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: 0 }));
  return true;
};
var selectDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: state.doc.length }));
  return true;
};
var selectAll = ({ state, dispatch }) => {
  dispatch(state.update({ selection: { anchor: 0, head: state.doc.length }, userEvent: "select" }));
  return true;
};
var selectLine = ({ state, dispatch }) => {
  let ranges = selectedLineBlocks(state).map(({ from, to: to2 }) => EditorSelection.range(from, Math.min(to2 + 1, state.doc.length)));
  dispatch(state.update({ selection: EditorSelection.create(ranges), userEvent: "select" }));
  return true;
};
var selectParentSyntax = ({ state, dispatch }) => {
  let selection = updateSel(state.selection, (range) => {
    var _a;
    let context = syntaxTree(state).resolveInner(range.head, 1);
    while (!(context.from < range.from && context.to >= range.to || context.to > range.to && context.from <= range.from || !((_a = context.parent) === null || _a === void 0 ? void 0 : _a.parent)))
      context = context.parent;
    return EditorSelection.range(context.to, context.from);
  });
  dispatch(setSel(state, selection));
  return true;
};
var simplifySelection = ({ state, dispatch }) => {
  let cur = state.selection, selection = null;
  if (cur.ranges.length > 1)
    selection = EditorSelection.create([cur.main]);
  else if (!cur.main.empty)
    selection = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
  if (!selection)
    return false;
  dispatch(setSel(state, selection));
  return true;
};
function deleteBy(target, by) {
  if (target.state.readOnly)
    return false;
  let event = "delete.selection", { state } = target;
  let changes = state.changeByRange((range) => {
    let { from, to: to2 } = range;
    if (from == to2) {
      let towards = by(from);
      if (towards < from) {
        event = "delete.backward";
        towards = skipAtomic(target, towards, false);
      } else if (towards > from) {
        event = "delete.forward";
        towards = skipAtomic(target, towards, true);
      }
      from = Math.min(from, towards);
      to2 = Math.max(to2, towards);
    } else {
      from = skipAtomic(target, from, false);
      to2 = skipAtomic(target, to2, true);
    }
    return from == to2 ? { range } : { changes: { from, to: to2 }, range: EditorSelection.cursor(from) };
  });
  if (changes.changes.empty)
    return false;
  target.dispatch(state.update(changes, {
    scrollIntoView: true,
    userEvent: event,
    effects: event == "delete.selection" ? EditorView.announce.of(state.phrase("Selection deleted")) : void 0
  }));
  return true;
}
function skipAtomic(target, pos, forward) {
  if (target instanceof EditorView)
    for (let ranges of target.state.facet(EditorView.atomicRanges).map((f) => f(target)))
      ranges.between(pos, pos, (from, to2) => {
        if (from < pos && to2 > pos)
          pos = forward ? to2 : from;
      });
  return pos;
}
var deleteByChar = (target, forward) => deleteBy(target, (pos) => {
  let { state } = target, line = state.doc.lineAt(pos), before, targetPos;
  if (!forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
    if (before[before.length - 1] == "	")
      return pos - 1;
    let col = countColumn(before, state.tabSize), drop = col % getIndentUnit(state) || getIndentUnit(state);
    for (let i2 = 0; i2 < drop && before[before.length - 1 - i2] == " "; i2++)
      pos--;
    targetPos = pos;
  } else {
    targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
    if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
      targetPos += forward ? 1 : -1;
  }
  return targetPos;
});
var deleteCharBackward = (view) => deleteByChar(view, false);
var deleteCharForward = (view) => deleteByChar(view, true);
var deleteByGroup = (target, forward) => deleteBy(target, (start) => {
  let pos = start, { state } = target, line = state.doc.lineAt(pos);
  let categorize = state.charCategorizer(pos);
  for (let cat = null; ; ) {
    if (pos == (forward ? line.to : line.from)) {
      if (pos == start && line.number != (forward ? state.doc.lines : 1))
        pos += forward ? 1 : -1;
      break;
    }
    let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
    let nextChar = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
    let nextCat = categorize(nextChar);
    if (cat != null && nextCat != cat)
      break;
    if (nextChar != " " || pos != start)
      cat = nextCat;
    pos = next;
  }
  return pos;
});
var deleteGroupBackward = (target) => deleteByGroup(target, false);
var deleteGroupForward = (target) => deleteByGroup(target, true);
var deleteToLineEnd = (view) => deleteBy(view, (pos) => {
  let lineEnd = view.lineBlockAt(pos).to;
  return pos < lineEnd ? lineEnd : Math.min(view.state.doc.length, pos + 1);
});
var deleteToLineStart = (view) => deleteBy(view, (pos) => {
  let lineStart = view.lineBlockAt(pos).from;
  return pos > lineStart ? lineStart : Math.max(0, pos - 1);
});
var splitLine = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    return {
      changes: { from: range.from, to: range.to, insert: Text.of(["", ""]) },
      range: EditorSelection.cursor(range.from)
    };
  });
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
  return true;
};
var transposeChars = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    if (!range.empty || range.from == 0 || range.from == state.doc.length)
      return { range };
    let pos = range.from, line = state.doc.lineAt(pos);
    let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
    let to2 = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
    return {
      changes: { from, to: to2, insert: state.doc.slice(pos, to2).append(state.doc.slice(from, pos)) },
      range: EditorSelection.cursor(to2)
    };
  });
  if (changes.changes.empty)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "move.character" }));
  return true;
};
function selectedLineBlocks(state) {
  let blocks = [], upto = -1;
  for (let range of state.selection.ranges) {
    let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
    if (!range.empty && range.to == endLine.from)
      endLine = state.doc.lineAt(range.to - 1);
    if (upto >= startLine.number) {
      let prev = blocks[blocks.length - 1];
      prev.to = endLine.to;
      prev.ranges.push(range);
    } else {
      blocks.push({ from: startLine.from, to: endLine.to, ranges: [range] });
    }
    upto = endLine.number + 1;
  }
  return blocks;
}
function moveLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [], ranges = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward ? block.to == state.doc.length : block.from == 0)
      continue;
    let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
    let size = nextLine.length + 1;
    if (forward) {
      changes.push({ from: block.to, to: nextLine.to }, { from: block.from, insert: nextLine.text + state.lineBreak });
      for (let r2 of block.ranges)
        ranges.push(EditorSelection.range(Math.min(state.doc.length, r2.anchor + size), Math.min(state.doc.length, r2.head + size)));
    } else {
      changes.push({ from: nextLine.from, to: block.from }, { from: block.to, insert: state.lineBreak + nextLine.text });
      for (let r2 of block.ranges)
        ranges.push(EditorSelection.range(r2.anchor - size, r2.head - size));
    }
  }
  if (!changes.length)
    return false;
  dispatch(state.update({
    changes,
    scrollIntoView: true,
    selection: EditorSelection.create(ranges, state.selection.mainIndex),
    userEvent: "move.line"
  }));
  return true;
}
var moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
var moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
function copyLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward)
      changes.push({ from: block.from, insert: state.doc.slice(block.from, block.to) + state.lineBreak });
    else
      changes.push({ from: block.to, insert: state.lineBreak + state.doc.slice(block.from, block.to) });
  }
  dispatch(state.update({ changes, scrollIntoView: true, userEvent: "input.copyline" }));
  return true;
}
var copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
var copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
var deleteLine = (view) => {
  if (view.state.readOnly)
    return false;
  let { state } = view, changes = state.changes(selectedLineBlocks(state).map(({ from, to: to2 }) => {
    if (from > 0)
      from--;
    else if (to2 < state.doc.length)
      to2++;
    return { from, to: to2 };
  }));
  let selection = updateSel(state.selection, (range) => view.moveVertically(range, true)).map(changes);
  view.dispatch({ changes, selection, scrollIntoView: true, userEvent: "delete.line" });
  return true;
};
function isBetweenBrackets(state, pos) {
  if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1)))
    return { from: pos, to: pos };
  let context = syntaxTree(state).resolveInner(pos);
  let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
  if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from)
    return { from: before.to, to: after.from };
  return null;
}
var insertNewlineAndIndent = newlineAndIndent(false);
var insertBlankLine = newlineAndIndent(true);
function newlineAndIndent(atEof) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let changes = state.changeByRange((range) => {
      let { from, to: to2 } = range, line = state.doc.lineAt(from);
      let explode = !atEof && from == to2 && isBetweenBrackets(state, from);
      if (atEof)
        from = to2 = (to2 <= line.to ? line : state.doc.lineAt(to2)).to;
      let cx = new IndentContext(state, { simulateBreak: from, simulateDoubleBreak: !!explode });
      let indent = getIndentation(cx, from);
      if (indent == null)
        indent = /^\s*/.exec(state.doc.lineAt(from).text)[0].length;
      while (to2 < line.to && /\s/.test(line.text[to2 - line.from]))
        to2++;
      if (explode)
        ({ from, to: to2 } = explode);
      else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
        from = line.from;
      let insert = ["", indentString(state, indent)];
      if (explode)
        insert.push(indentString(state, cx.lineIndent(line.from, -1)));
      return {
        changes: { from, to: to2, insert: Text.of(insert) },
        range: EditorSelection.cursor(from + 1 + insert[1].length)
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
    return true;
  };
}
function changeBySelectedLine(state, f) {
  let atLine = -1;
  return state.changeByRange((range) => {
    let changes = [];
    for (let pos = range.from; pos <= range.to; ) {
      let line = state.doc.lineAt(pos);
      if (line.number > atLine && (range.empty || range.to > line.from)) {
        f(line, changes, range);
        atLine = line.number;
      }
      pos = line.to + 1;
    }
    let changeSet = state.changes(changes);
    return {
      changes,
      range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
    };
  });
}
var indentSelection = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let updated = /* @__PURE__ */ Object.create(null);
  let context = new IndentContext(state, { overrideIndentation: (start) => {
    let found = updated[start];
    return found == null ? -1 : found;
  } });
  let changes = changeBySelectedLine(state, (line, changes2, range) => {
    let indent = getIndentation(context, line.from);
    if (indent == null)
      return;
    if (!/\S/.test(line.text))
      indent = 0;
    let cur = /^\s*/.exec(line.text)[0];
    let norm = indentString(state, indent);
    if (cur != norm || range.from < line.from + cur.length) {
      updated[line.from] = indent;
      changes2.push({ from: line.from, to: line.from + cur.length, insert: norm });
    }
  });
  if (!changes.changes.empty)
    dispatch(state.update(changes, { userEvent: "indent" }));
  return true;
};
var indentMore = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    changes.push({ from: line.from, insert: state.facet(indentUnit) });
  }), { userEvent: "input.indent" }));
  return true;
};
var indentLess = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    let space = /^\s*/.exec(line.text)[0];
    if (!space)
      return;
    let col = countColumn(space, state.tabSize), keep = 0;
    let insert = indentString(state, Math.max(0, col - getIndentUnit(state)));
    while (keep < space.length && keep < insert.length && space.charCodeAt(keep) == insert.charCodeAt(keep))
      keep++;
    changes.push({ from: line.from + keep, to: line.from + space.length, insert: insert.slice(keep) });
  }), { userEvent: "delete.dedent" }));
  return true;
};
var emacsStyleKeymap = [
  { key: "Ctrl-b", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Ctrl-f", run: cursorCharRight, shift: selectCharRight },
  { key: "Ctrl-p", run: cursorLineUp, shift: selectLineUp },
  { key: "Ctrl-n", run: cursorLineDown, shift: selectLineDown },
  { key: "Ctrl-a", run: cursorLineStart, shift: selectLineStart },
  { key: "Ctrl-e", run: cursorLineEnd, shift: selectLineEnd },
  { key: "Ctrl-d", run: deleteCharForward },
  { key: "Ctrl-h", run: deleteCharBackward },
  { key: "Ctrl-k", run: deleteToLineEnd },
  { key: "Ctrl-Alt-h", run: deleteGroupBackward },
  { key: "Ctrl-o", run: splitLine },
  { key: "Ctrl-t", run: transposeChars },
  { key: "Ctrl-v", run: cursorPageDown }
];
var standardKeymap = [
  { key: "ArrowLeft", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft, shift: selectGroupLeft, preventDefault: true },
  { mac: "Cmd-ArrowLeft", run: cursorLineBoundaryLeft, shift: selectLineBoundaryLeft, preventDefault: true },
  { key: "ArrowRight", run: cursorCharRight, shift: selectCharRight, preventDefault: true },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight, shift: selectGroupRight, preventDefault: true },
  { mac: "Cmd-ArrowRight", run: cursorLineBoundaryRight, shift: selectLineBoundaryRight, preventDefault: true },
  { key: "ArrowUp", run: cursorLineUp, shift: selectLineUp, preventDefault: true },
  { mac: "Cmd-ArrowUp", run: cursorDocStart, shift: selectDocStart },
  { mac: "Ctrl-ArrowUp", run: cursorPageUp, shift: selectPageUp },
  { key: "ArrowDown", run: cursorLineDown, shift: selectLineDown, preventDefault: true },
  { mac: "Cmd-ArrowDown", run: cursorDocEnd, shift: selectDocEnd },
  { mac: "Ctrl-ArrowDown", run: cursorPageDown, shift: selectPageDown },
  { key: "PageUp", run: cursorPageUp, shift: selectPageUp },
  { key: "PageDown", run: cursorPageDown, shift: selectPageDown },
  { key: "Home", run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward, preventDefault: true },
  { key: "Mod-Home", run: cursorDocStart, shift: selectDocStart },
  { key: "End", run: cursorLineBoundaryForward, shift: selectLineBoundaryForward, preventDefault: true },
  { key: "Mod-End", run: cursorDocEnd, shift: selectDocEnd },
  { key: "Enter", run: insertNewlineAndIndent },
  { key: "Mod-a", run: selectAll },
  { key: "Backspace", run: deleteCharBackward, shift: deleteCharBackward },
  { key: "Delete", run: deleteCharForward },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: deleteGroupBackward },
  { key: "Mod-Delete", mac: "Alt-Delete", run: deleteGroupForward },
  { mac: "Mod-Backspace", run: deleteToLineStart },
  { mac: "Mod-Delete", run: deleteToLineEnd }
].concat(emacsStyleKeymap.map((b) => ({ mac: b.key, run: b.run, shift: b.shift })));
var defaultKeymap = [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight },
  { key: "Alt-ArrowUp", run: moveLineUp },
  { key: "Shift-Alt-ArrowUp", run: copyLineUp },
  { key: "Alt-ArrowDown", run: moveLineDown },
  { key: "Shift-Alt-ArrowDown", run: copyLineDown },
  { key: "Escape", run: simplifySelection },
  { key: "Mod-Enter", run: insertBlankLine },
  { key: "Alt-l", mac: "Ctrl-l", run: selectLine },
  { key: "Mod-i", run: selectParentSyntax, preventDefault: true },
  { key: "Mod-[", run: indentLess },
  { key: "Mod-]", run: indentMore },
  { key: "Mod-Alt-\\", run: indentSelection },
  { key: "Shift-Mod-k", run: deleteLine },
  { key: "Shift-Mod-\\", run: cursorMatchingBracket },
  { key: "Mod-/", run: toggleComment },
  { key: "Alt-A", run: toggleBlockComment }
].concat(standardKeymap);
var indentWithTab = { key: "Tab", run: indentMore, shift: indentLess };

// node_modules/crelt/index.es.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string")
    elt = document.createElement(elt);
  var i2 = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next)
      if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string")
          elt.setAttribute(name, value);
        else if (value != null)
          elt[name] = value;
      }
    i2++;
  }
  for (; i2 < arguments.length; i2++)
    add(elt, arguments[i2]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i2 = 0; i2 < child.length; i2++)
      add(elt, child[i2]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// node_modules/@codemirror/search/dist/index.js
var basicNormalize = typeof String.prototype.normalize == "function" ? (x) => x.normalize("NFKD") : (x) => x;
var SearchCursor = class {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(text, query, from = 0, to2 = text.length, normalize, test) {
    this.test = test;
    this.value = { from: 0, to: 0 };
    this.done = false;
    this.matches = [];
    this.buffer = "";
    this.bufferPos = 0;
    this.iter = text.iterRange(from, to2);
    this.bufferStart = from;
    this.normalize = normalize ? (x) => normalize(basicNormalize(x)) : basicNormalize;
    this.query = this.normalize(query);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      this.bufferStart += this.buffer.length;
      this.iter.next();
      if (this.iter.done)
        return -1;
      this.bufferPos = 0;
      this.buffer = this.iter.value;
    }
    return codePointAt(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    while (this.matches.length)
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let next = this.peek();
      if (next < 0) {
        this.done = true;
        return this;
      }
      let str = fromCodePoint(next), start = this.bufferStart + this.bufferPos;
      this.bufferPos += codePointSize(next);
      let norm = this.normalize(str);
      for (let i2 = 0, pos = start; ; i2++) {
        let code = norm.charCodeAt(i2);
        let match = this.match(code, pos);
        if (match) {
          this.value = match;
          return this;
        }
        if (i2 == norm.length - 1)
          break;
        if (pos == start && i2 < str.length && str.charCodeAt(i2) == code)
          pos++;
      }
    }
  }
  match(code, pos) {
    let match = null;
    for (let i2 = 0; i2 < this.matches.length; i2 += 2) {
      let index = this.matches[i2], keep = false;
      if (this.query.charCodeAt(index) == code) {
        if (index == this.query.length - 1) {
          match = { from: this.matches[i2 + 1], to: pos + 1 };
        } else {
          this.matches[i2]++;
          keep = true;
        }
      }
      if (!keep) {
        this.matches.splice(i2, 2);
        i2 -= 2;
      }
    }
    if (this.query.charCodeAt(0) == code) {
      if (this.query.length == 1)
        match = { from: pos, to: pos + 1 };
      else
        this.matches.push(1, pos);
    }
    if (match && this.test && !this.test(match.from, match.to, this.buffer, this.bufferPos))
      match = null;
    return match;
  }
};
if (typeof Symbol != "undefined")
  SearchCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
var empty = { from: -1, to: -1, match: /.*/.exec("") };
var baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
var RegExpCursor = class {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(text, query, options, from = 0, to2 = text.length) {
    this.text = text;
    this.to = to2;
    this.curLine = "";
    this.done = false;
    this.value = empty;
    if (/\\[sWDnr]|\n|\r|\[\^/.test(query))
      return new MultilineRegExpCursor(text, query, options, from, to2);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.iter = text.iter();
    let startLine = text.lineAt(from);
    this.curLineStart = startLine.from;
    this.matchPos = toCharEnd(text, from);
    this.getLine(this.curLineStart);
  }
  getLine(skip) {
    this.iter.next(skip);
    if (this.iter.lineBreak) {
      this.curLine = "";
    } else {
      this.curLine = this.iter.value;
      if (this.curLineStart + this.curLine.length > this.to)
        this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
      this.iter.next();
    }
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1;
    if (this.curLineStart > this.to)
      this.curLine = "";
    else
      this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let off = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = off;
      let match = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (match) {
        let from = this.curLineStart + match.index, to2 = from + match[0].length;
        this.matchPos = toCharEnd(this.text, to2 + (from == to2 ? 1 : 0));
        if (from == this.curLineStart + this.curLine.length)
          this.nextLine();
        if ((from < to2 || from > this.value.to) && (!this.test || this.test(from, to2, match))) {
          this.value = { from, to: to2, match };
          return this;
        }
        off = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to) {
        this.nextLine();
        off = 0;
      } else {
        this.done = true;
        return this;
      }
    }
  }
};
var flattened = /* @__PURE__ */ new WeakMap();
var FlattenedDoc = class _FlattenedDoc {
  constructor(from, text) {
    this.from = from;
    this.text = text;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(doc, from, to2) {
    let cached = flattened.get(doc);
    if (!cached || cached.from >= to2 || cached.to <= from) {
      let flat = new _FlattenedDoc(from, doc.sliceString(from, to2));
      flattened.set(doc, flat);
      return flat;
    }
    if (cached.from == from && cached.to == to2)
      return cached;
    let { text, from: cachedFrom } = cached;
    if (cachedFrom > from) {
      text = doc.sliceString(from, cachedFrom) + text;
      cachedFrom = from;
    }
    if (cached.to < to2)
      text += doc.sliceString(cached.to, to2);
    flattened.set(doc, new _FlattenedDoc(cachedFrom, text));
    return new _FlattenedDoc(from, text.slice(from - cachedFrom, to2 - cachedFrom));
  }
};
var MultilineRegExpCursor = class {
  constructor(text, query, options, from, to2) {
    this.text = text;
    this.to = to2;
    this.done = false;
    this.value = empty;
    this.matchPos = toCharEnd(text, from);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.flat = FlattenedDoc.get(text, from, this.chunkEnd(
      from + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(pos) {
    return pos >= this.to ? this.to : this.text.lineAt(pos).to;
  }
  next() {
    for (; ; ) {
      let off = this.re.lastIndex = this.matchPos - this.flat.from;
      let match = this.re.exec(this.flat.text);
      if (match && !match[0] && match.index == off) {
        this.re.lastIndex = off + 1;
        match = this.re.exec(this.flat.text);
      }
      if (match) {
        let from = this.flat.from + match.index, to2 = from + match[0].length;
        if ((this.flat.to >= this.to || match.index + match[0].length <= this.flat.text.length - 10) && (!this.test || this.test(from, to2, match))) {
          this.value = { from, to: to2, match };
          this.matchPos = toCharEnd(this.text, to2 + (from == to2 ? 1 : 0));
          return this;
        }
      }
      if (this.flat.to == this.to) {
        this.done = true;
        return this;
      }
      this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
};
if (typeof Symbol != "undefined") {
  RegExpCursor.prototype[Symbol.iterator] = MultilineRegExpCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
}
function validRegExp(source) {
  try {
    new RegExp(source, baseFlags);
    return true;
  } catch (_a) {
    return false;
  }
}
function toCharEnd(text, pos) {
  if (pos >= text.length)
    return pos;
  let line = text.lineAt(pos), next;
  while (pos < line.to && (next = line.text.charCodeAt(pos - line.from)) >= 56320 && next < 57344)
    pos++;
  return pos;
}
function createLineDialog(view) {
  let input = crelt("input", { class: "cm-textfield", name: "line" });
  let dom = crelt("form", {
    class: "cm-gotoLine",
    onkeydown: (event) => {
      if (event.keyCode == 27) {
        event.preventDefault();
        view.dispatch({ effects: dialogEffect.of(false) });
        view.focus();
      } else if (event.keyCode == 13) {
        event.preventDefault();
        go2();
      }
    },
    onsubmit: (event) => {
      event.preventDefault();
      go2();
    }
  }, crelt("label", view.state.phrase("Go to line"), ": ", input), " ", crelt("button", { class: "cm-button", type: "submit" }, view.state.phrase("go")));
  function go2() {
    let match = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(input.value);
    if (!match)
      return;
    let { state } = view, startLine = state.doc.lineAt(state.selection.main.head);
    let [, sign, ln, cl2, percent] = match;
    let col = cl2 ? +cl2.slice(1) : 0;
    let line = ln ? +ln : startLine.number;
    if (ln && percent) {
      let pc = line / 100;
      if (sign)
        pc = pc * (sign == "-" ? -1 : 1) + startLine.number / state.doc.lines;
      line = Math.round(state.doc.lines * pc);
    } else if (ln && sign) {
      line = line * (sign == "-" ? -1 : 1) + startLine.number;
    }
    let docLine = state.doc.line(Math.max(1, Math.min(state.doc.lines, line)));
    view.dispatch({
      effects: dialogEffect.of(false),
      selection: EditorSelection.cursor(docLine.from + Math.max(0, Math.min(col, docLine.length))),
      scrollIntoView: true
    });
    view.focus();
  }
  return { dom };
}
var dialogEffect = StateEffect.define();
var dialogField = StateField.define({
  create() {
    return true;
  },
  update(value, tr) {
    for (let e2 of tr.effects)
      if (e2.is(dialogEffect))
        value = e2.value;
    return value;
  },
  provide: (f) => showPanel.from(f, (val) => val ? createLineDialog : null)
});
var gotoLine = (view) => {
  let panel = getPanel(view, createLineDialog);
  if (!panel) {
    let effects = [dialogEffect.of(true)];
    if (view.state.field(dialogField, false) == null)
      effects.push(StateEffect.appendConfig.of([dialogField, baseTheme$1]));
    view.dispatch({ effects });
    panel = getPanel(view, createLineDialog);
  }
  if (panel)
    panel.dom.querySelector("input").focus();
  return true;
};
var baseTheme$1 = EditorView.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
});
var defaultHighlightOptions = {
  highlightWordAroundCursor: false,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: false
};
var highlightConfig = Facet.define({
  combine(options) {
    return combineConfig(options, defaultHighlightOptions, {
      highlightWordAroundCursor: (a, b) => a || b,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function highlightSelectionMatches(options) {
  let ext = [defaultTheme, matchHighlighter];
  if (options)
    ext.push(highlightConfig.of(options));
  return ext;
}
var matchDeco = Decoration.mark({ class: "cm-selectionMatch" });
var mainMatchDeco = Decoration.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function insideWordBoundaries(check, state, from, to2) {
  return (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to2 == state.doc.length || check(state.sliceDoc(to2, to2 + 1)) != CharCategory.Word);
}
function insideWord(check, state, from, to2) {
  return check(state.sliceDoc(from, from + 1)) == CharCategory.Word && check(state.sliceDoc(to2 - 1, to2)) == CharCategory.Word;
}
var matchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = this.getDeco(view);
  }
  update(update) {
    if (update.selectionSet || update.docChanged || update.viewportChanged)
      this.decorations = this.getDeco(update.view);
  }
  getDeco(view) {
    let conf = view.state.facet(highlightConfig);
    let { state } = view, sel = state.selection;
    if (sel.ranges.length > 1)
      return Decoration.none;
    let range = sel.main, query, check = null;
    if (range.empty) {
      if (!conf.highlightWordAroundCursor)
        return Decoration.none;
      let word = state.wordAt(range.head);
      if (!word)
        return Decoration.none;
      check = state.charCategorizer(range.head);
      query = state.sliceDoc(word.from, word.to);
    } else {
      let len = range.to - range.from;
      if (len < conf.minSelectionLength || len > 200)
        return Decoration.none;
      if (conf.wholeWords) {
        query = state.sliceDoc(range.from, range.to);
        check = state.charCategorizer(range.head);
        if (!(insideWordBoundaries(check, state, range.from, range.to) && insideWord(check, state, range.from, range.to)))
          return Decoration.none;
      } else {
        query = state.sliceDoc(range.from, range.to).trim();
        if (!query)
          return Decoration.none;
      }
    }
    let deco = [];
    for (let part of view.visibleRanges) {
      let cursor = new SearchCursor(state.doc, query, part.from, part.to);
      while (!cursor.next().done) {
        let { from, to: to2 } = cursor.value;
        if (!check || insideWordBoundaries(check, state, from, to2)) {
          if (range.empty && from <= range.from && to2 >= range.to)
            deco.push(mainMatchDeco.range(from, to2));
          else if (from >= range.to || to2 <= range.from)
            deco.push(matchDeco.range(from, to2));
          if (deco.length > conf.maxMatches)
            return Decoration.none;
        }
      }
    }
    return Decoration.set(deco);
  }
}, {
  decorations: (v) => v.decorations
});
var defaultTheme = EditorView.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
});
var selectWord = ({ state, dispatch }) => {
  let { selection } = state;
  let newSel = EditorSelection.create(selection.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection.mainIndex);
  if (newSel.eq(selection))
    return false;
  dispatch(state.update({ selection: newSel }));
  return true;
};
function findNextOccurrence(state, query) {
  let { main, ranges } = state.selection;
  let word = state.wordAt(main.head), fullWord = word && word.from == main.from && word.to == main.to;
  for (let cycled = false, cursor = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to); ; ) {
    cursor.next();
    if (cursor.done) {
      if (cycled)
        return null;
      cursor = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
      cycled = true;
    } else {
      if (cycled && ranges.some((r2) => r2.from == cursor.value.from))
        continue;
      if (fullWord) {
        let word2 = state.wordAt(cursor.value.from);
        if (!word2 || word2.from != cursor.value.from || word2.to != cursor.value.to)
          continue;
      }
      return cursor.value;
    }
  }
}
var selectNextOccurrence = ({ state, dispatch }) => {
  let { ranges } = state.selection;
  if (ranges.some((sel) => sel.from === sel.to))
    return selectWord({ state, dispatch });
  let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
  if (state.selection.ranges.some((r2) => state.sliceDoc(r2.from, r2.to) != searchedText))
    return false;
  let range = findNextOccurrence(state, searchedText);
  if (!range)
    return false;
  dispatch(state.update({
    selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
    effects: EditorView.scrollIntoView(range.to)
  }));
  return true;
};
var searchConfigFacet = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      top: false,
      caseSensitive: false,
      literal: false,
      wholeWord: false,
      createPanel: (view) => new SearchPanel(view),
      scrollToMatch: (range) => EditorView.scrollIntoView(range)
    });
  }
});
var SearchQuery = class {
  /**
  Create a query object.
  */
  constructor(config) {
    this.search = config.search;
    this.caseSensitive = !!config.caseSensitive;
    this.literal = !!config.literal;
    this.regexp = !!config.regexp;
    this.replace = config.replace || "";
    this.valid = !!this.search && (!this.regexp || validRegExp(this.search));
    this.unquoted = this.unquote(this.search);
    this.wholeWord = !!config.wholeWord;
  }
  /**
  @internal
  */
  unquote(text) {
    return this.literal ? text : text.replace(/\\([nrt\\])/g, (_, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(other) {
    return this.search == other.search && this.replace == other.replace && this.caseSensitive == other.caseSensitive && this.regexp == other.regexp && this.wholeWord == other.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new RegExpQuery(this) : new StringQuery(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(state, from = 0, to2) {
    let st2 = state.doc ? state : EditorState.create({ doc: state });
    if (to2 == null)
      to2 = st2.doc.length;
    return this.regexp ? regexpCursor(this, st2, from, to2) : stringCursor(this, st2, from, to2);
  }
};
var QueryType = class {
  constructor(spec) {
    this.spec = spec;
  }
};
function stringCursor(spec, state, from, to2) {
  return new SearchCursor(state.doc, spec.unquoted, from, to2, spec.caseSensitive ? void 0 : (x) => x.toLowerCase(), spec.wholeWord ? stringWordTest(state.doc, state.charCategorizer(state.selection.main.head)) : void 0);
}
function stringWordTest(doc, categorizer) {
  return (from, to2, buf, bufPos) => {
    if (bufPos > from || bufPos + buf.length < to2) {
      bufPos = Math.max(0, from - 2);
      buf = doc.sliceString(bufPos, Math.min(doc.length, to2 + 2));
    }
    return (categorizer(charBefore(buf, from - bufPos)) != CharCategory.Word || categorizer(charAfter(buf, from - bufPos)) != CharCategory.Word) && (categorizer(charAfter(buf, to2 - bufPos)) != CharCategory.Word || categorizer(charBefore(buf, to2 - bufPos)) != CharCategory.Word);
  };
}
var StringQuery = class extends QueryType {
  constructor(spec) {
    super(spec);
  }
  nextMatch(state, curFrom, curTo) {
    let cursor = stringCursor(this.spec, state, curTo, state.doc.length).nextOverlapping();
    if (cursor.done)
      cursor = stringCursor(this.spec, state, 0, curFrom).nextOverlapping();
    return cursor.done ? null : cursor.value;
  }
  // Searching in reverse is, rather than implementing inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(state, from, to2) {
    for (let pos = to2; ; ) {
      let start = Math.max(from, pos - 1e4 - this.spec.unquoted.length);
      let cursor = stringCursor(this.spec, state, start, pos), range = null;
      while (!cursor.nextOverlapping().done)
        range = cursor.value;
      if (range)
        return range;
      if (start == from)
        return null;
      pos -= 1e4;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(_result) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(state, limit) {
    let cursor = stringCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor.value);
    }
    return ranges;
  }
  highlight(state, from, to2, add2) {
    let cursor = stringCursor(this.spec, state, Math.max(0, from - this.spec.unquoted.length), Math.min(to2 + this.spec.unquoted.length, state.doc.length));
    while (!cursor.next().done)
      add2(cursor.value.from, cursor.value.to);
  }
};
function regexpCursor(spec, state, from, to2) {
  return new RegExpCursor(state.doc, spec.search, {
    ignoreCase: !spec.caseSensitive,
    test: spec.wholeWord ? regexpWordTest(state.charCategorizer(state.selection.main.head)) : void 0
  }, from, to2);
}
function charBefore(str, index) {
  return str.slice(findClusterBreak(str, index, false), index);
}
function charAfter(str, index) {
  return str.slice(index, findClusterBreak(str, index));
}
function regexpWordTest(categorizer) {
  return (_from, _to, match) => !match[0].length || (categorizer(charBefore(match.input, match.index)) != CharCategory.Word || categorizer(charAfter(match.input, match.index)) != CharCategory.Word) && (categorizer(charAfter(match.input, match.index + match[0].length)) != CharCategory.Word || categorizer(charBefore(match.input, match.index + match[0].length)) != CharCategory.Word);
}
var RegExpQuery = class extends QueryType {
  nextMatch(state, curFrom, curTo) {
    let cursor = regexpCursor(this.spec, state, curTo, state.doc.length).next();
    if (cursor.done)
      cursor = regexpCursor(this.spec, state, 0, curFrom).next();
    return cursor.done ? null : cursor.value;
  }
  prevMatchInRange(state, from, to2) {
    for (let size = 1; ; size++) {
      let start = Math.max(
        from,
        to2 - size * 1e4
        /* FindPrev.ChunkSize */
      );
      let cursor = regexpCursor(this.spec, state, start, to2), range = null;
      while (!cursor.next().done)
        range = cursor.value;
      if (range && (start == from || range.from > start + 10))
        return range;
      if (start == from)
        return null;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(result) {
    return this.spec.unquote(this.spec.replace.replace(/\$([$&\d+])/g, (m, i2) => i2 == "$" ? "$" : i2 == "&" ? result.match[0] : i2 != "0" && +i2 < result.match.length ? result.match[i2] : m));
  }
  matchAll(state, limit) {
    let cursor = regexpCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor.value);
    }
    return ranges;
  }
  highlight(state, from, to2, add2) {
    let cursor = regexpCursor(this.spec, state, Math.max(
      0,
      from - 250
      /* RegExp.HighlightMargin */
    ), Math.min(to2 + 250, state.doc.length));
    while (!cursor.next().done)
      add2(cursor.value.from, cursor.value.to);
  }
};
var setSearchQuery = StateEffect.define();
var togglePanel = StateEffect.define();
var searchState = StateField.define({
  create(state) {
    return new SearchState(defaultQuery(state).create(), null);
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setSearchQuery))
        value = new SearchState(effect.value.create(), value.panel);
      else if (effect.is(togglePanel))
        value = new SearchState(value.query, effect.value ? createSearchPanel : null);
    }
    return value;
  },
  provide: (f) => showPanel.from(f, (val) => val.panel)
});
var SearchState = class {
  constructor(query, panel) {
    this.query = query;
    this.panel = panel;
  }
};
var matchMark = Decoration.mark({ class: "cm-searchMatch" });
var selectedMatchMark = Decoration.mark({ class: "cm-searchMatch cm-searchMatch-selected" });
var searchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.decorations = this.highlight(view.state.field(searchState));
  }
  update(update) {
    let state = update.state.field(searchState);
    if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet || update.viewportChanged)
      this.decorations = this.highlight(state);
  }
  highlight({ query, panel }) {
    if (!panel || !query.spec.valid)
      return Decoration.none;
    let { view } = this;
    let builder = new RangeSetBuilder();
    for (let i2 = 0, ranges = view.visibleRanges, l = ranges.length; i2 < l; i2++) {
      let { from, to: to2 } = ranges[i2];
      while (i2 < l - 1 && to2 > ranges[i2 + 1].from - 2 * 250)
        to2 = ranges[++i2].to;
      query.highlight(view.state, from, to2, (from2, to3) => {
        let selected = view.state.selection.ranges.some((r2) => r2.from == from2 && r2.to == to3);
        builder.add(from2, to3, selected ? selectedMatchMark : matchMark);
      });
    }
    return builder.finish();
  }
}, {
  decorations: (v) => v.decorations
});
function searchCommand(f) {
  return (view) => {
    let state = view.state.field(searchState, false);
    return state && state.query.spec.valid ? f(view, state) : openSearchPanel(view);
  };
}
var findNext = searchCommand((view, { query }) => {
  let { to: to2 } = view.state.selection.main;
  let next = query.nextMatch(view.state, to2, to2);
  if (!next)
    return false;
  let selection = EditorSelection.single(next.from, next.to);
  let config = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection,
    effects: [announceMatch(view, next), config.scrollToMatch(selection.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var findPrevious = searchCommand((view, { query }) => {
  let { state } = view, { from } = state.selection.main;
  let prev = query.prevMatch(state, from, from);
  if (!prev)
    return false;
  let selection = EditorSelection.single(prev.from, prev.to);
  let config = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection,
    effects: [announceMatch(view, prev), config.scrollToMatch(selection.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var selectMatches = searchCommand((view, { query }) => {
  let ranges = query.matchAll(view.state, 1e3);
  if (!ranges || !ranges.length)
    return false;
  view.dispatch({
    selection: EditorSelection.create(ranges.map((r2) => EditorSelection.range(r2.from, r2.to))),
    userEvent: "select.search.matches"
  });
  return true;
});
var selectSelectionMatches = ({ state, dispatch }) => {
  let sel = state.selection;
  if (sel.ranges.length > 1 || sel.main.empty)
    return false;
  let { from, to: to2 } = sel.main;
  let ranges = [], main = 0;
  for (let cur = new SearchCursor(state.doc, state.sliceDoc(from, to2)); !cur.next().done; ) {
    if (ranges.length > 1e3)
      return false;
    if (cur.value.from == from)
      main = ranges.length;
    ranges.push(EditorSelection.range(cur.value.from, cur.value.to));
  }
  dispatch(state.update({
    selection: EditorSelection.create(ranges, main),
    userEvent: "select.search.matches"
  }));
  return true;
};
var replaceNext = searchCommand((view, { query }) => {
  let { state } = view, { from, to: to2 } = state.selection.main;
  if (state.readOnly)
    return false;
  let next = query.nextMatch(state, from, from);
  if (!next)
    return false;
  let changes = [], selection, replacement;
  let effects = [];
  if (next.from == from && next.to == to2) {
    replacement = state.toText(query.getReplacement(next));
    changes.push({ from: next.from, to: next.to, insert: replacement });
    next = query.nextMatch(state, next.from, next.to);
    effects.push(EditorView.announce.of(state.phrase("replaced match on line $", state.doc.lineAt(from).number) + "."));
  }
  if (next) {
    let off = changes.length == 0 || changes[0].from >= next.to ? 0 : next.to - next.from - replacement.length;
    selection = EditorSelection.single(next.from - off, next.to - off);
    effects.push(announceMatch(view, next));
    effects.push(state.facet(searchConfigFacet).scrollToMatch(selection.main, view));
  }
  view.dispatch({
    changes,
    selection,
    effects,
    userEvent: "input.replace"
  });
  return true;
});
var replaceAll = searchCommand((view, { query }) => {
  if (view.state.readOnly)
    return false;
  let changes = query.matchAll(view.state, 1e9).map((match) => {
    let { from, to: to2 } = match;
    return { from, to: to2, insert: query.getReplacement(match) };
  });
  if (!changes.length)
    return false;
  let announceText = view.state.phrase("replaced $ matches", changes.length) + ".";
  view.dispatch({
    changes,
    effects: EditorView.announce.of(announceText),
    userEvent: "input.replace.all"
  });
  return true;
});
function createSearchPanel(view) {
  return view.state.facet(searchConfigFacet).createPanel(view);
}
function defaultQuery(state, fallback) {
  var _a, _b, _c, _d;
  let sel = state.selection.main;
  let selText = sel.empty || sel.to > sel.from + 100 ? "" : state.sliceDoc(sel.from, sel.to);
  if (fallback && !selText)
    return fallback;
  let config = state.facet(searchConfigFacet);
  return new SearchQuery({
    search: ((_a = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _a !== void 0 ? _a : config.literal) ? selText : selText.replace(/\n/g, "\\n"),
    caseSensitive: (_b = fallback === null || fallback === void 0 ? void 0 : fallback.caseSensitive) !== null && _b !== void 0 ? _b : config.caseSensitive,
    literal: (_c = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _c !== void 0 ? _c : config.literal,
    wholeWord: (_d = fallback === null || fallback === void 0 ? void 0 : fallback.wholeWord) !== null && _d !== void 0 ? _d : config.wholeWord
  });
}
function getSearchInput(view) {
  let panel = getPanel(view, createSearchPanel);
  return panel && panel.dom.querySelector("[main-field]");
}
function selectSearchInput(view) {
  let input = getSearchInput(view);
  if (input && input == view.root.activeElement)
    input.select();
}
var openSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (state && state.panel) {
    let searchInput = getSearchInput(view);
    if (searchInput && searchInput != view.root.activeElement) {
      let query = defaultQuery(view.state, state.query.spec);
      if (query.valid)
        view.dispatch({ effects: setSearchQuery.of(query) });
      searchInput.focus();
      searchInput.select();
    }
  } else {
    view.dispatch({ effects: [
      togglePanel.of(true),
      state ? setSearchQuery.of(defaultQuery(view.state, state.query.spec)) : StateEffect.appendConfig.of(searchExtensions)
    ] });
  }
  return true;
};
var closeSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (!state || !state.panel)
    return false;
  let panel = getPanel(view, createSearchPanel);
  if (panel && panel.dom.contains(view.root.activeElement))
    view.focus();
  view.dispatch({ effects: togglePanel.of(false) });
  return true;
};
var searchKeymap = [
  { key: "Mod-f", run: openSearchPanel, scope: "editor search-panel" },
  { key: "F3", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Mod-g", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Escape", run: closeSearchPanel, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: selectSelectionMatches },
  { key: "Alt-g", run: gotoLine },
  { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }
];
var SearchPanel = class {
  constructor(view) {
    this.view = view;
    let query = this.query = view.state.field(searchState).query.spec;
    this.commit = this.commit.bind(this);
    this.searchField = crelt("input", {
      value: query.search,
      placeholder: phrase(view, "Find"),
      "aria-label": phrase(view, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.replaceField = crelt("input", {
      value: query.replace,
      placeholder: phrase(view, "Replace"),
      "aria-label": phrase(view, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.caseField = crelt("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: query.caseSensitive,
      onchange: this.commit
    });
    this.reField = crelt("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: query.regexp,
      onchange: this.commit
    });
    this.wordField = crelt("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: query.wholeWord,
      onchange: this.commit
    });
    function button(name, onclick, content) {
      return crelt("button", { class: "cm-button", name, onclick, type: "button" }, content);
    }
    this.dom = crelt("div", { onkeydown: (e2) => this.keydown(e2), class: "cm-search" }, [
      this.searchField,
      button("next", () => findNext(view), [phrase(view, "next")]),
      button("prev", () => findPrevious(view), [phrase(view, "previous")]),
      button("select", () => selectMatches(view), [phrase(view, "all")]),
      crelt("label", null, [this.caseField, phrase(view, "match case")]),
      crelt("label", null, [this.reField, phrase(view, "regexp")]),
      crelt("label", null, [this.wordField, phrase(view, "by word")]),
      ...view.state.readOnly ? [] : [
        crelt("br"),
        this.replaceField,
        button("replace", () => replaceNext(view), [phrase(view, "replace")]),
        button("replaceAll", () => replaceAll(view), [phrase(view, "replace all")])
      ],
      crelt("button", {
        name: "close",
        onclick: () => closeSearchPanel(view),
        "aria-label": phrase(view, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let query = new SearchQuery({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    if (!query.eq(this.query)) {
      this.query = query;
      this.view.dispatch({ effects: setSearchQuery.of(query) });
    }
  }
  keydown(e2) {
    if (runScopeHandlers(this.view, e2, "search-panel")) {
      e2.preventDefault();
    } else if (e2.keyCode == 13 && e2.target == this.searchField) {
      e2.preventDefault();
      (e2.shiftKey ? findPrevious : findNext)(this.view);
    } else if (e2.keyCode == 13 && e2.target == this.replaceField) {
      e2.preventDefault();
      replaceNext(this.view);
    }
  }
  update(update) {
    for (let tr of update.transactions)
      for (let effect of tr.effects) {
        if (effect.is(setSearchQuery) && !effect.value.eq(this.query))
          this.setQuery(effect.value);
      }
  }
  setQuery(query) {
    this.query = query;
    this.searchField.value = query.search;
    this.replaceField.value = query.replace;
    this.caseField.checked = query.caseSensitive;
    this.reField.checked = query.regexp;
    this.wordField.checked = query.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(searchConfigFacet).top;
  }
};
function phrase(view, phrase2) {
  return view.state.phrase(phrase2);
}
var AnnounceMargin = 30;
var Break = /[\s\.,:;?!]/;
function announceMatch(view, { from, to: to2 }) {
  let line = view.state.doc.lineAt(from), lineEnd = view.state.doc.lineAt(to2).to;
  let start = Math.max(line.from, from - AnnounceMargin), end = Math.min(lineEnd, to2 + AnnounceMargin);
  let text = view.state.sliceDoc(start, end);
  if (start != line.from) {
    for (let i2 = 0; i2 < AnnounceMargin; i2++)
      if (!Break.test(text[i2 + 1]) && Break.test(text[i2])) {
        text = text.slice(i2);
        break;
      }
  }
  if (end != lineEnd) {
    for (let i2 = text.length - 1; i2 > text.length - AnnounceMargin; i2--)
      if (!Break.test(text[i2 - 1]) && Break.test(text[i2])) {
        text = text.slice(0, i2);
        break;
      }
  }
  return EditorView.announce.of(`${view.state.phrase("current match")}. ${text} ${view.state.phrase("on line")} ${line.number}.`);
}
var baseTheme = EditorView.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
});
var searchExtensions = [
  searchState,
  Prec.lowest(searchHighlighter),
  baseTheme
];

// node_modules/@codemirror/lint/dist/index.js
var SelectedDiagnostic = class {
  constructor(from, to2, diagnostic) {
    this.from = from;
    this.to = to2;
    this.diagnostic = diagnostic;
  }
};
var LintState = class _LintState {
  constructor(diagnostics, panel, selected) {
    this.diagnostics = diagnostics;
    this.panel = panel;
    this.selected = selected;
  }
  static init(diagnostics, panel, state) {
    let markedDiagnostics = diagnostics;
    let diagnosticFilter = state.facet(lintConfig).markerFilter;
    if (diagnosticFilter)
      markedDiagnostics = diagnosticFilter(markedDiagnostics);
    let ranges = Decoration.set(markedDiagnostics.map((d) => {
      return d.from == d.to || d.from == d.to - 1 && state.doc.lineAt(d.from).to == d.from ? Decoration.widget({
        widget: new DiagnosticWidget(d),
        diagnostic: d
      }).range(d.from) : Decoration.mark({
        attributes: { class: "cm-lintRange cm-lintRange-" + d.severity },
        diagnostic: d
      }).range(d.from, d.to);
    }), true);
    return new _LintState(ranges, panel, findDiagnostic(ranges));
  }
};
function findDiagnostic(diagnostics, diagnostic = null, after = 0) {
  let found = null;
  diagnostics.between(after, 1e9, (from, to2, { spec }) => {
    if (diagnostic && spec.diagnostic != diagnostic)
      return;
    found = new SelectedDiagnostic(from, to2, spec.diagnostic);
    return false;
  });
  return found;
}
function hideTooltip(tr, tooltip) {
  return !!(tr.effects.some((e2) => e2.is(setDiagnosticsEffect)) || tr.changes.touchesRange(tooltip.pos));
}
function maybeEnableLint(state, effects) {
  return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of(lintExtensions));
}
function setDiagnostics(state, diagnostics) {
  return {
    effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)])
  };
}
var setDiagnosticsEffect = StateEffect.define();
var togglePanel2 = StateEffect.define();
var movePanelSelection = StateEffect.define();
var lintState = StateField.define({
  create() {
    return new LintState(Decoration.none, null, null);
  },
  update(value, tr) {
    if (tr.docChanged) {
      let mapped = value.diagnostics.map(tr.changes), selected = null;
      if (value.selected) {
        let selPos = tr.changes.mapPos(value.selected.from, 1);
        selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
      }
      value = new LintState(mapped, value.panel, selected);
    }
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        value = LintState.init(effect.value, value.panel, tr.state);
      } else if (effect.is(togglePanel2)) {
        value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
      } else if (effect.is(movePanelSelection)) {
        value = new LintState(value.diagnostics, value.panel, effect.value);
      }
    }
    return value;
  },
  provide: (f) => [
    showPanel.from(f, (val) => val.panel),
    EditorView.decorations.from(f, (s2) => s2.diagnostics)
  ]
});
var activeMark = Decoration.mark({ class: "cm-lintRange cm-lintRange-active" });
function lintTooltip(view, pos, side) {
  let { diagnostics } = view.state.field(lintState);
  let found = [], stackStart = 2e8, stackEnd = 0;
  diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to2, { spec }) => {
    if (pos >= from && pos <= to2 && (from == to2 || (pos > from || side > 0) && (pos < to2 || side < 0))) {
      found.push(spec.diagnostic);
      stackStart = Math.min(from, stackStart);
      stackEnd = Math.max(to2, stackEnd);
    }
  });
  let diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
  if (diagnosticFilter)
    found = diagnosticFilter(found);
  if (!found.length)
    return null;
  return {
    pos: stackStart,
    end: stackEnd,
    above: view.state.doc.lineAt(stackStart).to < stackEnd,
    create() {
      return { dom: diagnosticsTooltip(view, found) };
    }
  };
}
function diagnosticsTooltip(view, diagnostics) {
  return crelt("ul", { class: "cm-tooltip-lint" }, diagnostics.map((d) => renderDiagnostic(view, d, false)));
}
var openLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    view.dispatch({ effects: maybeEnableLint(view.state, [togglePanel2.of(true)]) });
  let panel = getPanel(view, LintPanel.open);
  if (panel)
    panel.dom.querySelector(".cm-panel-lint ul").focus();
  return true;
};
var closeLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    return false;
  view.dispatch({ effects: togglePanel2.of(false) });
  return true;
};
var nextDiagnostic = (view) => {
  let field = view.state.field(lintState, false);
  if (!field)
    return false;
  let sel = view.state.selection.main, next = field.diagnostics.iter(sel.to + 1);
  if (!next.value) {
    next = field.diagnostics.iter(0);
    if (!next.value || next.from == sel.from && next.to == sel.to)
      return false;
  }
  view.dispatch({ selection: { anchor: next.from, head: next.to }, scrollIntoView: true });
  return true;
};
var lintKeymap = [
  { key: "Mod-Shift-m", run: openLintPanel, preventDefault: true },
  { key: "F8", run: nextDiagnostic }
];
var lintPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.timeout = -1;
    this.set = true;
    let { delay } = view.state.facet(lintConfig);
    this.lintTime = Date.now() + delay;
    this.run = this.run.bind(this);
    this.timeout = setTimeout(this.run, delay);
  }
  run() {
    let now = Date.now();
    if (now < this.lintTime - 10) {
      setTimeout(this.run, this.lintTime - now);
    } else {
      this.set = false;
      let { state } = this.view, { sources } = state.facet(lintConfig);
      Promise.all(sources.map((source) => Promise.resolve(source(this.view)))).then((annotations) => {
        let all = annotations.reduce((a, b) => a.concat(b));
        if (this.view.state.doc == state.doc)
          this.view.dispatch(setDiagnostics(this.view.state, all));
      }, (error) => {
        logException(this.view.state, error);
      });
    }
  }
  update(update) {
    let config = update.state.facet(lintConfig);
    if (update.docChanged || config != update.startState.facet(lintConfig) || config.needsRefresh && config.needsRefresh(update)) {
      this.lintTime = Date.now() + config.delay;
      if (!this.set) {
        this.set = true;
        this.timeout = setTimeout(this.run, config.delay);
      }
    }
  }
  force() {
    if (this.set) {
      this.lintTime = Date.now();
      this.run();
    }
  }
  destroy() {
    clearTimeout(this.timeout);
  }
});
var lintConfig = Facet.define({
  combine(input) {
    return Object.assign({ sources: input.map((i2) => i2.source) }, combineConfig(input.map((i2) => i2.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null
    }, {
      needsRefresh: (a, b) => !a ? b : !b ? a : (u) => a(u) || b(u)
    }));
  }
});
function assignKeys(actions) {
  let assigned = [];
  if (actions)
    actions:
      for (let { name } of actions) {
        for (let i2 = 0; i2 < name.length; i2++) {
          let ch = name[i2];
          if (/[a-zA-Z]/.test(ch) && !assigned.some((c) => c.toLowerCase() == ch.toLowerCase())) {
            assigned.push(ch);
            continue actions;
          }
        }
        assigned.push("");
      }
  return assigned;
}
function renderDiagnostic(view, diagnostic, inPanel) {
  var _a;
  let keys = inPanel ? assignKeys(diagnostic.actions) : [];
  return crelt("li", { class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity }, crelt("span", { class: "cm-diagnosticText" }, diagnostic.renderMessage ? diagnostic.renderMessage() : diagnostic.message), (_a = diagnostic.actions) === null || _a === void 0 ? void 0 : _a.map((action, i2) => {
    let fired = false, click = (e2) => {
      e2.preventDefault();
      if (fired)
        return;
      fired = true;
      let found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
      if (found)
        action.apply(view, found.from, found.to);
    };
    let { name } = action, keyIndex = keys[i2] ? name.indexOf(keys[i2]) : -1;
    let nameElt = keyIndex < 0 ? name : [
      name.slice(0, keyIndex),
      crelt("u", name.slice(keyIndex, keyIndex + 1)),
      name.slice(keyIndex + 1)
    ];
    return crelt("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: click,
      onmousedown: click,
      "aria-label": ` Action: ${name}${keyIndex < 0 ? "" : ` (access key "${keys[i2]})"`}.`
    }, nameElt);
  }), diagnostic.source && crelt("div", { class: "cm-diagnosticSource" }, diagnostic.source));
}
var DiagnosticWidget = class extends WidgetType {
  constructor(diagnostic) {
    super();
    this.diagnostic = diagnostic;
  }
  eq(other) {
    return other.diagnostic == this.diagnostic;
  }
  toDOM() {
    return crelt("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
var PanelItem = class {
  constructor(view, diagnostic) {
    this.diagnostic = diagnostic;
    this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
    this.dom = renderDiagnostic(view, diagnostic, true);
    this.dom.id = this.id;
    this.dom.setAttribute("role", "option");
  }
};
var LintPanel = class _LintPanel {
  constructor(view) {
    this.view = view;
    this.items = [];
    let onkeydown = (event) => {
      if (event.keyCode == 27) {
        closeLintPanel(this.view);
        this.view.focus();
      } else if (event.keyCode == 38 || event.keyCode == 33) {
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      } else if (event.keyCode == 40 || event.keyCode == 34) {
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      } else if (event.keyCode == 36) {
        this.moveSelection(0);
      } else if (event.keyCode == 35) {
        this.moveSelection(this.items.length - 1);
      } else if (event.keyCode == 13) {
        this.view.focus();
      } else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic } = this.items[this.selectedIndex], keys = assignKeys(diagnostic.actions);
        for (let i2 = 0; i2 < keys.length; i2++)
          if (keys[i2].toUpperCase().charCodeAt(0) == event.keyCode) {
            let found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
            if (found)
              diagnostic.actions[i2].apply(view, found.from, found.to);
          }
      } else {
        return;
      }
      event.preventDefault();
    };
    let onclick = (event) => {
      for (let i2 = 0; i2 < this.items.length; i2++) {
        if (this.items[i2].dom.contains(event.target))
          this.moveSelection(i2);
      }
    };
    this.list = crelt("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown,
      onclick
    });
    this.dom = crelt("div", { class: "cm-panel-lint" }, this.list, crelt("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => closeLintPanel(this.view)
    }, "×"));
    this.update();
  }
  get selectedIndex() {
    let selected = this.view.state.field(lintState).selected;
    if (!selected)
      return -1;
    for (let i2 = 0; i2 < this.items.length; i2++)
      if (this.items[i2].diagnostic == selected.diagnostic)
        return i2;
    return -1;
  }
  update() {
    let { diagnostics, selected } = this.view.state.field(lintState);
    let i2 = 0, needsSync = false, newSelectedItem = null;
    diagnostics.between(0, this.view.state.doc.length, (_start, _end, { spec }) => {
      let found = -1, item;
      for (let j = i2; j < this.items.length; j++)
        if (this.items[j].diagnostic == spec.diagnostic) {
          found = j;
          break;
        }
      if (found < 0) {
        item = new PanelItem(this.view, spec.diagnostic);
        this.items.splice(i2, 0, item);
        needsSync = true;
      } else {
        item = this.items[found];
        if (found > i2) {
          this.items.splice(i2, found - i2);
          needsSync = true;
        }
      }
      if (selected && item.diagnostic == selected.diagnostic) {
        if (!item.dom.hasAttribute("aria-selected")) {
          item.dom.setAttribute("aria-selected", "true");
          newSelectedItem = item;
        }
      } else if (item.dom.hasAttribute("aria-selected")) {
        item.dom.removeAttribute("aria-selected");
      }
      i2++;
    });
    while (i2 < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
      needsSync = true;
      this.items.pop();
    }
    if (this.items.length == 0) {
      this.items.push(new PanelItem(this.view, {
        from: -1,
        to: -1,
        severity: "info",
        message: this.view.state.phrase("No diagnostics")
      }));
      needsSync = true;
    }
    if (newSelectedItem) {
      this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
      this.view.requestMeasure({
        key: this,
        read: () => ({ sel: newSelectedItem.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
        write: ({ sel, panel }) => {
          if (sel.top < panel.top)
            this.list.scrollTop -= panel.top - sel.top;
          else if (sel.bottom > panel.bottom)
            this.list.scrollTop += sel.bottom - panel.bottom;
        }
      });
    } else if (this.selectedIndex < 0) {
      this.list.removeAttribute("aria-activedescendant");
    }
    if (needsSync)
      this.sync();
  }
  sync() {
    let domPos = this.list.firstChild;
    function rm() {
      let prev = domPos;
      domPos = prev.nextSibling;
      prev.remove();
    }
    for (let item of this.items) {
      if (item.dom.parentNode == this.list) {
        while (domPos != item.dom)
          rm();
        domPos = item.dom.nextSibling;
      } else {
        this.list.insertBefore(item.dom, domPos);
      }
    }
    while (domPos)
      rm();
  }
  moveSelection(selectedIndex) {
    if (this.selectedIndex < 0)
      return;
    let field = this.view.state.field(lintState);
    let selection = findDiagnostic(field.diagnostics, this.items[selectedIndex].diagnostic);
    if (!selection)
      return;
    this.view.dispatch({
      selection: { anchor: selection.from, head: selection.to },
      scrollIntoView: true,
      effects: movePanelSelection.of(selection)
    });
  }
  static open(view) {
    return new _LintPanel(view);
  }
};
function svg(content, attrs = `viewBox="0 0 40 40"`) {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}
function underline(color) {
  return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`, `width="6" height="3"`);
}
var baseTheme2 = EditorView.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: underline("#d11") },
  ".cm-lintRange-warning": { backgroundImage: underline("orange") },
  ".cm-lintRange-info": { backgroundImage: underline("#999") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
});
var LintGutterMarker = class extends GutterMarker {
  constructor(diagnostics) {
    super();
    this.diagnostics = diagnostics;
    this.severity = diagnostics.reduce((max, d) => {
      let s2 = d.severity;
      return s2 == "error" || s2 == "warning" && max == "info" ? s2 : max;
    }, "info");
  }
  toDOM(view) {
    let elt = document.createElement("div");
    elt.className = "cm-lint-marker cm-lint-marker-" + this.severity;
    let diagnostics = this.diagnostics;
    let diagnosticsFilter = view.state.facet(lintGutterConfig).tooltipFilter;
    if (diagnosticsFilter)
      diagnostics = diagnosticsFilter(diagnostics);
    if (diagnostics.length)
      elt.onmouseover = () => gutterMarkerMouseOver(view, elt, diagnostics);
    return elt;
  }
};
function trackHoverOn(view, marker) {
  let mousemove = (event) => {
    let rect = marker.getBoundingClientRect();
    if (event.clientX > rect.left - 10 && event.clientX < rect.right + 10 && event.clientY > rect.top - 10 && event.clientY < rect.bottom + 10)
      return;
    for (let target = event.target; target; target = target.parentNode) {
      if (target.nodeType == 1 && target.classList.contains("cm-tooltip-lint"))
        return;
    }
    window.removeEventListener("mousemove", mousemove);
    if (view.state.field(lintGutterTooltip))
      view.dispatch({ effects: setLintGutterTooltip.of(null) });
  };
  window.addEventListener("mousemove", mousemove);
}
function gutterMarkerMouseOver(view, marker, diagnostics) {
  function hovered() {
    let line = view.elementAtHeight(marker.getBoundingClientRect().top + 5 - view.documentTop);
    const linePos = view.coordsAtPos(line.from);
    if (linePos) {
      view.dispatch({ effects: setLintGutterTooltip.of({
        pos: line.from,
        above: false,
        create() {
          return {
            dom: diagnosticsTooltip(view, diagnostics),
            getCoords: () => marker.getBoundingClientRect()
          };
        }
      }) });
    }
    marker.onmouseout = marker.onmousemove = null;
    trackHoverOn(view, marker);
  }
  let { hoverTime } = view.state.facet(lintGutterConfig);
  let hoverTimeout = setTimeout(hovered, hoverTime);
  marker.onmouseout = () => {
    clearTimeout(hoverTimeout);
    marker.onmouseout = marker.onmousemove = null;
  };
  marker.onmousemove = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(hovered, hoverTime);
  };
}
function markersForDiagnostics(doc, diagnostics) {
  let byLine = /* @__PURE__ */ Object.create(null);
  for (let diagnostic of diagnostics) {
    let line = doc.lineAt(diagnostic.from);
    (byLine[line.from] || (byLine[line.from] = [])).push(diagnostic);
  }
  let markers = [];
  for (let line in byLine) {
    markers.push(new LintGutterMarker(byLine[line]).range(+line));
  }
  return RangeSet.of(markers, true);
}
var lintGutterExtension = gutter({
  class: "cm-gutter-lint",
  markers: (view) => view.state.field(lintGutterMarkers)
});
var lintGutterMarkers = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(markers, tr) {
    markers = markers.map(tr.changes);
    let diagnosticFilter = tr.state.facet(lintGutterConfig).markerFilter;
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        let diagnostics = effect.value;
        if (diagnosticFilter)
          diagnostics = diagnosticFilter(diagnostics || []);
        markers = markersForDiagnostics(tr.state.doc, diagnostics.slice(0));
      }
    }
    return markers;
  }
});
var setLintGutterTooltip = StateEffect.define();
var lintGutterTooltip = StateField.define({
  create() {
    return null;
  },
  update(tooltip, tr) {
    if (tooltip && tr.docChanged)
      tooltip = hideTooltip(tr, tooltip) ? null : Object.assign(Object.assign({}, tooltip), { pos: tr.changes.mapPos(tooltip.pos) });
    return tr.effects.reduce((t2, e2) => e2.is(setLintGutterTooltip) ? e2.value : t2, tooltip);
  },
  provide: (field) => showTooltip.from(field)
});
var lintGutterTheme = EditorView.baseTheme({
  ".cm-gutter-lint": {
    width: "1.4em",
    "& .cm-gutterElement": {
      padding: ".2em"
    }
  },
  ".cm-lint-marker": {
    width: "1em",
    height: "1em"
  },
  ".cm-lint-marker-info": {
    content: svg(`<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`)
  },
  ".cm-lint-marker-warning": {
    content: svg(`<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`)
  },
  ".cm-lint-marker-error": {
    content: svg(`<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>`)
  }
});
var lintExtensions = [
  lintState,
  EditorView.decorations.compute([lintState], (state) => {
    let { selected, panel } = state.field(lintState);
    return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([
      activeMark.range(selected.from, selected.to)
    ]);
  }),
  hoverTooltip(lintTooltip, { hideOn: hideTooltip }),
  baseTheme2
];
var lintGutterConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      hoverTime: 300,
      markerFilter: null,
      tooltipFilter: null
    });
  }
});

// node_modules/codemirror/dist/index.js
var basicSetup = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])();
var minimalSetup = (() => [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap
  ])
])();

// node_modules/@codemirror/language-data/dist/index.js
function legacy(parser) {
  return new LanguageSupport(StreamLanguage.define(parser));
}
function sql(dialectName) {
  return import("./dist-TKMU6WPT.js").then((m) => m.sql({ dialect: m[dialectName] }));
}
var languages = [
  // New-style language modes
  LanguageDescription.of({
    name: "C",
    extensions: ["c", "h", "ino"],
    load() {
      return import("./dist-ZHTG347A.js").then((m) => m.cpp());
    }
  }),
  LanguageDescription.of({
    name: "C++",
    alias: ["cpp"],
    extensions: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
    load() {
      return import("./dist-ZHTG347A.js").then((m) => m.cpp());
    }
  }),
  LanguageDescription.of({
    name: "CQL",
    alias: ["cassandra"],
    extensions: ["cql"],
    load() {
      return sql("Cassandra");
    }
  }),
  LanguageDescription.of({
    name: "CSS",
    extensions: ["css"],
    load() {
      return import("./dist-I5EYQD33.js").then((m) => m.css());
    }
  }),
  LanguageDescription.of({
    name: "HTML",
    alias: ["xhtml"],
    extensions: ["html", "htm", "handlebars", "hbs"],
    load() {
      return import("./dist-G3S6LMNZ.js").then((m) => m.html());
    }
  }),
  LanguageDescription.of({
    name: "Java",
    extensions: ["java"],
    load() {
      return import("./dist-DWVWUHEG.js").then((m) => m.java());
    }
  }),
  LanguageDescription.of({
    name: "JavaScript",
    alias: ["ecmascript", "js", "node"],
    extensions: ["js", "mjs", "cjs"],
    load() {
      return import("./dist-KXZ7OH3J.js").then((m) => m.javascript());
    }
  }),
  LanguageDescription.of({
    name: "JSON",
    alias: ["json5"],
    extensions: ["json", "map"],
    load() {
      return import("./dist-AGNVFNJS.js").then((m) => m.json());
    }
  }),
  LanguageDescription.of({
    name: "JSX",
    extensions: ["jsx"],
    load() {
      return import("./dist-KXZ7OH3J.js").then((m) => m.javascript({ jsx: true }));
    }
  }),
  LanguageDescription.of({
    name: "LESS",
    extensions: ["less"],
    load() {
      return import("./dist-6QDWBHYW.js").then((m) => m.less());
    }
  }),
  LanguageDescription.of({
    name: "MariaDB SQL",
    load() {
      return sql("MariaSQL");
    }
  }),
  LanguageDescription.of({
    name: "Markdown",
    extensions: ["md", "markdown", "mkd"],
    load() {
      return import("./dist-FSIHN5K6.js").then((m) => m.markdown());
    }
  }),
  LanguageDescription.of({
    name: "MS SQL",
    load() {
      return sql("MSSQL");
    }
  }),
  LanguageDescription.of({
    name: "MySQL",
    load() {
      return sql("MySQL");
    }
  }),
  LanguageDescription.of({
    name: "PHP",
    extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
    load() {
      return import("./dist-5W7HKEKE.js").then((m) => m.php());
    }
  }),
  LanguageDescription.of({
    name: "PLSQL",
    extensions: ["pls"],
    load() {
      return sql("PLSQL");
    }
  }),
  LanguageDescription.of({
    name: "PostgreSQL",
    load() {
      return sql("PostgreSQL");
    }
  }),
  LanguageDescription.of({
    name: "Python",
    extensions: ["BUILD", "bzl", "py", "pyw"],
    filename: /^(BUCK|BUILD)$/,
    load() {
      return import("./dist-HR2APIPE.js").then((m) => m.python());
    }
  }),
  LanguageDescription.of({
    name: "Rust",
    extensions: ["rs"],
    load() {
      return import("./dist-KUGUF4YJ.js").then((m) => m.rust());
    }
  }),
  LanguageDescription.of({
    name: "Sass",
    extensions: ["sass"],
    load() {
      return import("./dist-ZDURNCAJ.js").then((m) => m.sass({ indented: true }));
    }
  }),
  LanguageDescription.of({
    name: "SCSS",
    extensions: ["scss"],
    load() {
      return import("./dist-ZDURNCAJ.js").then((m) => m.sass());
    }
  }),
  LanguageDescription.of({
    name: "SQL",
    extensions: ["sql"],
    load() {
      return sql("StandardSQL");
    }
  }),
  LanguageDescription.of({
    name: "SQLite",
    load() {
      return sql("SQLite");
    }
  }),
  LanguageDescription.of({
    name: "TSX",
    extensions: ["tsx"],
    load() {
      return import("./dist-KXZ7OH3J.js").then((m) => m.javascript({ jsx: true, typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "TypeScript",
    alias: ["ts"],
    extensions: ["ts"],
    load() {
      return import("./dist-KXZ7OH3J.js").then((m) => m.javascript({ typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "WebAssembly",
    extensions: ["wat", "wast"],
    load() {
      return import("./dist-TSPNK3GD.js").then((m) => m.wast());
    }
  }),
  LanguageDescription.of({
    name: "XML",
    alias: ["rss", "wsdl", "xsd"],
    extensions: ["xml", "xsl", "xsd", "svg"],
    load() {
      return import("./dist-CK66VE2H.js").then((m) => m.xml());
    }
  }),
  // Legacy modes ported from CodeMirror 5
  LanguageDescription.of({
    name: "APL",
    extensions: ["dyalog", "apl"],
    load() {
      return import("./apl-SP7OQ32J.js").then((m) => legacy(m.apl));
    }
  }),
  LanguageDescription.of({
    name: "PGP",
    alias: ["asciiarmor"],
    extensions: ["asc", "pgp", "sig"],
    load() {
      return import("./asciiarmor-HX6TGKES.js").then((m) => legacy(m.asciiArmor));
    }
  }),
  LanguageDescription.of({
    name: "ASN.1",
    extensions: ["asn", "asn1"],
    load() {
      return import("./asn1-YX4AWUS7.js").then((m) => legacy(m.asn1({})));
    }
  }),
  LanguageDescription.of({
    name: "Asterisk",
    filename: /^extensions\.conf$/i,
    load() {
      return import("./asterisk-PZW6JMCJ.js").then((m) => legacy(m.asterisk));
    }
  }),
  LanguageDescription.of({
    name: "Brainfuck",
    extensions: ["b", "bf"],
    load() {
      return import("./brainfuck-F5EUCB55.js").then((m) => legacy(m.brainfuck));
    }
  }),
  LanguageDescription.of({
    name: "Cobol",
    extensions: ["cob", "cpy"],
    load() {
      return import("./cobol-S5IRMUM6.js").then((m) => legacy(m.cobol));
    }
  }),
  LanguageDescription.of({
    name: "C#",
    alias: ["csharp", "cs"],
    extensions: ["cs"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.csharp));
    }
  }),
  LanguageDescription.of({
    name: "Clojure",
    extensions: ["clj", "cljc", "cljx"],
    load() {
      return import("./clojure-CAH2HKHB.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "ClojureScript",
    extensions: ["cljs"],
    load() {
      return import("./clojure-CAH2HKHB.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Closure Stylesheets (GSS)",
    extensions: ["gss"],
    load() {
      return import("./css-Y2NUE2YQ.js").then((m) => legacy(m.gss));
    }
  }),
  LanguageDescription.of({
    name: "CMake",
    extensions: ["cmake", "cmake.in"],
    filename: /^CMakeLists\.txt$/,
    load() {
      return import("./cmake-K34OWXQX.js").then((m) => legacy(m.cmake));
    }
  }),
  LanguageDescription.of({
    name: "CoffeeScript",
    alias: ["coffee", "coffee-script"],
    extensions: ["coffee"],
    load() {
      return import("./coffeescript-CDZPB2H6.js").then((m) => legacy(m.coffeeScript));
    }
  }),
  LanguageDescription.of({
    name: "Common Lisp",
    alias: ["lisp"],
    extensions: ["cl", "lisp", "el"],
    load() {
      return import("./commonlisp-CFI44RZL.js").then((m) => legacy(m.commonLisp));
    }
  }),
  LanguageDescription.of({
    name: "Cypher",
    extensions: ["cyp", "cypher"],
    load() {
      return import("./cypher-F7TD4PGM.js").then((m) => legacy(m.cypher));
    }
  }),
  LanguageDescription.of({
    name: "Cython",
    extensions: ["pyx", "pxd", "pxi"],
    load() {
      return import("./python-H3JSJX3H.js").then((m) => legacy(m.cython));
    }
  }),
  LanguageDescription.of({
    name: "Crystal",
    extensions: ["cr"],
    load() {
      return import("./crystal-3LRZWYZQ.js").then((m) => legacy(m.crystal));
    }
  }),
  LanguageDescription.of({
    name: "D",
    extensions: ["d"],
    load() {
      return import("./d-JEAFGGZN.js").then((m) => legacy(m.d));
    }
  }),
  LanguageDescription.of({
    name: "Dart",
    extensions: ["dart"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.dart));
    }
  }),
  LanguageDescription.of({
    name: "diff",
    extensions: ["diff", "patch"],
    load() {
      return import("./diff-5OIS3HR2.js").then((m) => legacy(m.diff));
    }
  }),
  LanguageDescription.of({
    name: "Dockerfile",
    filename: /^Dockerfile$/,
    load() {
      return import("./dockerfile-ILDLGYYV.js").then((m) => legacy(m.dockerFile));
    }
  }),
  LanguageDescription.of({
    name: "DTD",
    extensions: ["dtd"],
    load() {
      return import("./dtd-RUBIS6B4.js").then((m) => legacy(m.dtd));
    }
  }),
  LanguageDescription.of({
    name: "Dylan",
    extensions: ["dylan", "dyl", "intr"],
    load() {
      return import("./dylan-UG373JHL.js").then((m) => legacy(m.dylan));
    }
  }),
  LanguageDescription.of({
    name: "EBNF",
    load() {
      return import("./ebnf-RTPF27D7.js").then((m) => legacy(m.ebnf));
    }
  }),
  LanguageDescription.of({
    name: "ECL",
    extensions: ["ecl"],
    load() {
      return import("./ecl-IHEYLLVL.js").then((m) => legacy(m.ecl));
    }
  }),
  LanguageDescription.of({
    name: "edn",
    extensions: ["edn"],
    load() {
      return import("./clojure-CAH2HKHB.js").then((m) => legacy(m.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Eiffel",
    extensions: ["e"],
    load() {
      return import("./eiffel-5YOAAZII.js").then((m) => legacy(m.eiffel));
    }
  }),
  LanguageDescription.of({
    name: "Elm",
    extensions: ["elm"],
    load() {
      return import("./elm-QNI4QTHP.js").then((m) => legacy(m.elm));
    }
  }),
  LanguageDescription.of({
    name: "Erlang",
    extensions: ["erl"],
    load() {
      return import("./erlang-WJGJCNH6.js").then((m) => legacy(m.erlang));
    }
  }),
  LanguageDescription.of({
    name: "Esper",
    load() {
      return import("./sql-EAJTXSAE.js").then((m) => legacy(m.esper));
    }
  }),
  LanguageDescription.of({
    name: "Factor",
    extensions: ["factor"],
    load() {
      return import("./factor-3AV3AWGK.js").then((m) => legacy(m.factor));
    }
  }),
  LanguageDescription.of({
    name: "FCL",
    load() {
      return import("./fcl-2CE2EIXI.js").then((m) => legacy(m.fcl));
    }
  }),
  LanguageDescription.of({
    name: "Forth",
    extensions: ["forth", "fth", "4th"],
    load() {
      return import("./forth-Q4BK3G7J.js").then((m) => legacy(m.forth));
    }
  }),
  LanguageDescription.of({
    name: "Fortran",
    extensions: ["f", "for", "f77", "f90", "f95"],
    load() {
      return import("./fortran-CMXEPX5H.js").then((m) => legacy(m.fortran));
    }
  }),
  LanguageDescription.of({
    name: "F#",
    alias: ["fsharp"],
    extensions: ["fs"],
    load() {
      return import("./mllike-DNDPA5CB.js").then((m) => legacy(m.fSharp));
    }
  }),
  LanguageDescription.of({
    name: "Gas",
    extensions: ["s"],
    load() {
      return import("./gas-44TU6Y52.js").then((m) => legacy(m.gas));
    }
  }),
  LanguageDescription.of({
    name: "Gherkin",
    extensions: ["feature"],
    load() {
      return import("./gherkin-YVTLUVWT.js").then((m) => legacy(m.gherkin));
    }
  }),
  LanguageDescription.of({
    name: "Go",
    extensions: ["go"],
    load() {
      return import("./go-OUEVX34F.js").then((m) => legacy(m.go));
    }
  }),
  LanguageDescription.of({
    name: "Groovy",
    extensions: ["groovy", "gradle"],
    filename: /^Jenkinsfile$/,
    load() {
      return import("./groovy-EPDXSOVC.js").then((m) => legacy(m.groovy));
    }
  }),
  LanguageDescription.of({
    name: "Haskell",
    extensions: ["hs"],
    load() {
      return import("./haskell-B6TKTAJY.js").then((m) => legacy(m.haskell));
    }
  }),
  LanguageDescription.of({
    name: "Haxe",
    extensions: ["hx"],
    load() {
      return import("./haxe-2GAI64J6.js").then((m) => legacy(m.haxe));
    }
  }),
  LanguageDescription.of({
    name: "HXML",
    extensions: ["hxml"],
    load() {
      return import("./haxe-2GAI64J6.js").then((m) => legacy(m.hxml));
    }
  }),
  LanguageDescription.of({
    name: "HTTP",
    load() {
      return import("./http-Y2FSPYMM.js").then((m) => legacy(m.http));
    }
  }),
  LanguageDescription.of({
    name: "IDL",
    extensions: ["pro"],
    load() {
      return import("./idl-UOLBTL5C.js").then((m) => legacy(m.idl));
    }
  }),
  LanguageDescription.of({
    name: "JSON-LD",
    alias: ["jsonld"],
    extensions: ["jsonld"],
    load() {
      return import("./javascript-PFFAIVE2.js").then((m) => legacy(m.jsonld));
    }
  }),
  LanguageDescription.of({
    name: "Jinja2",
    extensions: ["j2", "jinja", "jinja2"],
    load() {
      return import("./jinja2-7ZK2PHPN.js").then((m) => legacy(m.jinja2));
    }
  }),
  LanguageDescription.of({
    name: "Julia",
    extensions: ["jl"],
    load() {
      return import("./julia-PIAK4YB4.js").then((m) => legacy(m.julia));
    }
  }),
  LanguageDescription.of({
    name: "Kotlin",
    extensions: ["kt"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.kotlin));
    }
  }),
  LanguageDescription.of({
    name: "LiveScript",
    alias: ["ls"],
    extensions: ["ls"],
    load() {
      return import("./livescript-Y5UZTIPD.js").then((m) => legacy(m.liveScript));
    }
  }),
  LanguageDescription.of({
    name: "Lua",
    extensions: ["lua"],
    load() {
      return import("./lua-D6PBFGIX.js").then((m) => legacy(m.lua));
    }
  }),
  LanguageDescription.of({
    name: "mIRC",
    extensions: ["mrc"],
    load() {
      return import("./mirc-GCWHO7BK.js").then((m) => legacy(m.mirc));
    }
  }),
  LanguageDescription.of({
    name: "Mathematica",
    extensions: ["m", "nb", "wl", "wls"],
    load() {
      return import("./mathematica-LQIWJF2I.js").then((m) => legacy(m.mathematica));
    }
  }),
  LanguageDescription.of({
    name: "Modelica",
    extensions: ["mo"],
    load() {
      return import("./modelica-RPBQ6N62.js").then((m) => legacy(m.modelica));
    }
  }),
  LanguageDescription.of({
    name: "MUMPS",
    extensions: ["mps"],
    load() {
      return import("./mumps-VVHXXS72.js").then((m) => legacy(m.mumps));
    }
  }),
  LanguageDescription.of({
    name: "Mbox",
    extensions: ["mbox"],
    load() {
      return import("./mbox-QPE72GKM.js").then((m) => legacy(m.mbox));
    }
  }),
  LanguageDescription.of({
    name: "Nginx",
    filename: /nginx.*\.conf$/i,
    load() {
      return import("./nginx-S6SWLYQP.js").then((m) => legacy(m.nginx));
    }
  }),
  LanguageDescription.of({
    name: "NSIS",
    extensions: ["nsh", "nsi"],
    load() {
      return import("./nsis-GZU3ZG7X.js").then((m) => legacy(m.nsis));
    }
  }),
  LanguageDescription.of({
    name: "NTriples",
    extensions: ["nt", "nq"],
    load() {
      return import("./ntriples-NEVQH2EP.js").then((m) => legacy(m.ntriples));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C",
    alias: ["objective-c", "objc"],
    extensions: ["m"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.objectiveC));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C++",
    alias: ["objective-c++", "objc++"],
    extensions: ["mm"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.objectiveCpp));
    }
  }),
  LanguageDescription.of({
    name: "OCaml",
    extensions: ["ml", "mli", "mll", "mly"],
    load() {
      return import("./mllike-DNDPA5CB.js").then((m) => legacy(m.oCaml));
    }
  }),
  LanguageDescription.of({
    name: "Octave",
    extensions: ["m"],
    load() {
      return import("./octave-R6RU3LOS.js").then((m) => legacy(m.octave));
    }
  }),
  LanguageDescription.of({
    name: "Oz",
    extensions: ["oz"],
    load() {
      return import("./oz-UPG2F7ME.js").then((m) => legacy(m.oz));
    }
  }),
  LanguageDescription.of({
    name: "Pascal",
    extensions: ["p", "pas"],
    load() {
      return import("./pascal-SL3WISQD.js").then((m) => legacy(m.pascal));
    }
  }),
  LanguageDescription.of({
    name: "Perl",
    extensions: ["pl", "pm"],
    load() {
      return import("./perl-NHRQD7YF.js").then((m) => legacy(m.perl));
    }
  }),
  LanguageDescription.of({
    name: "Pig",
    extensions: ["pig"],
    load() {
      return import("./pig-6J26GQAN.js").then((m) => legacy(m.pig));
    }
  }),
  LanguageDescription.of({
    name: "PowerShell",
    extensions: ["ps1", "psd1", "psm1"],
    load() {
      return import("./powershell-2J27CV4X.js").then((m) => legacy(m.powerShell));
    }
  }),
  LanguageDescription.of({
    name: "Properties files",
    alias: ["ini", "properties"],
    extensions: ["properties", "ini", "in"],
    load() {
      return import("./properties-3RIOPX7Z.js").then((m) => legacy(m.properties));
    }
  }),
  LanguageDescription.of({
    name: "ProtoBuf",
    extensions: ["proto"],
    load() {
      return import("./protobuf-247QRXS6.js").then((m) => legacy(m.protobuf));
    }
  }),
  LanguageDescription.of({
    name: "Puppet",
    extensions: ["pp"],
    load() {
      return import("./puppet-EN6CGQYH.js").then((m) => legacy(m.puppet));
    }
  }),
  LanguageDescription.of({
    name: "Q",
    extensions: ["q"],
    load() {
      return import("./q-XPXVVGNG.js").then((m) => legacy(m.q));
    }
  }),
  LanguageDescription.of({
    name: "R",
    alias: ["rscript"],
    extensions: ["r", "R"],
    load() {
      return import("./r-PYA4VMHE.js").then((m) => legacy(m.r));
    }
  }),
  LanguageDescription.of({
    name: "RPM Changes",
    load() {
      return import("./rpm-OISFB56J.js").then((m) => legacy(m.rpmChanges));
    }
  }),
  LanguageDescription.of({
    name: "RPM Spec",
    extensions: ["spec"],
    load() {
      return import("./rpm-OISFB56J.js").then((m) => legacy(m.rpmSpec));
    }
  }),
  LanguageDescription.of({
    name: "Ruby",
    alias: ["jruby", "macruby", "rake", "rb", "rbx"],
    extensions: ["rb"],
    filename: /^(Gemfile|Rakefile)$/,
    load() {
      return import("./ruby-3EQHSZMT.js").then((m) => legacy(m.ruby));
    }
  }),
  LanguageDescription.of({
    name: "SAS",
    extensions: ["sas"],
    load() {
      return import("./sas-45MCAZLY.js").then((m) => legacy(m.sas));
    }
  }),
  LanguageDescription.of({
    name: "Scala",
    extensions: ["scala"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.scala));
    }
  }),
  LanguageDescription.of({
    name: "Scheme",
    extensions: ["scm", "ss"],
    load() {
      return import("./scheme-3JVSRJTC.js").then((m) => legacy(m.scheme));
    }
  }),
  LanguageDescription.of({
    name: "Shell",
    alias: ["bash", "sh", "zsh"],
    extensions: ["sh", "ksh", "bash"],
    filename: /^PKGBUILD$/,
    load() {
      return import("./shell-4PNWJZEL.js").then((m) => legacy(m.shell));
    }
  }),
  LanguageDescription.of({
    name: "Sieve",
    extensions: ["siv", "sieve"],
    load() {
      return import("./sieve-6NIC4M3Z.js").then((m) => legacy(m.sieve));
    }
  }),
  LanguageDescription.of({
    name: "Smalltalk",
    extensions: ["st"],
    load() {
      return import("./smalltalk-XGL6YJT5.js").then((m) => legacy(m.smalltalk));
    }
  }),
  LanguageDescription.of({
    name: "Solr",
    load() {
      return import("./solr-QE6JT33W.js").then((m) => legacy(m.solr));
    }
  }),
  LanguageDescription.of({
    name: "SML",
    extensions: ["sml", "sig", "fun", "smackspec"],
    load() {
      return import("./mllike-DNDPA5CB.js").then((m) => legacy(m.sml));
    }
  }),
  LanguageDescription.of({
    name: "SPARQL",
    alias: ["sparul"],
    extensions: ["rq", "sparql"],
    load() {
      return import("./sparql-6CE56M4D.js").then((m) => legacy(m.sparql));
    }
  }),
  LanguageDescription.of({
    name: "Spreadsheet",
    alias: ["excel", "formula"],
    load() {
      return import("./spreadsheet-3HZZOJP3.js").then((m) => legacy(m.spreadsheet));
    }
  }),
  LanguageDescription.of({
    name: "Squirrel",
    extensions: ["nut"],
    load() {
      return import("./clike-HB2SEF2M.js").then((m) => legacy(m.squirrel));
    }
  }),
  LanguageDescription.of({
    name: "Stylus",
    extensions: ["styl"],
    load() {
      return import("./stylus-VPVQC5ER.js").then((m) => legacy(m.stylus));
    }
  }),
  LanguageDescription.of({
    name: "Swift",
    extensions: ["swift"],
    load() {
      return import("./swift-X2COG42Y.js").then((m) => legacy(m.swift));
    }
  }),
  LanguageDescription.of({
    name: "sTeX",
    load() {
      return import("./stex-DOOZQQXP.js").then((m) => legacy(m.stex));
    }
  }),
  LanguageDescription.of({
    name: "LaTeX",
    alias: ["tex"],
    extensions: ["text", "ltx", "tex"],
    load() {
      return import("./stex-DOOZQQXP.js").then((m) => legacy(m.stex));
    }
  }),
  LanguageDescription.of({
    name: "SystemVerilog",
    extensions: ["v", "sv", "svh"],
    load() {
      return import("./verilog-EKBSIARC.js").then((m) => legacy(m.verilog));
    }
  }),
  LanguageDescription.of({
    name: "Tcl",
    extensions: ["tcl"],
    load() {
      return import("./tcl-34PGZQSM.js").then((m) => legacy(m.tcl));
    }
  }),
  LanguageDescription.of({
    name: "Textile",
    extensions: ["textile"],
    load() {
      return import("./textile-NAJ6JKOH.js").then((m) => legacy(m.textile));
    }
  }),
  LanguageDescription.of({
    name: "TiddlyWiki",
    load() {
      return import("./tiddlywiki-MTNARYZY.js").then((m) => legacy(m.tiddlyWiki));
    }
  }),
  LanguageDescription.of({
    name: "Tiki wiki",
    load() {
      return import("./tiki-LFDDAV6U.js").then((m) => legacy(m.tiki));
    }
  }),
  LanguageDescription.of({
    name: "TOML",
    extensions: ["toml"],
    load() {
      return import("./toml-A574H2SO.js").then((m) => legacy(m.toml));
    }
  }),
  LanguageDescription.of({
    name: "Troff",
    extensions: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    load() {
      return import("./troff-LXUWNNMY.js").then((m) => legacy(m.troff));
    }
  }),
  LanguageDescription.of({
    name: "TTCN",
    extensions: ["ttcn", "ttcn3", "ttcnpp"],
    load() {
      return import("./ttcn-UV3ZTTPF.js").then((m) => legacy(m.ttcn));
    }
  }),
  LanguageDescription.of({
    name: "TTCN_CFG",
    extensions: ["cfg"],
    load() {
      return import("./ttcn-cfg-XN5MKKPQ.js").then((m) => legacy(m.ttcnCfg));
    }
  }),
  LanguageDescription.of({
    name: "Turtle",
    extensions: ["ttl"],
    load() {
      return import("./turtle-ZSN25E76.js").then((m) => legacy(m.turtle));
    }
  }),
  LanguageDescription.of({
    name: "Web IDL",
    extensions: ["webidl"],
    load() {
      return import("./webidl-ZRXRX2CC.js").then((m) => legacy(m.webIDL));
    }
  }),
  LanguageDescription.of({
    name: "VB.NET",
    extensions: ["vb"],
    load() {
      return import("./vb-Q62KSNOX.js").then((m) => legacy(m.vb));
    }
  }),
  LanguageDescription.of({
    name: "VBScript",
    extensions: ["vbs"],
    load() {
      return import("./vbscript-MHHMTRRX.js").then((m) => legacy(m.vbScript));
    }
  }),
  LanguageDescription.of({
    name: "Velocity",
    extensions: ["vtl"],
    load() {
      return import("./velocity-B4OJT6CK.js").then((m) => legacy(m.velocity));
    }
  }),
  LanguageDescription.of({
    name: "Verilog",
    extensions: ["v"],
    load() {
      return import("./verilog-EKBSIARC.js").then((m) => legacy(m.verilog));
    }
  }),
  LanguageDescription.of({
    name: "VHDL",
    extensions: ["vhd", "vhdl"],
    load() {
      return import("./vhdl-VQZNTS4O.js").then((m) => legacy(m.vhdl));
    }
  }),
  LanguageDescription.of({
    name: "XQuery",
    extensions: ["xy", "xquery"],
    load() {
      return import("./xquery-KS2I6NIW.js").then((m) => legacy(m.xQuery));
    }
  }),
  LanguageDescription.of({
    name: "Yacas",
    extensions: ["ys"],
    load() {
      return import("./yacas-6UTMDBX5.js").then((m) => legacy(m.yacas));
    }
  }),
  LanguageDescription.of({
    name: "YAML",
    alias: ["yml"],
    extensions: ["yaml", "yml"],
    load() {
      return import("./yaml-YRYF5I6G.js").then((m) => legacy(m.yaml));
    }
  }),
  LanguageDescription.of({
    name: "Z80",
    extensions: ["z80"],
    load() {
      return import("./z80-ZQOB2HRW.js").then((m) => legacy(m.z80));
    }
  }),
  LanguageDescription.of({
    name: "MscGen",
    extensions: ["mscgen", "mscin", "msc"],
    load() {
      return import("./mscgen-OUAYDYW6.js").then((m) => legacy(m.mscgen));
    }
  }),
  LanguageDescription.of({
    name: "Xù",
    extensions: ["xu"],
    load() {
      return import("./mscgen-OUAYDYW6.js").then((m) => legacy(m.xu));
    }
  }),
  LanguageDescription.of({
    name: "MsGenny",
    extensions: ["msgenny"],
    load() {
      return import("./mscgen-OUAYDYW6.js").then((m) => legacy(m.msgenny));
    }
  }),
  LanguageDescription.of({
    name: "Vue",
    extensions: ["vue"],
    load() {
      return import("./dist-RYK4H7I5.js").then((m) => m.vue());
    }
  }),
  LanguageDescription.of({
    name: "Angular Template",
    load() {
      return import("./dist-OFEFY2YD.js").then((m) => m.angular());
    }
  })
];

// node_modules/medium-zoom/dist/medium-zoom.esm.js
var _extends = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isSupported = function isSupported2(node) {
  return node.tagName === "IMG";
};
var isNodeList = function isNodeList2(selector) {
  return NodeList.prototype.isPrototypeOf(selector);
};
var isNode = function isNode2(selector) {
  return selector && selector.nodeType === 1;
};
var isSvg = function isSvg2(image) {
  var source = image.currentSrc || image.src;
  return source.substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector2(selector) {
  try {
    if (Array.isArray(selector)) {
      return selector.filter(isSupported);
    }
    if (isNodeList(selector)) {
      return [].slice.call(selector).filter(isSupported);
    }
    if (isNode(selector)) {
      return [selector].filter(isSupported);
    }
    if (typeof selector === "string") {
      return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
    }
    return [];
  } catch (err) {
    throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
  }
};
var createOverlay = function createOverlay2(background) {
  var overlay = document.createElement("div");
  overlay.classList.add("medium-zoom-overlay");
  overlay.style.background = background;
  return overlay;
};
var cloneTarget = function cloneTarget2(template) {
  var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
  var clone = template.cloneNode();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.top = top + scrollTop + "px";
  clone.style.left = left + scrollLeft + "px";
  clone.style.width = width + "px";
  clone.style.height = height + "px";
  clone.style.transform = "";
  return clone;
};
var createCustomEvent = function createCustomEvent2(type, params) {
  var eventParams = _extends({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, params);
  if (typeof window.CustomEvent === "function") {
    return new CustomEvent(type, eventParams);
  }
  var customEvent = document.createEvent("CustomEvent");
  customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return customEvent;
};
var mediumZoom = function mediumZoom2(selector) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var Promise2 = window.Promise || function Promise3(fn) {
    function noop() {
    }
    fn(noop, noop);
  };
  var _handleClick = function _handleClick2(event) {
    var target = event.target;
    if (target === overlay) {
      close();
      return;
    }
    if (images.indexOf(target) === -1) {
      return;
    }
    toggle({ target });
  };
  var _handleScroll = function _handleScroll2() {
    if (isAnimating || !active.original) {
      return;
    }
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
      setTimeout(close, 150);
    }
  };
  var _handleKeyUp = function _handleKeyUp2(event) {
    var key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      close();
    }
  };
  var update = function update2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var newOptions = options2;
    if (options2.background) {
      overlay.style.background = options2.background;
    }
    if (options2.container && options2.container instanceof Object) {
      newOptions.container = _extends({}, zoomOptions.container, options2.container);
    }
    if (options2.template) {
      var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
      newOptions.template = template;
    }
    zoomOptions = _extends({}, zoomOptions, newOptions);
    images.forEach(function(image) {
      image.dispatchEvent(createCustomEvent("medium-zoom:update", {
        detail: { zoom }
      }));
    });
    return zoom;
  };
  var clone = function clone2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return mediumZoom2(_extends({}, zoomOptions, options2));
  };
  var attach = function attach2() {
    for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }
    var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []);
    newImages.filter(function(newImage) {
      return images.indexOf(newImage) === -1;
    }).forEach(function(newImage) {
      images.push(newImage);
      newImage.classList.add("medium-zoom-image");
    });
    eventListeners.forEach(function(_ref) {
      var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
      newImages.forEach(function(image) {
        image.addEventListener(type, listener, options2);
      });
    });
    return zoom;
  };
  var detach = function detach2() {
    for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectors[_key2] = arguments[_key2];
    }
    if (active.zoomed) {
      close();
    }
    var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []) : images;
    imagesToDetach.forEach(function(image) {
      image.classList.remove("medium-zoom-image");
      image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
        detail: { zoom }
      }));
    });
    images = images.filter(function(image) {
      return imagesToDetach.indexOf(image) === -1;
    });
    return zoom;
  };
  var on = function on2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.addEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
    return zoom;
  };
  var off = function off2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.removeEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners = eventListeners.filter(function(eventListener) {
      return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
    });
    return zoom;
  };
  var open = function open2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
    var _animate = function _animate2() {
      var container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var viewportWidth = void 0;
      var viewportHeight = void 0;
      if (zoomOptions.container) {
        if (zoomOptions.container instanceof Object) {
          container = _extends({}, container, zoomOptions.container);
          viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
          viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
        } else {
          var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);
          var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
      }
      viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
      viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
      var zoomTarget = active.zoomedHd || active.original;
      var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
      var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
      var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
      var scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
      var scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
      var scale = Math.min(scaleX, scaleY);
      var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
      var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
      var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };
    return new Promise2(function(resolve) {
      if (target && images.indexOf(target) === -1) {
        resolve(zoom);
        return;
      }
      var _handleOpenEnd = function _handleOpenEnd2() {
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
          detail: { zoom }
        }));
        resolve(zoom);
      };
      if (active.zoomed) {
        resolve(zoom);
        return;
      }
      if (target) {
        active.original = target;
      } else if (images.length > 0) {
        var _images = images;
        active.original = _images[0];
      } else {
        resolve(zoom);
        return;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
        detail: { zoom }
      }));
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);
      document.body.appendChild(overlay);
      if (zoomOptions.template) {
        var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
        active.template = document.createElement("div");
        active.template.appendChild(template.content.cloneNode(true));
        document.body.appendChild(active.template);
      }
      if (active.original.parentElement && active.original.parentElement.tagName === "PICTURE" && active.original.currentSrc) {
        active.zoomed.src = active.original.currentSrc;
      }
      document.body.appendChild(active.zoomed);
      window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      });
      active.original.classList.add("medium-zoom-image--hidden");
      active.zoomed.classList.add("medium-zoom-image--opened");
      active.zoomed.addEventListener("click", close);
      active.zoomed.addEventListener("transitionend", _handleOpenEnd);
      if (active.original.getAttribute("data-zoom-src")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("srcset");
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
        active.zoomedHd.onerror = function() {
          clearInterval(getZoomTargetSize);
          console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
          active.zoomedHd = null;
          _animate();
        };
        var getZoomTargetSize = setInterval(function() {
          if (active.zoomedHd.complete) {
            clearInterval(getZoomTargetSize);
            active.zoomedHd.classList.add("medium-zoom-image--opened");
            active.zoomedHd.addEventListener("click", close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute("srcset")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        var loadEventListener = active.zoomedHd.addEventListener("load", function() {
          active.zoomedHd.removeEventListener("load", loadEventListener);
          active.zoomedHd.classList.add("medium-zoom-image--opened");
          active.zoomedHd.addEventListener("click", close);
          document.body.appendChild(active.zoomedHd);
          _animate();
        });
      } else {
        _animate();
      }
    });
  };
  var close = function close2() {
    return new Promise2(function(resolve) {
      if (isAnimating || !active.original) {
        resolve(zoom);
        return;
      }
      var _handleCloseEnd = function _handleCloseEnd2() {
        active.original.classList.remove("medium-zoom-image--hidden");
        document.body.removeChild(active.zoomed);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        active.zoomed.classList.remove("medium-zoom-image--opened");
        if (active.template) {
          document.body.removeChild(active.template);
        }
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
          detail: { zoom }
        }));
        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;
        resolve(zoom);
      };
      isAnimating = true;
      document.body.classList.remove("medium-zoom--opened");
      active.zoomed.style.transform = "";
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = "";
      }
      if (active.template) {
        active.template.style.transition = "opacity 150ms";
        active.template.style.opacity = 0;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
        detail: { zoom }
      }));
      active.zoomed.addEventListener("transitionend", _handleCloseEnd);
    });
  };
  var toggle = function toggle2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
    if (active.original) {
      return close();
    }
    return open({ target });
  };
  var getOptions = function getOptions2() {
    return zoomOptions;
  };
  var getImages = function getImages2() {
    return images;
  };
  var getZoomedImage = function getZoomedImage2() {
    return active.original;
  };
  var images = [];
  var eventListeners = [];
  var isAnimating = false;
  var scrollTop = 0;
  var zoomOptions = options;
  var active = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
    // If the selector is omitted, it's replaced by the options
  };
  if (Object.prototype.toString.call(selector) === "[object Object]") {
    zoomOptions = selector;
  } else if (selector || typeof selector === "string") {
    attach(selector);
  }
  zoomOptions = _extends({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, zoomOptions);
  var overlay = createOverlay(zoomOptions.background);
  document.addEventListener("click", _handleClick);
  document.addEventListener("keyup", _handleKeyUp);
  document.addEventListener("scroll", _handleScroll);
  window.addEventListener("resize", close);
  var zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage
  };
  return zoom;
};
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
styleInject(css);
var medium_zoom_esm_default = mediumZoom;

// node_modules/md-editor-v3/lib/md-editor-v3.mjs
var import_copy_to_clipboard = __toESM(require_copy_to_clipboard(), 1);
var import_markdown_it = __toESM(require_markdown_it(), 1);

// node_modules/markdown-it-image-figures/dist/markdown-it-images-figures.mjs
var t = /* @__PURE__ */ new Set([true, false, "alt", "title"]);
function e(t2, e2) {
  return (Array.isArray(t2) ? t2 : []).filter(([t3]) => t3 !== e2);
}
function n(t2, n2) {
  t2 && t2.attrs && (t2.attrs = e(t2.attrs, n2));
}
function i(e2, i2) {
  if (!t.has(e2))
    throw new TypeError(`figcaption must be one of: ${[...t]}.`);
  if ("alt" === e2)
    return i2.content;
  const r2 = i2.attrs.find(([t2]) => "title" === t2);
  return Array.isArray(r2) && r2[1] ? (n(i2, "title"), r2[1]) : void 0;
}
function r(t2, r2) {
  r2 = r2 || {}, t2.core.ruler.before("linkify", "image_figures", function(s2) {
    let a = 1;
    for (let o = 1, c = s2.tokens.length; o < c - 1; ++o) {
      const l = s2.tokens[o];
      if ("inline" !== l.type)
        continue;
      if (!l.children || 1 !== l.children.length && 3 !== l.children.length)
        continue;
      if (1 === l.children.length && "image" !== l.children[0].type)
        continue;
      if (3 === l.children.length) {
        const [t3, e2, n2] = l.children;
        if ("link_open" !== t3.type || "image" !== e2.type || "link_close" !== n2.type)
          continue;
      }
      if (0 !== o && "paragraph_open" !== s2.tokens[o - 1].type)
        continue;
      if (o !== c - 1 && "paragraph_close" !== s2.tokens[o + 1].type)
        continue;
      const f = s2.tokens[o - 1];
      let h;
      if (f.type = "figure_open", f.tag = "figure", s2.tokens[o + 1].type = "figure_close", s2.tokens[o + 1].tag = "figure", r2.dataType && s2.tokens[o - 1].attrPush(["data-type", "image"]), r2.link && 1 === l.children.length) {
        [h] = l.children;
        const t3 = new s2.Token("link_open", "a", 1);
        t3.attrPush(["href", h.attrGet("src")]), l.children.unshift(t3), l.children.push(new s2.Token("link_close", "a", -1));
      }
      if (h = 1 === l.children.length ? l.children[0] : l.children[1], r2.figcaption) {
        const n2 = i(r2.figcaption, h);
        if (n2) {
          const [i2] = t2.parseInline(n2, s2.env);
          l.children.push(new s2.Token("figcaption_open", "figcaption", 1)), l.children.push(...i2.children), l.children.push(new s2.Token("figcaption_close", "figcaption", -1)), h.attrs && (h.attrs = e(h.attrs, "title"));
        }
      }
      if (r2.copyAttrs && h.attrs) {
        const t3 = true === r2.copyAttrs ? "" : r2.copyAttrs;
        f.attrs = h.attrs.filter(([e2]) => e2.match(t3)).map((t4) => Array.from(t4));
      }
      if (r2.tabindex && (s2.tokens[o - 1].attrPush(["tabindex", a]), a++), r2.lazy && (h.attrs.some(([t3]) => "loading" === t3) || h.attrs.push(["loading", "lazy"])), r2.async && (h.attrs.some(([t3]) => "decoding" === t3) || h.attrs.push(["decoding", "async"])), r2.classes && "string" == typeof r2.classes) {
        let t3 = false;
        for (let e2 = 0, n2 = h.attrs.length; e2 < n2 && !t3; e2++) {
          const n3 = h.attrs[e2];
          "class" === n3[0] && (n3[1] = `${n3[1]} ${r2.classes}`, t3 = true);
        }
        t3 || h.attrs.push(["class", r2.classes]);
      }
      if (r2.removeSrc) {
        const t3 = h.attrs.find(([t4]) => "src" === t4);
        h.attrs.push(["data-src", t3[1]]), n(h, "src");
      }
    }
  });
}

// node_modules/md-editor-v3/lib/md-editor-v3.mjs
var import_markdown_it_task_lists = __toESM(require_markdown_it_task_lists(), 1);
var import_markdown_it_codetabs = __toESM(require_markdown_it_codetabs(), 1);

// node_modules/lru-cache/dist/mjs/index.js
var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var warned = /* @__PURE__ */ new Set();
var emitWarning = (msg, type, code, fn) => {
  typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
var shouldWarn = (code) => !warned.has(code);
var TYPE = Symbol("type");
var isPosInt = (n2) => n2 && n2 === Math.floor(n2) && n2 > 0 && isFinite(n2);
var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
var ZeroArray = class extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
};
var _constructing;
var _Stack = class _Stack {
  constructor(max, HeapCls) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_Stack, _constructing)) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    __privateSet(_Stack, _constructing, true);
    const s2 = new _Stack(max, HeapCls);
    __privateSet(_Stack, _constructing, false);
    return s2;
  }
  push(n2) {
    this.heap[this.length++] = n2;
  }
  pop() {
    return this.heap[--this.length];
  }
};
_constructing = new WeakMap();
// private constructor
__privateAdd(_Stack, _constructing, false);
var Stack = _Stack;
var _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _initializeTTLTracking, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, _initializeSizeTracking, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, _indexes, indexes_fn, _rindexes, rindexes_fn, _isValidIndex, isValidIndex_fn, _evict, evict_fn, _backgroundFetch, backgroundFetch_fn, _isBackgroundFetch, isBackgroundFetch_fn, _connect, connect_fn, _moveToTail, moveToTail_fn;
var _LRUCache = class _LRUCache {
  constructor(options) {
    __privateAdd(this, _initializeTTLTracking);
    __privateAdd(this, _initializeSizeTracking);
    __privateAdd(this, _indexes);
    __privateAdd(this, _rindexes);
    __privateAdd(this, _isValidIndex);
    __privateAdd(this, _evict);
    __privateAdd(this, _backgroundFetch);
    __privateAdd(this, _isBackgroundFetch);
    __privateAdd(this, _connect);
    __privateAdd(this, _moveToTail);
    // properties coming in from the options of these, only max and maxSize
    // really *need* to be protected. The rest can be modified, as they just
    // set defaults for various methods.
    __privateAdd(this, _max, void 0);
    __privateAdd(this, _maxSize, void 0);
    __privateAdd(this, _dispose, void 0);
    __privateAdd(this, _disposeAfter, void 0);
    __privateAdd(this, _fetchMethod, void 0);
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */
    __publicField(this, "ttl");
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */
    __publicField(this, "ttlResolution");
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */
    __publicField(this, "ttlAutopurge");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */
    __publicField(this, "updateAgeOnGet");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */
    __publicField(this, "updateAgeOnHas");
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */
    __publicField(this, "allowStale");
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */
    __publicField(this, "noDisposeOnSet");
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */
    __publicField(this, "noUpdateTTL");
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */
    __publicField(this, "maxEntrySize");
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */
    __publicField(this, "sizeCalculation");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */
    __publicField(this, "noDeleteOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */
    __publicField(this, "noDeleteOnStaleGet");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */
    __publicField(this, "allowStaleOnFetchAbort");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */
    __publicField(this, "allowStaleOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */
    __publicField(this, "ignoreFetchAbort");
    // computed properties
    __privateAdd(this, _size, void 0);
    __privateAdd(this, _calculatedSize, void 0);
    __privateAdd(this, _keyMap, void 0);
    __privateAdd(this, _keyList, void 0);
    __privateAdd(this, _valList, void 0);
    __privateAdd(this, _next, void 0);
    __privateAdd(this, _prev, void 0);
    __privateAdd(this, _head, void 0);
    __privateAdd(this, _tail, void 0);
    __privateAdd(this, _free, void 0);
    __privateAdd(this, _disposed, void 0);
    __privateAdd(this, _sizes, void 0);
    __privateAdd(this, _starts, void 0);
    __privateAdd(this, _ttls, void 0);
    __privateAdd(this, _hasDispose, void 0);
    __privateAdd(this, _hasFetchMethod, void 0);
    __privateAdd(this, _hasDisposeAfter, void 0);
    // conditionally set private methods related to TTL
    __privateAdd(this, _updateItemAge, () => {
    });
    __privateAdd(this, _statusTTL, () => {
    });
    __privateAdd(this, _setItemTTL, () => {
    });
    /* c8 ignore stop */
    __privateAdd(this, _isStale, () => false);
    __privateAdd(this, _removeItemSize, (_i) => {
    });
    __privateAdd(this, _addItemSize, (_i, _s, _st) => {
    });
    __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
      if (size || sizeCalculation) {
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      }
      return 0;
    });
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    __privateSet(this, _max, max);
    __privateSet(this, _maxSize, maxSize);
    this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    __privateSet(this, _fetchMethod, fetchMethod);
    __privateSet(this, _hasFetchMethod, !!fetchMethod);
    __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
    __privateSet(this, _keyList, new Array(max).fill(void 0));
    __privateSet(this, _valList, new Array(max).fill(void 0));
    __privateSet(this, _next, new UintArray(max));
    __privateSet(this, _prev, new UintArray(max));
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateSet(this, _free, Stack.create(max));
    __privateSet(this, _size, 0);
    __privateSet(this, _calculatedSize, 0);
    if (typeof dispose === "function") {
      __privateSet(this, _dispose, dispose);
    }
    if (typeof disposeAfter === "function") {
      __privateSet(this, _disposeAfter, disposeAfter);
      __privateSet(this, _disposed, []);
    } else {
      __privateSet(this, _disposeAfter, void 0);
      __privateSet(this, _disposed, void 0);
    }
    __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
    __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (__privateGet(this, _maxSize) !== 0) {
        if (!isPosInt(__privateGet(this, _maxSize))) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      __privateMethod(this, _initializeSizeTracking, initializeSizeTracking_fn).call(this);
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c) {
    return {
      // properties
      starts: __privateGet(c, _starts),
      ttls: __privateGet(c, _ttls),
      sizes: __privateGet(c, _sizes),
      keyMap: __privateGet(c, _keyMap),
      keyList: __privateGet(c, _keyList),
      valList: __privateGet(c, _valList),
      next: __privateGet(c, _next),
      prev: __privateGet(c, _prev),
      get head() {
        return __privateGet(c, _head);
      },
      get tail() {
        return __privateGet(c, _tail);
      },
      free: __privateGet(c, _free),
      // methods
      isBackgroundFetch: (p) => {
        var _a;
        return __privateMethod(_a = c, _isBackgroundFetch, isBackgroundFetch_fn).call(_a, p);
      },
      backgroundFetch: (k2, index, options, context) => {
        var _a;
        return __privateMethod(_a = c, _backgroundFetch, backgroundFetch_fn).call(_a, k2, index, options, context);
      },
      moveToTail: (index) => {
        var _a;
        return __privateMethod(_a = c, _moveToTail, moveToTail_fn).call(_a, index);
      },
      indexes: (options) => {
        var _a;
        return __privateMethod(_a = c, _indexes, indexes_fn).call(_a, options);
      },
      rindexes: (options) => {
        var _a;
        return __privateMethod(_a = c, _rindexes, rindexes_fn).call(_a, options);
      },
      isStale: (index) => {
        var _a;
        return __privateGet(_a = c, _isStale).call(_a, index);
      }
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return __privateGet(this, _max);
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return __privateGet(this, _calculatedSize);
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return __privateGet(this, _size);
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return __privateGet(this, _fetchMethod);
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return __privateGet(this, _dispose);
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return __privateGet(this, _disposeAfter);
  }
  /**
   * Return the remaining TTL time for a given entry key
   */
  getRemainingTTL(key) {
    return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const k2 = __privateGet(this, _keyList)[i2];
      if (k2 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield k2;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const k2 = __privateGet(this, _keyList)[i2];
      if (k2 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield k2;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield __privateGet(this, _valList)[i2];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
        yield __privateGet(this, _valList)[i2];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to Array.find().  fn is called as fn(value, key, cache).
   */
  find(fn, getOptions = {}) {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, __privateGet(this, _keyList)[i2], this)) {
        return this.get(__privateGet(this, _keyList)[i2], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from
   * most recently used to least recently used.  fn is called as
   * fn(value, key, cache).  Does not update age or recenty of use.
   * Does not iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i2], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i2], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i2 of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      if (__privateGet(this, _isStale).call(this, i2)) {
        this.delete(__privateGet(this, _keyList)[i2]);
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to cache.load()
   */
  dump() {
    const arr = [];
    for (const i2 of __privateMethod(this, _indexes, indexes_fn).call(this, { allowStale: true })) {
      const key = __privateGet(this, _keyList)[i2];
      const v = __privateGet(this, _valList)[i2];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        entry.ttl = __privateGet(this, _ttls)[i2];
        const age = perf.now() - __privateGet(this, _starts)[i2];
        entry.start = Math.floor(Date.now() - age);
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i2];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   * Note that the shape of the resulting cache may be different if the
   * same options are not used in both caches.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   */
  set(k2, v, setOptions = {}) {
    var _a, _b, _c;
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = __privateGet(this, _requireSize).call(this, k2, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.delete(k2);
      return this;
    }
    let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k2);
    if (index === void 0) {
      index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _evict, evict_fn).call(this, false) : __privateGet(this, _size);
      __privateGet(this, _keyList)[index] = k2;
      __privateGet(this, _valList)[index] = v;
      __privateGet(this, _keyMap).set(k2, index);
      __privateGet(this, _next)[__privateGet(this, _tail)] = index;
      __privateGet(this, _prev)[index] = __privateGet(this, _tail);
      __privateSet(this, _tail, index);
      __privateWrapper(this, _size)._++;
      __privateGet(this, _addItemSize).call(this, index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
    } else {
      __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
      const oldVal = __privateGet(this, _valList)[index];
      if (v !== oldVal) {
        if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
        } else if (!noDisposeOnSet) {
          if (__privateGet(this, _hasDispose)) {
            (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, oldVal, k2, "set");
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([oldVal, k2, "set"]);
          }
        }
        __privateGet(this, _removeItemSize).call(this, index);
        __privateGet(this, _addItemSize).call(this, index, size, status);
        __privateGet(this, _valList)[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && !__privateGet(this, _ttls)) {
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _ttls)) {
      if (!noUpdateTTL) {
        __privateGet(this, _setItemTTL).call(this, index, ttl, start);
      }
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
    }
    if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt2 = __privateGet(this, _disposed);
      let task;
      while (task = dt2 == null ? void 0 : dt2.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    var _a;
    try {
      while (__privateGet(this, _size)) {
        const val = __privateGet(this, _valList)[__privateGet(this, _head)];
        __privateMethod(this, _evict, evict_fn).call(this, true);
        if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt2 = __privateGet(this, _disposed);
        let task;
        while (task = dt2 == null ? void 0 : dt2.shift()) {
          (_a = __privateGet(this, _disposeAfter)) == null ? void 0 : _a.call(this, ...task);
        }
      }
    }
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k2, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index !== void 0) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!__privateGet(this, _isStale).call(this, index)) {
        if (updateAgeOnHas) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status) {
          status.has = "hit";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        __privateGet(this, _statusTTL).call(this, status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k2, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index !== void 0 && (allowStale || !__privateGet(this, _isStale).call(this, index))) {
      const v = __privateGet(this, _valList)[index];
      return __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    }
  }
  async fetch(k2, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!__privateGet(this, _hasFetchMethod)) {
      if (status)
        status.fetch = "get";
      return this.get(k2, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = __privateGet(this, _keyMap).get(k2);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k2, index, options, context);
      return p.__returned = p;
    } else {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = __privateGet(this, _isStale).call(this, index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        return v;
      }
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k2, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k2, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = __privateGet(this, _keyMap).get(k2);
    if (index !== void 0) {
      const value = __privateGet(this, _valList)[index];
      const fetching = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, value);
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
      if (__privateGet(this, _isStale).call(this, index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k2);
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  /**
   * Deletes a key out of the cache.
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k2) {
    var _a, _b, _c, _d;
    let deleted = false;
    if (__privateGet(this, _size) !== 0) {
      const index = __privateGet(this, _keyMap).get(k2);
      if (index !== void 0) {
        deleted = true;
        if (__privateGet(this, _size) === 1) {
          this.clear();
        } else {
          __privateGet(this, _removeItemSize).call(this, index);
          const v = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
            if (__privateGet(this, _hasDispose)) {
              (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k2, "delete");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "delete"]);
            }
          }
          __privateGet(this, _keyMap).delete(k2);
          __privateGet(this, _keyList)[index] = void 0;
          __privateGet(this, _valList)[index] = void 0;
          if (index === __privateGet(this, _tail)) {
            __privateSet(this, _tail, __privateGet(this, _prev)[index]);
          } else if (index === __privateGet(this, _head)) {
            __privateSet(this, _head, __privateGet(this, _next)[index]);
          } else {
            __privateGet(this, _next)[__privateGet(this, _prev)[index]] = __privateGet(this, _next)[index];
            __privateGet(this, _prev)[__privateGet(this, _next)[index]] = __privateGet(this, _prev)[index];
          }
          __privateWrapper(this, _size)._--;
          __privateGet(this, _free).push(index);
        }
      }
    }
    if (__privateGet(this, _hasDisposeAfter) && ((_c = __privateGet(this, _disposed)) == null ? void 0 : _c.length)) {
      const dt2 = __privateGet(this, _disposed);
      let task;
      while (task = dt2 == null ? void 0 : dt2.shift()) {
        (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    var _a, _b, _c;
    for (const index of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k2 = __privateGet(this, _keyList)[index];
        if (__privateGet(this, _hasDispose)) {
          (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k2, "delete");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "delete"]);
        }
      }
    }
    __privateGet(this, _keyMap).clear();
    __privateGet(this, _valList).fill(void 0);
    __privateGet(this, _keyList).fill(void 0);
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      __privateGet(this, _ttls).fill(0);
      __privateGet(this, _starts).fill(0);
    }
    if (__privateGet(this, _sizes)) {
      __privateGet(this, _sizes).fill(0);
    }
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateGet(this, _free).length = 0;
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _size, 0);
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt2 = __privateGet(this, _disposed);
      let task;
      while (task = dt2 == null ? void 0 : dt2.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
  }
};
_max = new WeakMap();
_maxSize = new WeakMap();
_dispose = new WeakMap();
_disposeAfter = new WeakMap();
_fetchMethod = new WeakMap();
_size = new WeakMap();
_calculatedSize = new WeakMap();
_keyMap = new WeakMap();
_keyList = new WeakMap();
_valList = new WeakMap();
_next = new WeakMap();
_prev = new WeakMap();
_head = new WeakMap();
_tail = new WeakMap();
_free = new WeakMap();
_disposed = new WeakMap();
_sizes = new WeakMap();
_starts = new WeakMap();
_ttls = new WeakMap();
_hasDispose = new WeakMap();
_hasFetchMethod = new WeakMap();
_hasDisposeAfter = new WeakMap();
_initializeTTLTracking = new WeakSet();
initializeTTLTracking_fn = function() {
  const ttls = new ZeroArray(__privateGet(this, _max));
  const starts = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _ttls, ttls);
  __privateSet(this, _starts, starts);
  __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
    starts[index] = ttl !== 0 ? start : 0;
    ttls[index] = ttl;
    if (ttl !== 0 && this.ttlAutopurge) {
      const t2 = setTimeout(() => {
        if (__privateGet(this, _isStale).call(this, index)) {
          this.delete(__privateGet(this, _keyList)[index]);
        }
      }, ttl + 1);
      if (t2.unref) {
        t2.unref();
      }
    }
  });
  __privateSet(this, _updateItemAge, (index) => {
    starts[index] = ttls[index] !== 0 ? perf.now() : 0;
  });
  __privateSet(this, _statusTTL, (status, index) => {
    if (ttls[index]) {
      const ttl = ttls[index];
      const start = starts[index];
      status.ttl = ttl;
      status.start = start;
      status.now = cachedNow || getNow();
      status.remainingTTL = status.now + ttl - start;
    }
  });
  let cachedNow = 0;
  const getNow = () => {
    const n2 = perf.now();
    if (this.ttlResolution > 0) {
      cachedNow = n2;
      const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
      if (t2.unref) {
        t2.unref();
      }
    }
    return n2;
  };
  this.getRemainingTTL = (key) => {
    const index = __privateGet(this, _keyMap).get(key);
    if (index === void 0) {
      return 0;
    }
    return ttls[index] === 0 || starts[index] === 0 ? Infinity : starts[index] + ttls[index] - (cachedNow || getNow());
  };
  __privateSet(this, _isStale, (index) => {
    return ttls[index] !== 0 && starts[index] !== 0 && (cachedNow || getNow()) - starts[index] > ttls[index];
  });
};
_updateItemAge = new WeakMap();
_statusTTL = new WeakMap();
_setItemTTL = new WeakMap();
_isStale = new WeakMap();
_initializeSizeTracking = new WeakSet();
initializeSizeTracking_fn = function() {
  const sizes = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _sizes, sizes);
  __privateSet(this, _removeItemSize, (index) => {
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
    sizes[index] = 0;
  });
  __privateSet(this, _requireSize, (k2, v, size, sizeCalculation) => {
    if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
      return 0;
    }
    if (!isPosInt(size)) {
      if (sizeCalculation) {
        if (typeof sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation must be a function");
        }
        size = sizeCalculation(v, k2);
        if (!isPosInt(size)) {
          throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        }
      } else {
        throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
    }
    return size;
  });
  __privateSet(this, _addItemSize, (index, size, status) => {
    sizes[index] = size;
    if (__privateGet(this, _maxSize)) {
      const maxSize = __privateGet(this, _maxSize) - sizes[index];
      while (__privateGet(this, _calculatedSize) > maxSize) {
        __privateMethod(this, _evict, evict_fn).call(this, true);
      }
    }
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
    if (status) {
      status.entrySize = size;
      status.totalCalculatedSize = __privateGet(this, _calculatedSize);
    }
  });
};
_removeItemSize = new WeakMap();
_addItemSize = new WeakMap();
_requireSize = new WeakMap();
_indexes = new WeakSet();
indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i2 = __privateGet(this, _tail); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i2)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
        yield i2;
      }
      if (i2 === __privateGet(this, _head)) {
        break;
      } else {
        i2 = __privateGet(this, _prev)[i2];
      }
    }
  }
};
_rindexes = new WeakSet();
rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i2 = __privateGet(this, _head); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i2)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
        yield i2;
      }
      if (i2 === __privateGet(this, _tail)) {
        break;
      } else {
        i2 = __privateGet(this, _next)[i2];
      }
    }
  }
};
_isValidIndex = new WeakSet();
isValidIndex_fn = function(index) {
  return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
};
_evict = new WeakSet();
evict_fn = function(free) {
  var _a, _b;
  const head = __privateGet(this, _head);
  const k2 = __privateGet(this, _keyList)[head];
  const v = __privateGet(this, _valList)[head];
  if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    v.__abortController.abort(new Error("evicted"));
  } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
    if (__privateGet(this, _hasDispose)) {
      (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k2, "evict");
    }
    if (__privateGet(this, _hasDisposeAfter)) {
      (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k2, "evict"]);
    }
  }
  __privateGet(this, _removeItemSize).call(this, head);
  if (free) {
    __privateGet(this, _keyList)[head] = void 0;
    __privateGet(this, _valList)[head] = void 0;
    __privateGet(this, _free).push(head);
  }
  if (__privateGet(this, _size) === 1) {
    __privateSet(this, _head, __privateSet(this, _tail, 0));
    __privateGet(this, _free).length = 0;
  } else {
    __privateSet(this, _head, __privateGet(this, _next)[head]);
  }
  __privateGet(this, _keyMap).delete(k2);
  __privateWrapper(this, _size)._--;
  return head;
};
_backgroundFetch = new WeakSet();
backgroundFetch_fn = function(k2, index, options, context) {
  const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
  if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    return v;
  }
  const ac = new AbortController();
  const { signal } = options;
  signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
    signal: ac.signal
  });
  const fetchOpts = {
    signal: ac.signal,
    options,
    context
  };
  const cb = (v2, updateCache = false) => {
    const { aborted } = ac.signal;
    const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
    if (options.status) {
      if (aborted && !updateCache) {
        options.status.fetchAborted = true;
        options.status.fetchError = ac.signal.reason;
        if (ignoreAbort)
          options.status.fetchAbortIgnored = true;
      } else {
        options.status.fetchResolved = true;
      }
    }
    if (aborted && !ignoreAbort && !updateCache) {
      return fetchFail(ac.signal.reason);
    }
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      if (v2 === void 0) {
        if (bf2.__staleWhileFetching) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        } else {
          this.delete(k2);
        }
      } else {
        if (options.status)
          options.status.fetchUpdated = true;
        this.set(k2, v2, fetchOpts.options);
      }
    }
    return v2;
  };
  const eb = (er) => {
    if (options.status) {
      options.status.fetchRejected = true;
      options.status.fetchError = er;
    }
    return fetchFail(er);
  };
  const fetchFail = (er) => {
    const { aborted } = ac.signal;
    const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
    const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
    const noDelete = allowStale || options.noDeleteOnFetchRejection;
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      const del = !noDelete || bf2.__staleWhileFetching === void 0;
      if (del) {
        this.delete(k2);
      } else if (!allowStaleAborted) {
        __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
      }
    }
    if (allowStale) {
      if (options.status && bf2.__staleWhileFetching !== void 0) {
        options.status.returnedStale = true;
      }
      return bf2.__staleWhileFetching;
    } else if (bf2.__returned === bf2) {
      throw er;
    }
  };
  const pcall = (res, rej) => {
    var _a;
    const fmp = (_a = __privateGet(this, _fetchMethod)) == null ? void 0 : _a.call(this, k2, v, fetchOpts);
    if (fmp && fmp instanceof Promise) {
      fmp.then((v2) => res(v2), rej);
    }
    ac.signal.addEventListener("abort", () => {
      if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
        res();
        if (options.allowStaleOnFetchAbort) {
          res = (v2) => cb(v2, true);
        }
      }
    });
  };
  if (options.status)
    options.status.fetchDispatched = true;
  const p = new Promise(pcall).then(cb, eb);
  const bf = Object.assign(p, {
    __abortController: ac,
    __staleWhileFetching: v,
    __returned: void 0
  });
  if (index === void 0) {
    this.set(k2, bf, { ...fetchOpts.options, status: void 0 });
    index = __privateGet(this, _keyMap).get(k2);
  } else {
    __privateGet(this, _valList)[index] = bf;
  }
  return bf;
};
_isBackgroundFetch = new WeakSet();
isBackgroundFetch_fn = function(p) {
  if (!__privateGet(this, _hasFetchMethod))
    return false;
  const b = p;
  return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AbortController;
};
_connect = new WeakSet();
connect_fn = function(p, n2) {
  __privateGet(this, _prev)[n2] = p;
  __privateGet(this, _next)[p] = n2;
};
_moveToTail = new WeakSet();
moveToTail_fn = function(index) {
  if (index !== __privateGet(this, _tail)) {
    if (index === __privateGet(this, _head)) {
      __privateSet(this, _head, __privateGet(this, _next)[index]);
    } else {
      __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
    }
    __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _tail), index);
    __privateSet(this, _tail, index);
  }
};
var LRUCache = _LRUCache;
var mjs_default = LRUCache;

// node_modules/md-editor-v3/lib/md-editor-v3.mjs
var wt = Object.defineProperty;
var Tt = (e2, l, o) => l in e2 ? wt(e2, l, { enumerable: true, configurable: true, writable: true, value: o }) : e2[l] = o;
var K = (e2, l, o) => (Tt(e2, typeof l != "symbol" ? l + "" : l, o), o);
var s = "md-editor";
var Wt = "md-editor-v3";
var Kt = "https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js";
var L = "https://cdnjs.cloudflare.com/ajax/libs";
var zt = `${L}/highlight.js/11.7.0/highlight.min.js`;
var We = {
  main: `${L}/prettier/2.8.0/standalone.js`,
  markdown: `${L}/prettier/2.8.0/parser-markdown.js`
};
var Ke = {
  css: `${L}/cropperjs/1.5.13/cropper.min.css`,
  js: `${L}/cropperjs/1.5.13/cropper.min.js`
};
var Xt = `${L}/screenfull.js/5.2.0/screenfull.min.js`;
var bt = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "prettier",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "htmlPreview",
  "catalog",
  "github"
];
var kt = ["markdownTotal", "=", "scrollSwitch"];
var ze = {
  "zh-CN": {
    toolbarTips: {
      bold: "加粗",
      underline: "下划线",
      italic: "斜体",
      strikeThrough: "删除线",
      title: "标题",
      sub: "下标",
      sup: "上标",
      quote: "引用",
      unorderedList: "无序列表",
      orderedList: "有序列表",
      task: "任务列表",
      codeRow: "行内代码",
      code: "块级代码",
      link: "链接",
      image: "图片",
      table: "表格",
      mermaid: "mermaid图",
      katex: "katex公式",
      revoke: "后退",
      next: "前进",
      save: "保存",
      prettier: "美化",
      pageFullscreen: "浏览器全屏",
      fullscreen: "屏幕全屏",
      preview: "预览",
      htmlPreview: "html代码预览",
      catalog: "目录",
      github: "源码地址"
    },
    titleItem: {
      h1: "一级标题",
      h2: "二级标题",
      h3: "三级标题",
      h4: "四级标题",
      h5: "五级标题",
      h6: "六级标题"
    },
    imgTitleItem: {
      link: "添加链接",
      upload: "上传图片",
      clip2upload: "裁剪上传"
    },
    linkModalTips: {
      linkTitle: "添加链接",
      imageTitle: "添加图片",
      descLabel: "链接描述：",
      descLabelPlaceHolder: "请输入描述...",
      urlLabel: "链接地址：",
      urlLabelPlaceHolder: "请输入链接...",
      buttonOK: "确定"
    },
    clipModalTips: {
      title: "裁剪图片上传",
      buttonUpload: "上传"
    },
    copyCode: {
      text: "复制代码",
      successTips: "已复制！",
      failTips: "复制失败！"
    },
    mermaid: {
      flow: "流程图",
      sequence: "时序图",
      gantt: "甘特图",
      class: "类图",
      state: "状态图",
      pie: "饼图",
      relationship: "关系图",
      journey: "旅程图"
    },
    katex: {
      inline: "行内公式",
      block: "块级公式"
    },
    footer: {
      markdownTotal: "字数",
      scrollAuto: "同步滚动"
    }
  },
  "en-US": {
    toolbarTips: {
      bold: "bold",
      underline: "underline",
      italic: "italic",
      strikeThrough: "strikeThrough",
      title: "title",
      sub: "subscript",
      sup: "superscript",
      quote: "quote",
      unorderedList: "unordered list",
      orderedList: "ordered list",
      task: "task list",
      codeRow: "inline code",
      code: "block-level code",
      link: "link",
      image: "image",
      table: "table",
      mermaid: "mermaid",
      katex: "formula",
      revoke: "revoke",
      next: "undo revoke",
      save: "save",
      prettier: "prettier",
      pageFullscreen: "fullscreen in page",
      fullscreen: "fullscreen",
      preview: "preview",
      htmlPreview: "html preview",
      catalog: "catalog",
      github: "source code"
    },
    titleItem: {
      h1: "Lv1 Heading",
      h2: "Lv2 Heading",
      h3: "Lv3 Heading",
      h4: "Lv4 Heading",
      h5: "Lv5 Heading",
      h6: "Lv6 Heading"
    },
    imgTitleItem: {
      link: "Add Img Link",
      upload: "Upload Img",
      clip2upload: "Clip Upload"
    },
    linkModalTips: {
      linkTitle: "Add Link",
      imageTitle: "Add Image",
      descLabel: "Desc:",
      descLabelPlaceHolder: "Enter a description...",
      urlLabel: "Link:",
      urlLabelPlaceHolder: "Enter a link...",
      buttonOK: "OK"
    },
    clipModalTips: {
      title: "Crop Image",
      buttonUpload: "Upload"
    },
    copyCode: {
      text: "Copy",
      successTips: "Copied!",
      failTips: "Copy failed!"
    },
    mermaid: {
      flow: "flow",
      sequence: "sequence",
      gantt: "gantt",
      class: "class",
      state: "state",
      pie: "pie",
      relationship: "relationship",
      journey: "journey"
    },
    katex: {
      inline: "inline",
      block: "block"
    },
    footer: {
      markdownTotal: "Word Count",
      scrollAuto: "Scroll Auto"
    }
  }
};
var Zt = `${L}/mermaid/9.4.0/mermaid.min.js`;
var Xe = {
  js: `${L}/KaTeX/0.16.3/katex.min.js`,
  css: `${L}/KaTeX/0.16.3/katex.min.css`
};
var Ze = {
  a11y: {
    light: `${L}/highlight.js/11.7.0/styles/a11y-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${L}/highlight.js/11.7.0/styles/atom-one-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${L}/highlight.js/11.7.0/styles/github.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${L}/highlight.js/11.7.0/styles/gradient-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${L}/highlight.js/11.7.0/styles/kimbie-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${L}/highlight.js/11.7.0/styles/paraiso-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${L}/highlight.js/11.7.0/styles/qtcreator-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${L}/highlight.js/11.7.0/styles/stackoverflow-light.min.css`,
    dark: `${L}/highlight.js/11.7.0/styles/stackoverflow-dark.min.css`
  }
};
var A = {
  // markedRenderer: (r) => r,
  // markedExtensions: [],
  // markedOptions: {},
  editorExtensions: {},
  editorConfig: {},
  codeMirrorExtensions: (e2, l) => l,
  markdownItConfig: () => {
  }
};
var Jt = (e2) => {
  if (e2)
    for (const l in e2) {
      const o = e2[l];
      o && (A[l] = o);
    }
};
var Yt = defineComponent({
  setup() {
    return () => createVNode("div", {
      class: `${s}-divider`
    }, null);
  }
});
var G = ({
  instance: e2,
  ctx: l,
  props: o = {}
}, t2 = "default") => {
  const r2 = (e2 == null ? void 0 : e2.$slots[t2]) || (l == null ? void 0 : l.slots[t2]);
  return (r2 ? r2(e2) : "") || o[t2];
};
var Qt = {
  trigger: {
    type: String,
    default: "hover"
  },
  overlay: {
    type: [String, Object],
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  // 相对滚动的元素选择器
  relative: {
    type: String,
    default: "html"
  }
};
var oe = defineComponent({
  props: Qt,
  setup(e2, l) {
    const o = `${s}-dropdown-hidden`, t2 = reactive({
      overlayClass: [o],
      overlayStyle: {},
      triggerHover: false,
      overlayHover: false
    }), r2 = ref(), n2 = ref(), a = () => {
      var T;
      e2.trigger === "hover" && (t2.triggerHover = true);
      const f = r2.value, h = n2.value, p = f.getBoundingClientRect(), v = f.offsetTop, b = f.offsetLeft, y = p.height, C = p.width, $ = ((T = document.querySelector(e2.relative)) == null ? void 0 : T.scrollLeft) || 0;
      t2.overlayStyle = {
        ...t2.overlayStyle,
        top: v + y + "px",
        left: b - h.offsetWidth / 2 + C / 2 - $ + "px"
      }, e2.onChange(true);
    }, d = () => {
      t2.overlayHover = true;
    };
    watch(() => e2.visible, (f) => {
      f ? t2.overlayClass = t2.overlayClass.filter((h) => h !== o) : t2.overlayClass.push(o);
    });
    const m = (f) => {
      const h = r2.value, p = n2.value;
      !h.contains(f.target) && !p.contains(f.target) && e2.onChange(false);
    };
    let u = -1;
    const c = (f) => {
      r2.value === f.target ? t2.triggerHover = false : t2.overlayHover = false, clearTimeout(u), u = window.setTimeout(() => {
        !t2.overlayHover && !t2.triggerHover && e2.onChange(false);
      }, 10);
    };
    return onMounted(() => {
      e2.trigger === "click" ? (r2.value.addEventListener("click", a), document.addEventListener("click", m)) : (r2.value.addEventListener("mouseenter", a), r2.value.addEventListener("mouseleave", c), n2.value.addEventListener("mouseenter", d), n2.value.addEventListener("mouseleave", c));
    }), onBeforeUnmount(() => {
      e2.trigger === "click" ? (r2.value.removeEventListener("click", a), document.removeEventListener("click", m)) : (r2.value.removeEventListener("mouseenter", a), r2.value.removeEventListener("mouseleave", c), n2.value.removeEventListener("mouseenter", d), n2.value.removeEventListener("mouseleave", c));
    }), () => {
      const f = G({
        ctx: l
      }), h = G({
        props: e2,
        ctx: l
      }, "overlay"), p = cloneVNode(f instanceof Array ? f[0] : f, {
        ref: r2
      }), v = createVNode("div", {
        class: [`${s}-dropdown`, t2.overlayClass],
        style: t2.overlayStyle,
        ref: n2
      }, [createVNode("div", {
        class: `${s}-dropdown-overlay`
      }, [h instanceof Array ? h[0] : h])]);
      return [p, v];
    };
  }
});
var el = class {
  constructor() {
    K(this, "pools", {});
  }
  // 移除事件监听
  remove(l, o, t2) {
    const n2 = this.pools[l] && this.pools[l][o];
    n2 && (this.pools[l][o] = n2.filter((a) => a !== t2));
  }
  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(l) {
    this.pools[l] = {};
  }
  // 注册事件监听
  on(l, o) {
    return this.pools[l] || (this.pools[l] = {}), this.pools[l][o.name] || (this.pools[l][o.name] = []), this.pools[l][o.name].push(o.callback), this.pools[l][o.name].includes(o.callback);
  }
  // 触发事件
  emit(l, o, ...t2) {
    this.pools[l] || (this.pools[l] = {});
    const n2 = this.pools[l][o];
    n2 && n2.forEach((a) => {
      try {
        a(...t2);
      } catch (d) {
        console.error(`${o} monitor event exception！`, d);
      }
    });
  }
};
var k = new el();
var tl = (e2, l = {
  newWindow: true,
  nofollow: true
}) => {
  e2 || console.error("error link!");
  const o = document.createElement("a");
  o.href = e2, o.style.display = "none", l.newWindow && (o.target = "_blank"), l.nofollow && (o.rel = "noopener noreferrer"), document.body.appendChild(o), o.click(), document.body.removeChild(o);
};
var ll = (e2, l = "image.png") => {
  const o = e2.split(","), t2 = o[0].match(/:(.*?);/);
  if (t2) {
    const r2 = t2[1], n2 = atob(o[1]);
    let a = n2.length;
    const d = new Uint8Array(a);
    for (; a--; )
      d[a] = n2.charCodeAt(a);
    return new File([d], l, { type: r2 });
  }
  return null;
};
var ol = (e2) => {
  if (!e2)
    return e2;
  const l = e2.split(`
`), o = ['<span rn-wrapper aria-hidden="true">'];
  return l.forEach(() => {
    o.push("<span></span>");
  }), o.push("</span>"), `<span class="code-block">${e2}</span>${o.join("")}`;
};
var ve = (e2, l = 200) => {
  let o = 0;
  return (...t2) => new Promise((r2) => {
    o && (clearTimeout(o), r2("cancel")), o = window.setTimeout(() => {
      e2.apply(void 0, t2), o = 0, r2("done");
    }, l);
  });
};
var nl = (e2, l = 200) => {
  let o = 0, t2 = null;
  return (...r2) => {
    const n2 = (a) => {
      o === 0 && (o = a), a - o >= l ? (e2.apply(void 0, t2), t2 = null, o = 0) : window.requestAnimationFrame(n2);
    };
    t2 === null && window.requestAnimationFrame(n2), t2 = r2;
  };
};
var rl = (e2, l) => {
  const o = e2 == null ? void 0 : e2.getBoundingClientRect();
  if (l === document.documentElement)
    return o.top - l.clientTop;
  const t2 = l == null ? void 0 : l.getBoundingClientRect();
  return o.top - t2.top;
};
var il = () => `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
var al = {
  noPrettier: {
    type: Boolean
  },
  // 工具栏选择显示
  toolbars: {
    type: Array,
    default: () => []
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array,
    default: () => []
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String,
    default: ""
  },
  updateSetting: {
    type: Function,
    default: () => {
    }
  },
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  defToolbars: {
    type: Object
  },
  noUploadImg: {
    type: Boolean
  }
};
var pe = "onSave";
var Le = "changeCatalogVisible";
var yt = "changeFullscreen";
var Je = "pageFullscreenChanged";
var Ye = "fullscreenChanged";
var Ce = "previewChanged";
var Qe = "htmlPreviewChanged";
var et = "catalogVisibleChanged";
var Ct = "textareaFocus";
var tt = (e2, l) => {
  const o = (t2) => {
    const r2 = e2.parentElement || document.body, n2 = r2.offsetWidth, a = r2.offsetHeight, { clientWidth: d } = document.documentElement, { clientHeight: m } = document.documentElement, u = t2.offsetX, c = t2.offsetY, f = (p) => {
      let v = p.x + document.body.scrollLeft - document.body.clientLeft - u, b = p.y + document.body.scrollTop - document.body.clientTop - c;
      v = v < 1 ? 1 : v < d - n2 - 1 ? v : d - n2 - 1, b = b < 1 ? 1 : b < m - a - 1 ? b : m - a - 1, l ? l(v, b) : (r2.style.left = `${v}px`, r2.style.top = `${b}px`);
    };
    document.addEventListener("mousemove", f);
    const h = () => {
      document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", h);
    };
    document.addEventListener("mouseup", h);
  };
  return e2.addEventListener("mousedown", o), () => {
    e2.removeEventListener("mousedown", o);
  };
};
var V = (e2, l = "") => {
  const o = document.getElementById(e2.id), t2 = e2.onload;
  e2.onload = null;
  const r2 = function(n2) {
    typeof t2 == "function" && t2.bind(this)(n2), e2.removeEventListener("load", r2);
  };
  o ? l !== "" && (o.addEventListener("load", r2), Reflect.get(window, l) && o.dispatchEvent(new Event("load"))) : (e2.addEventListener("load", r2), document.head.appendChild(e2));
};
var sl = ve((e2, l, o) => {
  const t2 = document.getElementById(e2);
  t2 && t2.setAttribute(l, o);
}, 10);
var cl = (e2) => {
  var m, u, c, f;
  const l = inject("editorId");
  let o = (u = (m = A.editorExtensions) == null ? void 0 : m.screenfull) == null ? void 0 : u.instance;
  const t2 = (f = (c = A.editorExtensions) == null ? void 0 : c.screenfull) == null ? void 0 : f.js, r2 = ref(false), n2 = (h) => {
    if (!o) {
      k.emit(l, "errorCatcher", {
        name: "fullscreen",
        message: "fullscreen is undefined"
      });
      return;
    }
    o.isEnabled ? (r2.value = true, (h === void 0 ? !o.isFullscreen : h) ? o.request() : o.exit()) : console.error("browser does not support screenfull!");
  }, a = () => {
    o && o.isEnabled && o.on("change", () => {
      (r2.value || e2.setting.fullscreen) && (r2.value = false, e2.updateSetting("fullscreen"));
    });
  }, d = () => {
    o = window.screenfull, a();
  };
  return onMounted(() => {
    if (a(), !o) {
      const h = document.createElement("script");
      h.src = t2 || Xt, h.onload = d, h.id = `${s}-screenfull`, V(h, "screenfull");
    }
  }), onMounted(() => {
    k.on(l, {
      name: yt,
      callback: n2
    });
  }), { fullscreenHandler: n2 };
};
var dl = {
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  onSelected: {
    type: Function,
    default: () => {
    }
  }
};
var ul = defineComponent({
  name: "TableShape",
  props: dl,
  setup(e2) {
    const l = reactive({
      x: -1,
      y: -1
    });
    return () => createVNode("div", {
      class: `${s}-table-shape`,
      onMouseleave: () => {
        l.x = -1, l.y = -1;
      }
    }, [new Array(e2.tableShape[1]).fill("").map((o, t2) => createVNode("div", {
      class: `${s}-table-shape-row`,
      key: `table-shape-row-${t2}`
    }, [new Array(e2.tableShape[0]).fill("").map((r2, n2) => createVNode("div", {
      class: `${s}-table-shape-col`,
      key: `table-shape-col-${n2}`,
      onMouseenter: () => {
        l.x = t2, l.y = n2;
      },
      onClick: () => {
        e2.onSelected(l);
      }
    }, [createVNode("div", {
      class: [`${s}-table-shape-col-default`, t2 <= l.x && n2 <= l.y && `${s}-table-shape-col-include`]
    }, null)]))]))]);
  }
});
var ml = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  onClose: {
    type: Function,
    default: () => {
    }
  },
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function,
    default: () => {
    }
  },
  class: {
    type: String
  }
};
var Ae = defineComponent({
  props: ml,
  setup(e2, l) {
    const o = ref(e2.visible), t2 = ref([`${s}-modal`]), r2 = ref(), n2 = ref();
    let a = () => {
    };
    const d = reactive({
      initPos: {
        left: "0px",
        top: "0px"
      },
      historyPos: {
        left: "0px",
        top: "0px"
      }
    }), m = computed(() => e2.isFullscreen ? {
      width: "100%",
      height: "100%"
    } : {
      width: e2.width,
      height: e2.height
    });
    return onMounted(() => {
      a = tt(n2.value, (u, c) => {
        d.initPos.left = u + "px", d.initPos.top = c + "px";
      });
    }), onBeforeUnmount(() => {
      a();
    }), watch(() => e2.isFullscreen, (u) => {
      u ? a() : a = tt(n2.value, (c, f) => {
        d.initPos.left = c + "px", d.initPos.top = f + "px";
      });
    }), watch(() => e2.visible, (u) => {
      u ? (t2.value.push("zoom-in"), o.value = u, nextTick(() => {
        const c = r2.value.offsetWidth / 2, f = r2.value.offsetHeight / 2, h = document.documentElement.clientWidth / 2, p = document.documentElement.clientHeight / 2;
        d.initPos.left = h - c + "px", d.initPos.top = p - f + "px";
      }), setTimeout(() => {
        t2.value = t2.value.filter((c) => c !== "zoom-in");
      }, 140)) : (t2.value.push("zoom-out"), setTimeout(() => {
        t2.value = t2.value.filter((c) => c !== "zoom-out"), o.value = u;
      }, 130));
    }), () => {
      const u = G({
        ctx: l
      }), c = G({
        props: e2,
        ctx: l
      }, "title");
      return createVNode("div", {
        class: [e2.class],
        style: {
          display: o.value ? "block" : "none"
        }
      }, [createVNode("div", {
        class: `${s}-modal-mask`,
        onClick: e2.onClose
      }, null), createVNode("div", {
        class: t2.value,
        style: {
          ...d.initPos,
          ...m.value
        },
        ref: r2
      }, [createVNode("div", {
        class: `${s}-modal-header`,
        ref: n2
      }, [c || ""]), createVNode("div", {
        class: `${s}-modal-body`
      }, [u]), createVNode("div", {
        class: `${s}-modal-func`
      }, [e2.showAdjust && createVNode("div", {
        class: `${s}-modal-adjust`,
        onClick: (f) => {
          f.stopPropagation(), e2.isFullscreen ? d.initPos = d.historyPos : (d.historyPos = d.initPos, d.initPos = {
            left: "0",
            top: "0"
          }), e2.onAdjust(!e2.isFullscreen);
        }
      }, [createVNode("svg", {
        class: `${s}-icon`,
        "aria-hidden": "true"
      }, [createVNode("use", {
        "xlink:href": `#md-editor-icon-${e2.isFullscreen ? "suoxiao" : "fangda"}`
      }, null)])]), createVNode("div", {
        class: `${s}-modal-close`,
        onClick: (f) => {
          f.stopPropagation(), e2.onClose && e2.onClose();
        }
      }, [createVNode("svg", {
        class: `${s}-icon`,
        "aria-hidden": "true"
      }, [createVNode("use", {
        "xlink:href": "#md-editor-icon-close"
      }, null)])])])])]);
    };
  }
});
var fl = {
  type: {
    type: String,
    default: "link"
  },
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var gl = defineComponent({
  props: fl,
  setup(e2) {
    const l = inject("usedLanguageText"), o = inject("editorId"), t2 = computed(() => {
      var n2, a;
      switch (e2.type) {
        case "link":
          return (n2 = l.value.linkModalTips) == null ? void 0 : n2.linkTitle;
        case "image":
          return (a = l.value.linkModalTips) == null ? void 0 : a.imageTitle;
        default:
          return "";
      }
    }), r2 = reactive({
      desc: "",
      url: ""
    });
    return watch(() => e2.visible, (n2) => {
      n2 || setTimeout(() => {
        r2.desc = "", r2.url = "";
      }, 200);
    }), () => createVNode(Ae, {
      title: t2.value,
      visible: e2.visible,
      onClose: e2.onCancel
    }, {
      default: () => {
        var n2, a, d, m, u;
        return [createVNode("div", {
          class: `${s}-form-item`
        }, [createVNode("label", {
          class: `${s}-label`,
          for: `link-desc-${o}`
        }, [(n2 = l.value.linkModalTips) == null ? void 0 : n2.descLabel]), createVNode("input", {
          placeholder: (a = l.value.linkModalTips) == null ? void 0 : a.descLabelPlaceHolder,
          class: `${s}-input`,
          id: `link-desc-${o}`,
          type: "text",
          value: r2.desc,
          onChange: (c) => {
            r2.desc = c.target.value;
          },
          autocomplete: "off"
        }, null)]), createVNode("div", {
          class: `${s}-form-item`
        }, [createVNode("label", {
          class: `${s}-label`,
          for: `link-url-${o}`
        }, [(d = l.value.linkModalTips) == null ? void 0 : d.urlLabel]), createVNode("input", {
          placeholder: (m = l.value.linkModalTips) == null ? void 0 : m.urlLabelPlaceHolder,
          class: `${s}-input`,
          id: `link-url-${o}`,
          type: "text",
          value: r2.url,
          onChange: (c) => {
            r2.url = c.target.value;
          },
          autocomplete: "off"
        }, null)]), createVNode("div", {
          class: `${s}-form-item`
        }, [createVNode("button", {
          class: [`${s}-btn`, `${s}-btn-row`],
          type: "button",
          onClick: () => {
            e2.onOk(r2), r2.desc = "", r2.url = "";
          }
        }, [(u = l.value.linkModalTips) == null ? void 0 : u.buttonOK])])];
      }
    });
  }
});
var hl = {
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var vl = defineComponent({
  props: hl,
  setup(e2) {
    var c, f;
    const l = inject("usedLanguageText"), o = inject("editorId");
    let t2 = (f = (c = A == null ? void 0 : A.editorExtensions) == null ? void 0 : c.cropper) == null ? void 0 : f.instance;
    const r2 = ref(), n2 = ref(), a = ref(), d = reactive({
      cropperInited: false,
      imgSelected: false,
      imgSrc: "",
      // 是否全屏
      isFullscreen: false
    });
    let m = null;
    watch(() => e2.visible, () => {
      e2.visible && !d.cropperInited && (t2 = t2 || window.Cropper, r2.value.onchange = () => {
        if (!t2) {
          k.emit(o, "errorCatcher", {
            name: "Cropper",
            message: "Cropper is undefined"
          });
          return;
        }
        const h = r2.value.files || [];
        if (d.imgSelected = true, (h == null ? void 0 : h.length) > 0) {
          const p = new FileReader();
          p.onload = (v) => {
            d.imgSrc = v.target.result, nextTick(() => {
              m = new t2(n2.value, {
                viewMode: 2,
                preview: `.${s}-clip-preview-target`
                // aspectRatio: 16 / 9,
              });
            });
          }, p.readAsDataURL(h[0]);
        }
      });
    }), watch(() => [d.imgSelected], () => {
      a.value.style = "";
    }), watch(() => d.isFullscreen, () => {
      nextTick(() => {
        m == null || m.destroy(), a.value.style = "", n2.value && (m = new t2(n2.value, {
          viewMode: 2,
          preview: `.${s}-clip-preview-target`
          // aspectRatio: 16 / 9,
        }));
      });
    });
    const u = () => {
      m.clear(), m.destroy(), m = null, r2.value.value = "", d.imgSelected = false;
    };
    return () => {
      var h;
      return createVNode(Ae, {
        class: `${s}-modal-clip`,
        title: (h = l.value.clipModalTips) == null ? void 0 : h.title,
        visible: e2.visible,
        onClose: e2.onCancel,
        showAdjust: true,
        isFullscreen: d.isFullscreen,
        onAdjust: (p) => {
          d.isFullscreen = p;
        },
        width: "668px",
        height: "421px"
      }, {
        default: () => {
          var p, v;
          return [createVNode("div", {
            class: `${s}-form-item ${s}-clip`
          }, [createVNode("div", {
            class: `${s}-clip-main`
          }, [d.imgSelected ? createVNode("div", {
            class: `${s}-clip-cropper`
          }, [createVNode("img", {
            src: d.imgSrc,
            ref: n2,
            style: {
              display: "none"
            },
            alt: ""
          }, null), createVNode("div", {
            class: `${s}-clip-delete`,
            onClick: u
          }, [createVNode("svg", {
            class: `${s}-icon`,
            "aria-hidden": "true"
          }, [createVNode("use", {
            "xlink:href": "#md-editor-icon-delete"
          }, null)])])]) : createVNode("div", {
            class: `${s}-clip-upload`,
            onClick: () => {
              r2.value.click();
            }
          }, [createVNode("svg", {
            class: `${s}-icon`,
            "aria-hidden": "true"
          }, [createVNode("use", {
            "xlink:href": "#md-editor-icon-upload"
          }, null)])])]), createVNode("div", {
            class: `${s}-clip-preview`
          }, [createVNode("div", {
            class: `${s}-clip-preview-target`,
            ref: a
          }, null)])]), createVNode("div", {
            class: `${s}-form-item`
          }, [createVNode("button", {
            class: `${s}-btn`,
            type: "button",
            onClick: () => {
              if (m) {
                const b = m.getCroppedCanvas();
                k.emit(o, "uploadImage", [ll(b.toDataURL("image/png"))], e2.onOk), u();
              }
            }
          }, [((p = l.value.clipModalTips) == null ? void 0 : p.buttonUpload) || ((v = l.value.linkModalTips) == null ? void 0 : v.buttonOK)])]), createVNode("input", {
            ref: r2,
            accept: "image/*",
            type: "file",
            multiple: false,
            style: {
              display: "none"
            }
          }, null)];
        }
      });
    };
  }
});
var pl = {
  type: {
    type: String,
    default: "link"
  },
  linkVisible: {
    type: Boolean,
    default: false
  },
  clipVisible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var bl = defineComponent({
  props: pl,
  setup(e2) {
    return () => createVNode(Fragment, null, [createVNode(gl, {
      type: e2.type,
      visible: e2.linkVisible,
      onOk: e2.onOk,
      onCancel: e2.onCancel
    }, null), createVNode(vl, {
      visible: e2.clipVisible,
      onOk: e2.onOk,
      onCancel: e2.onCancel
    }, null)]);
  }
});
var kl = defineComponent({
  name: "MDEditorToolbar",
  props: al,
  setup(e2) {
    const l = inject("editorId"), o = inject("usedLanguageText"), {
      fullscreenHandler: t2
    } = cl(e2), r2 = `${l}-toolbar-wrapper`, n2 = reactive({
      title: false,
      catalog: false,
      // 图片上传下拉
      image: false,
      // 表格预选
      table: false,
      // mermaid
      mermaid: false,
      katex: false
    }), a = (p, v) => {
      k.emit(l, "replace", p, v);
    }, d = reactive({
      type: "link",
      linkVisible: false,
      clipVisible: false
    }), m = ref();
    onMounted(() => {
      k.on(l, {
        name: "openModals",
        callback(p) {
          d.type = p, d.linkVisible = true;
        }
      });
    });
    const u = computed(() => {
      const p = e2.toolbars.filter((C) => !e2.toolbarsExclude.includes(C)), v = p.indexOf("="), b = v === -1 ? p : p.slice(0, v + 1), y = v === -1 ? [] : p.slice(v, Number.MAX_SAFE_INTEGER);
      return [b, y];
    }), c = ref(), f = () => {
      k.emit(l, "uploadImage", Array.from(c.value.files || [])), c.value.value = "";
    };
    onMounted(() => {
      c.value.addEventListener("change", f);
    });
    const h = (p) => {
      var v, b, y, C, $, T, I, w, F, j, R, P, _, N, D, Q, z, ue, re, ee, X, ie, te, O, W, ae, me, Ie, He, Fe, Me, Be, Re, je, Pe, De, Oe, _e, Ne, Ve, Ue, qe, Ge;
      if (bt.includes(p))
        switch (p) {
          case "-":
            return createVNode(Yt, null, null);
          case "bold":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (v = o.value.toolbarTips) == null ? void 0 : v.bold,
              onClick: () => {
                a("bold");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-bold"
            }, null)])]);
          case "underline":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (b = o.value.toolbarTips) == null ? void 0 : b.underline,
              onClick: () => {
                a("underline");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-underline"
            }, null)])]);
          case "italic":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (y = o.value.toolbarTips) == null ? void 0 : y.italic,
              onClick: () => {
                a("italic");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-italic"
            }, null)])]);
          case "strikeThrough":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (C = o.value.toolbarTips) == null ? void 0 : C.strikeThrough,
              onClick: () => {
                a("strikeThrough");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-strike-through"
            }, null)])]);
          case "title":
            return createVNode(oe, {
              relative: `#${r2}`,
              visible: n2.title,
              onChange: (E) => {
                n2.title = E;
              },
              overlay: createVNode("ul", {
                class: `${s}-menu`,
                onClick: () => {
                  n2.title = false;
                }
              }, [createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h1");
                }
              }, [($ = o.value.titleItem) == null ? void 0 : $.h1]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h2");
                }
              }, [(T = o.value.titleItem) == null ? void 0 : T.h2]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h3");
                }
              }, [(I = o.value.titleItem) == null ? void 0 : I.h3]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h4");
                }
              }, [(w = o.value.titleItem) == null ? void 0 : w.h4]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h5");
                }
              }, [(F = o.value.titleItem) == null ? void 0 : F.h5]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("h6");
                }
              }, [(j = o.value.titleItem) == null ? void 0 : j.h6])])
            }, {
              default: () => {
                var E;
                return [createVNode("div", {
                  class: `${s}-toolbar-item`,
                  title: (E = o.value.toolbarTips) == null ? void 0 : E.title
                }, [createVNode("svg", {
                  class: `${s}-icon`,
                  "aria-hidden": "true"
                }, [createVNode("use", {
                  "xlink:href": "#md-editor-icon-title"
                }, null)])])];
              }
            });
          case "sub":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (R = o.value.toolbarTips) == null ? void 0 : R.sub,
              onClick: () => {
                a("sub");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-sub"
            }, null)])]);
          case "sup":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (P = o.value.toolbarTips) == null ? void 0 : P.sup,
              onClick: () => {
                a("sup");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-sup"
            }, null)])]);
          case "quote":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (_ = o.value.toolbarTips) == null ? void 0 : _.quote,
              onClick: () => {
                a("quote");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-quote"
            }, null)])]);
          case "unorderedList":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (N = o.value.toolbarTips) == null ? void 0 : N.unorderedList,
              onClick: () => {
                a("unorderedList");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-unordered-list"
            }, null)])]);
          case "orderedList":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (D = o.value.toolbarTips) == null ? void 0 : D.orderedList,
              onClick: () => {
                a("orderedList");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-ordered-list"
            }, null)])]);
          case "task":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Q = o.value.toolbarTips) == null ? void 0 : Q.task,
              onClick: () => {
                a("task");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-task"
            }, null)])]);
          case "codeRow":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (z = o.value.toolbarTips) == null ? void 0 : z.codeRow,
              onClick: () => {
                a("codeRow");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-code-row"
            }, null)])]);
          case "code":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (ue = o.value.toolbarTips) == null ? void 0 : ue.code,
              onClick: () => {
                a("code");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-code"
            }, null)])]);
          case "link":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (re = o.value.toolbarTips) == null ? void 0 : re.link,
              onClick: () => {
                d.type = "link", d.linkVisible = true;
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-link"
            }, null)])]);
          case "image":
            return e2.noUploadImg ? createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (ee = o.value.toolbarTips) == null ? void 0 : ee.image,
              onClick: () => {
                d.type = "image", d.linkVisible = true;
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-image"
            }, null)])]) : createVNode(oe, {
              relative: `#${r2}`,
              visible: n2.image,
              onChange: (E) => {
                n2.image = E;
              },
              overlay: createVNode("ul", {
                class: `${s}-menu`,
                onClick: () => {
                  n2.title = false;
                }
              }, [createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  d.type = "image", d.linkVisible = true;
                }
              }, [(X = o.value.imgTitleItem) == null ? void 0 : X.link]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  c.value.click();
                }
              }, [(ie = o.value.imgTitleItem) == null ? void 0 : ie.upload]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  d.clipVisible = true;
                }
              }, [(te = o.value.imgTitleItem) == null ? void 0 : te.clip2upload])])
            }, {
              default: () => {
                var E;
                return [createVNode("div", {
                  class: `${s}-toolbar-item`,
                  title: (E = o.value.toolbarTips) == null ? void 0 : E.image
                }, [createVNode("svg", {
                  class: `${s}-icon`,
                  "aria-hidden": "true"
                }, [createVNode("use", {
                  "xlink:href": "#md-editor-icon-image"
                }, null)])])];
              }
            });
          case "table":
            return createVNode(oe, {
              relative: `#${r2}`,
              visible: n2.table,
              onChange: (E) => {
                n2.table = E;
              },
              key: "bar-table",
              overlay: createVNode(ul, {
                tableShape: e2.tableShape,
                onSelected: (E) => {
                  a("table", {
                    selectedShape: E
                  });
                }
              }, null)
            }, {
              default: () => {
                var E;
                return [createVNode("div", {
                  class: `${s}-toolbar-item`,
                  title: (E = o.value.toolbarTips) == null ? void 0 : E.table
                }, [createVNode("svg", {
                  class: `${s}-icon`,
                  "aria-hidden": "true"
                }, [createVNode("use", {
                  "xlink:href": "#md-editor-icon-table"
                }, null)])])];
              }
            });
          case "revoke":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (O = o.value.toolbarTips) == null ? void 0 : O.revoke,
              onClick: () => {
                k.emit(l, "ctrlZ");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-revoke"
            }, null)])]);
          case "next":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (W = o.value.toolbarTips) == null ? void 0 : W.next,
              onClick: () => {
                k.emit(l, "ctrlShiftZ");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-next"
            }, null)])]);
          case "save":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (ae = o.value.toolbarTips) == null ? void 0 : ae.save,
              onClick: () => {
                k.emit(l, pe);
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-baocun"
            }, null)])]);
          case "prettier":
            return e2.noPrettier ? "" : createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (me = o.value.toolbarTips) == null ? void 0 : me.prettier,
              onClick: () => {
                a("prettier");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-prettier"
            }, null)])]);
          case "pageFullscreen":
            return !e2.setting.fullscreen && createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Ie = o.value.toolbarTips) == null ? void 0 : Ie.pageFullscreen,
              onClick: () => {
                e2.updateSetting("pageFullscreen");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": `#md-editor-icon-${e2.setting.pageFullscreen ? "suoxiao" : "fangda"}`
            }, null)])]);
          case "fullscreen":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (He = o.value.toolbarTips) == null ? void 0 : He.fullscreen,
              onClick: () => {
                t2();
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": `#md-editor-icon-${e2.setting.fullscreen ? "fullscreen-exit" : "fullscreen"}`
            }, null)])]);
          case "preview":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Fe = o.value.toolbarTips) == null ? void 0 : Fe.preview,
              onClick: () => {
                e2.updateSetting("preview");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-preview"
            }, null)])]);
          case "htmlPreview":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Me = o.value.toolbarTips) == null ? void 0 : Me.htmlPreview,
              onClick: () => {
                e2.updateSetting("htmlPreview");
              }
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-coding"
            }, null)])]);
          case "catalog":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Be = o.value.toolbarTips) == null ? void 0 : Be.catalog,
              onClick: () => {
                k.emit(l, Le);
              },
              key: "bar-catalog"
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-catalog"
            }, null)])]);
          case "github":
            return createVNode("div", {
              class: `${s}-toolbar-item`,
              title: (Re = o.value.toolbarTips) == null ? void 0 : Re.github,
              onClick: () => tl("https://github.com/imzbf/md-editor-v3")
            }, [createVNode("svg", {
              class: `${s}-icon`,
              "aria-hidden": "true"
            }, [createVNode("use", {
              "xlink:href": "#md-editor-icon-github"
            }, null)])]);
          case "mermaid":
            return createVNode(oe, {
              relative: `#${r2}`,
              visible: n2.mermaid,
              onChange: (E) => {
                n2.mermaid = E;
              },
              overlay: createVNode("ul", {
                class: `${s}-menu`,
                onClick: () => {
                  n2.mermaid = false;
                }
              }, [createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("flow");
                }
              }, [(je = o.value.mermaid) == null ? void 0 : je.flow]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("sequence");
                }
              }, [(Pe = o.value.mermaid) == null ? void 0 : Pe.sequence]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("gantt");
                }
              }, [(De = o.value.mermaid) == null ? void 0 : De.gantt]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("class");
                }
              }, [(Oe = o.value.mermaid) == null ? void 0 : Oe.class]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("state");
                }
              }, [(_e = o.value.mermaid) == null ? void 0 : _e.state]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("pie");
                }
              }, [(Ne = o.value.mermaid) == null ? void 0 : Ne.pie]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("relationship");
                }
              }, [(Ve = o.value.mermaid) == null ? void 0 : Ve.relationship]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("journey");
                }
              }, [(Ue = o.value.mermaid) == null ? void 0 : Ue.journey])]),
              key: "bar-mermaid"
            }, {
              default: () => {
                var E;
                return [createVNode("div", {
                  class: `${s}-toolbar-item`,
                  title: (E = o.value.toolbarTips) == null ? void 0 : E.mermaid
                }, [createVNode("svg", {
                  class: `${s}-icon`,
                  "aria-hidden": "true"
                }, [createVNode("use", {
                  "xlink:href": "#md-editor-icon-mermaid"
                }, null)])])];
              }
            });
          case "katex":
            return createVNode(oe, {
              relative: `#${r2}`,
              visible: n2.katex,
              onChange: (E) => {
                n2.katex = E;
              },
              overlay: createVNode("ul", {
                class: `${s}-menu`,
                onClick: () => {
                  n2.katex = false;
                }
              }, [createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("katexInline");
                }
              }, [(qe = o.value.katex) == null ? void 0 : qe.inline]), createVNode("li", {
                class: `${s}-menu-item`,
                onClick: () => {
                  a("katexBlock");
                }
              }, [(Ge = o.value.katex) == null ? void 0 : Ge.block])]),
              key: "bar-katex"
            }, {
              default: () => {
                var E;
                return [createVNode("div", {
                  class: `${s}-toolbar-item`,
                  title: (E = o.value.toolbarTips) == null ? void 0 : E.katex
                }, [createVNode("svg", {
                  class: `${s}-icon`,
                  "aria-hidden": "true"
                }, [createVNode("use", {
                  "xlink:href": "#md-editor-icon-formula"
                }, null)])])];
              }
            });
        }
      else
        return e2.defToolbars instanceof Array ? e2.defToolbars[p] || "" : e2.defToolbars && e2.defToolbars.children instanceof Array && e2.defToolbars.children[p] || "";
    };
    return () => {
      const p = u.value[0].map((b) => h(b)), v = u.value[1].map((b) => h(b));
      return createVNode(Fragment, null, [e2.toolbars.length > 0 && createVNode("div", {
        class: `${s}-toolbar-wrapper`,
        id: r2
      }, [createVNode("div", {
        class: `${s}-toolbar`
      }, [createVNode("div", {
        class: `${s}-toolbar-left`,
        ref: m
      }, [p]), createVNode("div", {
        class: `${s}-toolbar-right`
      }, [v])])]), createVNode("input", {
        ref: c,
        accept: "image/*",
        type: "file",
        multiple: true,
        style: {
          display: "none"
        }
      }, null), createVNode(bl, {
        linkVisible: d.linkVisible,
        clipVisible: d.clipVisible,
        type: d.type,
        onCancel: () => {
          d.linkVisible = false, d.clipVisible = false;
        },
        onOk: (b) => {
          b && a(d.type, {
            desc: b.desc,
            url: b.url
          }), d.linkVisible = false, d.clipVisible = false;
        }
      }, null)]);
    };
  }
});
var lt = (e2, l, o) => {
  let t2 = e2.scrollTop;
  const r2 = () => {
    const n2 = l - t2;
    t2 = t2 + n2 / 5, Math.abs(n2) < 1 ? (e2.scrollTo(0, l), o && setTimeout(o, 100)) : (e2.scrollTo(0, t2), requestAnimationFrame(r2));
  };
  r2();
};
var yl = (e2, l) => {
  const o = ve(() => {
    e2.removeEventListener("scroll", t2), e2.addEventListener("scroll", t2), l.removeEventListener("scroll", t2), l.addEventListener("scroll", t2);
  }, 50), t2 = (r2) => {
    const n2 = e2.clientHeight, a = l.clientHeight, d = e2.scrollHeight, m = l.scrollHeight, u = (d - n2) / (m - a);
    r2.target === e2 ? (l.removeEventListener("scroll", t2), l.scrollTo({
      top: e2.scrollTop / u
      // behavior: 'smooth'
    }), o()) : (e2.removeEventListener("scroll", t2), e2.scrollTo({
      top: l.scrollTop * u
      // behavior: 'smooth'
    }), o());
  };
  return [
    () => {
      o().finally(() => {
        e2.dispatchEvent(new Event("scroll"));
      });
    },
    () => {
      e2.removeEventListener("scroll", t2), l.removeEventListener("scroll", t2);
    }
  ];
};
var Cl = (e2, l, o) => {
  const { view: t2 } = o, r2 = (f) => t2.lineBlockAt(t2.state.doc.line(f).from).top, n2 = (f) => t2.lineBlockAt(t2.state.doc.line(f).from).height;
  let a = [];
  const d = () => {
    a = [];
    const f = Array.from(l.querySelectorAll("[data-line]")).map(
      (b) => Number(b.dataset.line) + 1
    ), { lines: h } = t2.state.doc;
    let p = 1, v = f.shift() ?? h;
    for (let b = 1; b <= h; b++)
      b === v && (p = b, v = f.shift() || h + 1), a.push({
        start: p,
        end: v - 1
      });
  };
  let m = 0, u = 0;
  const c = (f) => {
    var v, b, y, C, $, T, I;
    if (!((v = l.firstElementChild) != null && v.firstElementChild))
      return;
    const h = t2.lineBlockAtHeight(t2.scrollDOM.scrollTop), { number: p } = t2.state.doc.lineAt(h.from);
    if (!(p > a.length) && !(t2.state.doc.lines < a[a.length - 1].end))
      if (f.target === e2) {
        if (u !== 0)
          return;
        m++;
        const w = a[p - 1], F = r2(w.end) + n2(w.end);
        let j = 0;
        const R = r2(w.start), P = l.querySelector(`[data-line="${w.start - 1}"]`) || ((b = l.firstElementChild) == null ? void 0 : b.firstElementChild), _ = l.querySelector(`[data-line="${w.end}"]`) || ((y = l.lastElementChild) == null ? void 0 : y.lastElementChild);
        let N = 0, D = 0;
        R === 0 ? (j = (t2.scrollDOM.scrollTop - R) / (F - R), N = _.offsetTop) : F > t2.scrollDOM.scrollHeight - t2.scrollDOM.clientHeight ? (j = (t2.scrollDOM.scrollTop - R) / (t2.scrollDOM.scrollHeight - t2.scrollDOM.clientHeight - R), D = P.offsetTop, N = l.scrollHeight - l.clientHeight - D + 10) : (j = (t2.scrollDOM.scrollTop - R) / (F - R), D = P.offsetTop, N = _.offsetTop - D);
        const Q = D - 10 + N * j;
        lt(l, Q, () => {
          m--;
        });
      } else {
        if (m !== 0)
          return;
        u++;
        const w = Array.from(
          l.querySelectorAll("[data-line]")
        ), F = l.scrollTop, j = l.scrollHeight;
        let R = w.length === 0 ? 1 : Math.ceil(
          Number(w[w.length - 1].dataset.line) * (F / j)
        ), P = (C = l.firstElementChild) == null ? void 0 : C.firstElementChild;
        for (let O = R; O >= 0; O--) {
          const W = l.querySelector(`[data-line="${O}"]`);
          if (W) {
            P = W, R = O;
            break;
          }
        }
        let _ = ($ = l.firstElementChild) == null ? void 0 : $.firstElementChild, N = (T = l.firstElementChild) == null ? void 0 : T.lastElementChild;
        for (; w.length > 0; ) {
          const O = w.indexOf(P);
          if (O + 1 >= w.length)
            break;
          const W = w[O + 1], ae = P.offsetTop;
          if (ae > F) {
            if (O === 0) {
              _ = P, N = W;
              break;
            }
            P = w[O - 1];
            continue;
          }
          const me = W.offsetTop;
          if (ae <= F && me > F) {
            _ = P, N = W;
            break;
          }
          P = W;
        }
        const D = _.offsetTop, Q = N.offsetTop;
        let z = 0;
        const { start: ue, end: re } = a[Number(_.dataset.line || 0)], ee = r2(ue);
        let X = r2(re);
        const ie = n2(re);
        let te = 0;
        _ === ((I = l.firstElementChild) == null ? void 0 : I.firstElementChild) ? (z = Math.max(F / Q, 0), te = X + ie - ee) : X > t2.scrollDOM.scrollHeight - t2.scrollDOM.clientHeight ? (z = Math.max(
          (F - D) / (l.scrollHeight - D - l.clientHeight),
          0
        ), X = r2(t2.state.doc.lines) + n2(t2.state.doc.lines), te = 8 + X - ee - e2.clientHeight) : (z = Math.max(
          (F - D) / (Q - D),
          0
        ), te = X + ie - ee), lt(e2, ee + te * z, () => {
          u--;
        });
      }
  };
  return [
    () => {
      d(), e2.addEventListener("scroll", c), l.addEventListener("scroll", c), e2.dispatchEvent(new Event("scroll"));
    },
    () => {
      a = [], e2.removeEventListener("scroll", c), l.removeEventListener("scroll", c);
    }
  ];
};
var $l = (e2, l, o, t2, r2) => {
  const n2 = inject("previewOnly");
  let a = () => {
  }, d = () => {
  };
  const m = () => {
    a();
    const u = document.querySelector(".cm-scroller");
    !n2 && (o.value || t2.value) && ([d, a] = (o.value ? Cl : yl)(
      u,
      o.value || t2.value,
      r2.value
    )), e2.scrollAuto && d();
  };
  watch(
    [
      l,
      toRef(e2.setting, "preview"),
      toRef(e2.setting, "htmlPreview"),
      toRef(e2.setting, "fullscreen"),
      toRef(e2.setting, "pageFullscreen")
    ],
    () => {
      nextTick(m);
    }
  ), watch(
    () => e2.scrollAuto,
    (u) => {
      u ? d() : a();
    }
  ), onMounted(m);
};
var wl = (e2, l, o) => {
  var c, f, h, p, v, b;
  let t2 = "", r2 = 0, n2 = 0, a = true, d = false;
  const m = l.getSelectedText(), u = (c = A.editorConfig) == null ? void 0 : c.mermaidTemplate;
  if (/^h[1-6]{1}$/.test(e2)) {
    const y = e2.replace(/^h(\d)/, (C, $) => new Array(Number($)).fill("#", 0, $).join(""));
    t2 = `${y} ${m}`, r2 = y.length + 1;
  } else if (e2 === "prettier") {
    const y = window.prettier || ((h = (f = A.editorExtensions) == null ? void 0 : f.prettier) == null ? void 0 : h.prettierInstance), C = [
      ((p = window.prettierPlugins) == null ? void 0 : p.markdown) || ((b = (v = A.editorExtensions) == null ? void 0 : v.prettier) == null ? void 0 : b.parserMarkdownInstance)
    ];
    !y || C[0] === void 0 ? (k.emit(o.editorId, "errorCatcher", {
      name: "prettier",
      message: "prettier is undefined"
    }), t2 = l.getValue()) : t2 = y.format(l.getValue(), {
      parser: "markdown",
      plugins: C
    }), a = false, d = true;
  } else
    switch (e2) {
      case "bold": {
        t2 = `**${m}**`, r2 = 2, n2 = -2;
        break;
      }
      case "underline": {
        t2 = `<u>${m}</u>`, r2 = 3, n2 = -4;
        break;
      }
      case "italic": {
        t2 = `*${m}*`, r2 = 1, n2 = -1;
        break;
      }
      case "strikeThrough": {
        t2 = `~~${m}~~`, r2 = 2, n2 = -2;
        break;
      }
      case "sub": {
        t2 = `<sub>${m}</sub>`, r2 = 5, n2 = -6;
        break;
      }
      case "sup": {
        t2 = `<sup>${m}</sup>`, r2 = 5, n2 = -6;
        break;
      }
      case "codeRow": {
        t2 = "`" + m + "`", r2 = 1, n2 = -1;
        break;
      }
      case "quote": {
        t2 = `> ${m}`, r2 = 2;
        break;
      }
      case "orderedList": {
        t2 = `1. ${m}`, r2 = 3;
        break;
      }
      case "unorderedList": {
        t2 = `- ${m}`, r2 = 2;
        break;
      }
      case "task": {
        t2 = `- [ ] ${m}`, r2 = 6;
        break;
      }
      case "code": {
        const y = o.text || m || "", C = o.mode || "language";
        t2 = `\`\`\`${C}
${y}
\`\`\`
`, r2 = 3, n2 = 3 + C.length - t2.length;
        break;
      }
      case "table": {
        t2 = "|";
        const { selectedShape: y = { x: 1, y: 1 } } = o, { x: C, y: $ } = y;
        for (let T = 0; T <= $; T++)
          t2 += " col |";
        t2 += `
|`;
        for (let T = 0; T <= $; T++)
          t2 += " - |";
        for (let T = 0; T <= C; T++) {
          t2 += `
|`;
          for (let I = 0; I <= $; I++)
            t2 += " content |";
        }
        r2 = 2, n2 = 5 - t2.length;
        break;
      }
      case "link": {
        const { desc: y, url: C } = o;
        t2 = `[${y}](${C})`, a = false;
        break;
      }
      case "image": {
        const { desc: y, url: C, urls: $ } = o;
        $ instanceof Array ? t2 = $.reduce((T, I) => T + `![${y}](${I})
`, "") : t2 = `![${y}](${C})
`, a = false;
        break;
      }
      case "flow": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.flow) || `flowchart TD 
  Start --> Stop`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "sequence": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.sequence) || `sequenceDiagram
  A->>B: hello!
  B-->>A: hi!
  A-)B: bye!`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "gantt": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.gantt) || `gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task  :a1, 2014-01-01, 30d
Another task  :after a1, 20d`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "class": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.class) || `classDiagram
  class Animal
  Vehicle <|-- Car`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "state": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.state) || `stateDiagram-v2
  s1 --> s2`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "pie": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.pie) || `pie title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "relationship": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.relationship) || `erDiagram
  CAR ||--o{ NAMED-DRIVER : allows
  PERSON ||--o{ NAMED-DRIVER : is`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "journey": {
        t2 = `\`\`\`mermaid
${(u == null ? void 0 : u.journey) || `journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 5: Me`}
\`\`\`
`, r2 = 3, n2 = 10 - t2.length;
        break;
      }
      case "katexInline": {
        t2 = "$$", r2 = 1, n2 = -1;
        break;
      }
      case "katexBlock": {
        t2 = `$$

$$
`, r2 = 3, n2 = -4;
        break;
      }
      case "universal": {
        const { generate: y } = o, C = y(m);
        t2 = C.targetValue, a = C.select, r2 = C.deviationStart, n2 = C.deviationEnd;
      }
    }
  return {
    text: t2,
    options: {
      // 是否选中
      select: a,
      // 选中时，开始位置的偏移量
      deviationStart: r2,
      // 结束的偏移量
      deviationEnd: n2,
      // 是否整个替换
      replaceAll: d
    }
  };
};
var Tl = "#e5c07b";
var ot = "var(--md-color)";
var Sl = "#56b6c2";
var xl = "#ffffff";
var se = "var(--md-color)";
var nt = "#e5c07b";
var El = "#e5c07b";
var Ll = "var(--md-color)";
var rt = "#d19a66";
var Al = "#c678dd";
var Il = "#21252b";
var it = "#2c313a";
var at = "#000";
var ke = "#353a42";
var Hl = "#ceedfa33";
var st = "#528bff";
var Fl = EditorView.theme(
  {
    "&": {
      color: se,
      backgroundColor: at
    },
    ".cm-content": {
      caretColor: st
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: st },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: Hl },
    ".cm-panels": { backgroundColor: Il, color: se },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: at,
      color: se,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: it
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: ke
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: ke,
      borderBottomColor: ke
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: it,
        color: se
      }
    }
  },
  { dark: true }
);
var Ml = HighlightStyle.define([
  { tag: tags.keyword, color: Al },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: ot },
  { tag: [tags.function(tags.variableName), tags.labelName], color: El },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: rt },
  { tag: [tags.definition(tags.name), tags.separator], color: se },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: Tl
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: Sl
  },
  { tag: [tags.meta, tags.comment], color: nt },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: nt, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: ot },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: rt },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: Ll },
  { tag: tags.invalid, color: xl }
]);
var Bl = [
  Fl,
  syntaxHighlighting(Ml)
];
var Rl = "#e5c07b";
var ct = "#3f4a54";
var jl = "#56b6c2";
var Pl = "#fff";
var ce = "#3f4a54";
var dt = "#2d8cf0";
var Dl = "#2d8cf0";
var Ol = "#3f4a54";
var ut = "#d19a66";
var _l = "#c678dd";
var Nl = "#21252b";
var mt = "#ceedfa33";
var ft = "#fff";
var ye = "#353a42";
var Vl = "#bad5fa";
var gt = "#3f4a54";
var Ul = EditorView.theme(
  {
    "&": {
      color: ce,
      backgroundColor: ft
    },
    ".cm-content": {
      caretColor: gt
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: gt },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: Vl },
    ".cm-panels": { backgroundColor: Nl, color: ce },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: ft,
      color: ce,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: mt
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: ye
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: ye,
      borderBottomColor: ye
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: mt,
        color: ce
      }
    }
  },
  { dark: true }
);
var ql = HighlightStyle.define([
  { tag: tags.keyword, color: _l },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: ct },
  { tag: [tags.function(tags.variableName), tags.labelName], color: Dl },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: ut },
  { tag: [tags.definition(tags.name), tags.separator], color: ce },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: Rl
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: jl
  },
  { tag: [tags.meta, tags.comment], color: dt },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: dt, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: ct },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: ut },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: Ol },
  { tag: tags.invalid, color: Pl }
]);
var Gl = [
  Ul,
  syntaxHighlighting(ql)
];
var le = (e2) => {
  const l = new Compartment();
  return (t2) => (l.get(e2.state) ? e2.dispatch({ effects: l.reconfigure(t2) }) : e2.dispatch({
    effects: StateEffect.appendConfig.of(l.of(t2))
  }), true);
};
var Wl = class {
  constructor(l) {
    K(this, "view");
    K(this, "toggleTabSize");
    K(this, "togglePlaceholder");
    K(this, "setExtensions");
    K(this, "toggleDisabled");
    K(this, "toggleReadOnly");
    K(this, "toggleMaxlength");
    this.view = l, this.toggleTabSize = le(this.view), this.togglePlaceholder = le(this.view), this.setExtensions = le(this.view), this.toggleDisabled = le(this.view), this.toggleReadOnly = le(this.view), this.toggleMaxlength = le(this.view);
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(l, o = 0, t2 = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from: o,
        to: t2,
        insert: l
      }
    });
  }
  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from: l, to: o } = this.view.state.selection.main;
    return this.view.state.sliceDoc(l, o);
  }
  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(l, o = {
    // 是否选中
    select: true,
    // 选中时，开始位置的偏移量
    deviationStart: 0,
    // 结束的偏移量
    deviationEnd: 0,
    // 直接替换所有文本
    replaceAll: false
  }) {
    if (o.replaceAll) {
      this.setValue(l);
      return;
    }
    const { from: t2 } = this.view.state.selection.main;
    if (this.view.dispatch(this.view.state.replaceSelection(l)), o.select) {
      const r2 = t2 + l.length + o.deviationEnd;
      this.view.dispatch({
        selection: EditorSelection.create(
          [
            EditorSelection.range(t2 + o.deviationStart, r2),
            EditorSelection.cursor(r2)
          ],
          1
        )
      }), this.view.focus();
    }
  }
  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(l) {
    this.toggleTabSize([
      EditorState.tabSize.of(l),
      indentUnit.of(" ".repeat(l))
    ]);
  }
  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(l) {
    this.togglePlaceholder(placeholder(l));
  }
  focus() {
    this.view.focus();
  }
  setDisabled(l) {
    this.toggleDisabled([EditorView.editable.of(!l)]);
  }
  setReadOnly(l) {
    this.toggleReadOnly([EditorState.readOnly.of(l)]);
  }
  setMaxLength(l) {
    this.toggleMaxlength([
      EditorState.changeFilter.of((o) => o.newDoc.length <= l)
    ]);
  }
};
var Kl = (e2) => {
  const l = inject("editorId");
  return (t2) => {
    if (t2.clipboardData) {
      if (t2.clipboardData.files.length > 0) {
        const { files: r2 } = t2.clipboardData;
        k.emit(
          l,
          "uploadImage",
          Array.from(r2).filter((n2) => /image\/.*/.test(n2.type))
        ), t2.preventDefault();
      }
      if (e2.autoDetectCode && t2.clipboardData.types.includes("vscode-editor-data")) {
        const r2 = JSON.parse(t2.clipboardData.getData("vscode-editor-data"));
        k.emit(l, "replace", "code", {
          mode: r2.mode,
          text: t2.clipboardData.getData("text/plain")
        }), t2.preventDefault();
      }
    }
  };
};
var zl = (e2) => {
  const l = inject("editorId");
  onMounted(() => {
    k.on(l, {
      name: Ct,
      callback() {
        var o;
        (o = e2.value) == null || o.focus();
      }
    });
  });
};
var Xl = (e2, l) => [
  {
    key: "Ctrl-b",
    mac: "Cmd-b",
    run: () => (k.emit(e2, "replace", "bold"), true)
  },
  {
    key: "Ctrl-d",
    mac: "Cmd-d",
    run: deleteLine,
    preventDefault: true
  },
  {
    key: "Ctrl-s",
    mac: "Cmd-s",
    run: (I) => (k.emit(e2, pe, I.state.doc.toString()), true),
    shift: () => (k.emit(e2, "replace", "strikeThrough"), true)
  },
  {
    key: "Ctrl-u",
    mac: "Cmd-u",
    run: () => (k.emit(e2, "replace", "underline"), true),
    shift: () => (k.emit(e2, "replace", "unorderedList"), true)
  },
  {
    key: "Ctrl-i",
    mac: "Cmd-i",
    run: () => (k.emit(e2, "replace", "italic"), true),
    shift: () => (k.emit(e2, "openModals", "image"), true)
  },
  {
    key: "Ctrl-1",
    mac: "Cmd-1",
    run: () => (k.emit(e2, "replace", "h1"), true)
  },
  {
    key: "Ctrl-2",
    mac: "Cmd-2",
    run: () => (k.emit(e2, "replace", "h2"), true)
  },
  {
    key: "Ctrl-3",
    mac: "Cmd-3",
    run: () => (k.emit(e2, "replace", "h3"), true)
  },
  {
    key: "Ctrl-4",
    mac: "Cmd-4",
    run: () => (k.emit(e2, "replace", "h4"), true)
  },
  {
    key: "Ctrl-5",
    mac: "Cmd-5",
    run: () => (k.emit(e2, "replace", "h5"), true)
  },
  {
    key: "Ctrl-6",
    mac: "Cmd-6",
    run: () => (k.emit(e2, "replace", "h6"), true)
  },
  {
    key: "Ctrl-ArrowUp",
    mac: "Cmd-ArrowUp",
    run: () => (k.emit(e2, "replace", "sup"), true)
  },
  {
    key: "Ctrl-ArrowDown",
    mac: "Cmd-ArrowDown",
    run: () => (k.emit(e2, "replace", "sub"), true)
  },
  {
    key: "Ctrl-o",
    mac: "Cmd-o",
    run: () => (k.emit(e2, "replace", "orderedList"), true)
  },
  {
    key: "Ctrl-c",
    mac: "Cmd-c",
    shift: () => (k.emit(e2, "replace", "code"), true),
    any(I, w) {
      return (w.ctrlKey || w.metaKey) && w.altKey && w.code === "KeyC" ? (k.emit(e2, "replace", "codeRow"), true) : false;
    }
  },
  {
    key: "Ctrl-l",
    mac: "Cmd-l",
    run: () => (k.emit(e2, "openModals", "link"), true)
  },
  {
    key: "Ctrl-f",
    mac: "Cmd-f",
    shift: () => l.noPrettier ? false : (k.emit(e2, "replace", "prettier"), true)
  },
  {
    any: (I, w) => (w.ctrlKey || w.metaKey) && w.altKey && w.shiftKey && w.code === "KeyT" ? (k.emit(e2, "replace", "table"), true) : false
  }
];
var Zl = (e2) => {
  const l = inject("tabWidth"), o = inject("editorId"), t2 = inject("theme"), r2 = ref(), n2 = shallowRef(), a = Xl(o, e2), d = Kl(e2), m = [
    keymap.of([...a, indentWithTab]),
    minimalSetup,
    markdown({ codeLanguages: languages }),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((c) => {
      c.docChanged && e2.onChange(c.state.doc.toString());
    }),
    EditorView.domEventHandlers({
      paste: d,
      blur: e2.onBlur,
      focus: e2.onFocus
    })
  ], u = () => t2.value === "light" ? A.codeMirrorExtensions(
    t2.value,
    [...m, Gl],
    [...a]
  ) : A.codeMirrorExtensions(
    t2.value,
    [...m, Bl],
    [...a]
  );
  return onMounted(() => {
    const c = EditorState.create({
      doc: e2.value
    }), f = new EditorView({
      state: c,
      parent: r2.value
    });
    n2.value = new Wl(f), n2.value.setTabSize(l), n2.value.setExtensions(u()), n2.value.setPlaceholder(e2.placeholder), n2.value.setDisabled(e2.disabled), n2.value.setReadOnly(e2.readonly), e2.autofocus && f.focus(), e2.maxlength && n2.value.setMaxLength(e2.maxlength), k.on(o, {
      name: "ctrlZ",
      callback() {
        undo(f);
      }
    }), k.on(o, {
      name: "ctrlShiftZ",
      callback() {
        redo(f);
      }
    }), k.on(o, {
      name: "replace",
      callback(h, p = {}) {
        var y;
        const { text: v, options: b } = wl(h, n2.value, p);
        (y = n2.value) == null || y.replaceSelectedText(v, b);
      }
    });
  }), watch(
    () => t2.value,
    () => {
      var c, f;
      t2.value === "dark" ? (c = n2.value) == null || c.setExtensions(u()) : (f = n2.value) == null || f.setExtensions(u());
    }
  ), watch(
    () => e2.value,
    () => {
      var c, f;
      ((c = n2.value) == null ? void 0 : c.getValue()) !== e2.value && ((f = n2.value) == null || f.setValue(e2.value));
    }
  ), watch(
    () => e2.value,
    () => {
      var c;
      (c = n2.value) == null || c.setPlaceholder(e2.placeholder);
    }
  ), watch(
    () => e2.disabled,
    () => {
      var c;
      (c = n2.value) == null || c.setDisabled(e2.disabled);
    }
  ), watch(
    () => e2.readonly,
    () => {
      var c;
      (c = n2.value) == null || c.setDisabled(e2.readonly);
    }
  ), watch(
    () => e2.maxlength,
    () => {
      var c;
      e2.maxlength && ((c = n2.value) == null || c.setMaxLength(e2.maxlength));
    }
  ), zl(n2), {
    inputWrapperRef: r2,
    codeMirrorUt: n2
  };
};
var Jl = (e2, l) => {
  const o = inject("editorId"), t2 = ve(() => {
    const r2 = document.querySelectorAll(`#${o}-preview img`);
    r2.length !== 0 && medium_zoom_esm_default(r2, {
      background: "#00000073"
    });
  });
  onMounted(t2), watch([l, toRef(e2.setting, "preview")], t2);
};
var Yl = (e2, l) => {
  const o = inject("editorId"), t2 = inject("usedLanguageText"), r2 = () => {
    document.querySelectorAll(`#${o}-preview pre`).forEach((d) => {
      var f, h;
      let m = -1;
      (f = d.querySelector(".copy-button")) == null || f.remove();
      const u = ((h = t2.value.copyCode) == null ? void 0 : h.text) || "复制代码", c = document.createElement("span");
      c.setAttribute("class", "copy-button"), c.dataset.tips = u, c.innerHTML = `<svg class="${s}-icon" aria-hidden="true"><use xlink:href="#${s}-icon-copy"></use></svg>`, c.addEventListener("click", () => {
        var C, $;
        clearTimeout(m);
        const p = d.querySelector("code").innerText, v = (0, import_copy_to_clipboard.default)(e2.formatCopiedText(p)), b = ((C = t2.value.copyCode) == null ? void 0 : C.successTips) || "已复制！", y = (($ = t2.value.copyCode) == null ? void 0 : $.failTips) || "已复制！";
        c.dataset.tips = v ? b : y, m = window.setTimeout(() => {
          c.dataset.tips = u;
        }, 1500);
      }), d.appendChild(c);
    });
  }, n2 = () => {
    nextTick(r2);
  }, a = (d) => {
    d && nextTick(r2);
  };
  watch(() => l.value, n2), watch(() => e2.setting.preview, a), watch(() => e2.setting.htmlPreview, a), watch(() => t2.value, r2), onMounted(r2);
};
var Ql = (e2) => {
  var n2;
  const l = (n2 = A.editorExtensions) == null ? void 0 : n2.highlight, o = l == null ? void 0 : l.instance, t2 = inject("highlight"), r2 = shallowRef(o);
  return onMounted(() => {
    if (!e2.noHighlight && !r2.value) {
      const a = document.createElement("script");
      a.src = t2.value.js, a.onload = () => {
        r2.value = window.hljs;
      }, a.id = `${s}-hljs`, V(a, "hljs");
      const d = document.createElement("link");
      d.rel = "stylesheet", d.href = t2.value.css, d.id = `${s}-hlCss`, V(d);
    }
  }), watch(
    () => t2.value.css,
    (a) => {
      sl(`${s}-hlCss`, "href", a);
    }
  ), r2;
};
var eo = (e2) => {
  const l = inject("theme"), { editorExtensions: o } = A, t2 = o == null ? void 0 : o.mermaid, r2 = shallowRef(t2 == null ? void 0 : t2.instance), n2 = shallowRef(false), a = new mjs_default({
    max: 1e3,
    // 缓存10分钟
    ttl: 6e5
  }), d = () => {
    const u = (t2 == null ? void 0 : t2.instance) || window.mermaid;
    !e2.noMermaid && u && (u.initialize({
      startOnLoad: false,
      theme: l.value === "dark" ? "dark" : "default"
    }), n2.value = !n2.value);
  };
  return watch(
    () => l.value,
    () => {
      a.clear(), d();
    }
  ), onMounted(() => {
    if (!e2.noMermaid && !(t2 != null && t2.instance)) {
      const u = document.createElement("script");
      u.id = `${s}-mermaid`;
      const c = (t2 == null ? void 0 : t2.js) || Zt;
      /\.mjs/.test(c) ? (u.setAttribute("type", "module"), u.innerHTML = `import mermaid from "${c}";window.mermaid=mermaid;document.getElementById('${s}-mermaid').dispatchEvent(new Event('load'));`) : u.src = c, u.onload = () => {
        r2.value = window.mermaid, d();
      }, V(u, "mermaid");
    }
  }), { mermaidRef: r2, reRenderRef: n2, replaceMermaid: () => {
    nextTick(() => {
      !e2.noMermaid && r2.value && document.querySelectorAll(
        `div.${s}-mermaid`
      ).forEach(async (c) => {
        let f = a.get(c.innerText);
        if (!f) {
          const p = il(), b = await (r2.value.renderAsync || r2.value.render)(p, c.innerText);
          f = typeof b == "string" ? b : b.svg, a.set(c.innerText, f);
        }
        const h = document.createElement("p");
        h.className = `${s}-mermaid`, h.setAttribute("data-processed", ""), h.innerHTML = f, c.dataset.line !== void 0 && (h.dataset.line = c.dataset.line), c.replaceWith(h);
      });
    });
  } };
};
var to = (e2) => {
  var r2;
  const l = (r2 = A.editorExtensions) == null ? void 0 : r2.katex, o = l == null ? void 0 : l.instance, t2 = shallowRef(o);
  return onMounted(() => {
    if (!e2.noKatex && !t2.value) {
      const n2 = document.createElement("script");
      n2.src = (l == null ? void 0 : l.js) || Xe.js, n2.onload = () => {
        t2.value = window.katex;
      }, n2.id = `${s}-katex`;
      const a = document.createElement("link");
      a.rel = "stylesheet", a.href = (l == null ? void 0 : l.css) || Xe.css, a.id = `${s}-katexCss`, V(n2, "katex"), V(a);
    }
  }), t2;
};
var lo = (e2, l) => {
  const o = e2.renderer.rules.fence.bind(e2.renderer.rules);
  e2.renderer.rules.fence = (t2, r2, n2, a, d) => {
    const m = t2[r2], u = m.content.trim();
    if (m.info === "mermaid") {
      let c;
      return t2[r2].map && t2[r2].level === 0 && (c = t2[r2].map[0], t2[r2].attrSet("data-line", String(c))), `<div class="${s}-mermaid" ${c !== void 0 ? "data-line=" + c : ""} data-mermaid-theme=${l.themeRef.value}>${u}</div>`;
    }
    return o(t2, r2, n2, a, d);
  };
};
var ht = (e2, l) => {
  let o = true, t2 = true;
  const r2 = e2.posMax, n2 = l > 0 ? e2.src.charCodeAt(l - 1) : -1, a = l + 1 <= r2 ? e2.src.charCodeAt(l + 1) : -1;
  return (n2 === 32 || n2 === 9 || a >= 48 && a <= 57) && (t2 = false), (a === 32 || a === 9) && (o = false), {
    can_open: o,
    can_close: t2
  };
};
var oo = (e2, l) => {
  let o, t2, r2, n2;
  if (e2.src[e2.pos] !== "$")
    return false;
  if (r2 = ht(e2, e2.pos), !r2.can_open)
    return l || (e2.pending += "$"), e2.pos += 1, true;
  const a = e2.pos + 1;
  for (o = a; (o = e2.src.indexOf("$", o)) !== -1; ) {
    for (n2 = o - 1; e2.src[n2] === "\\"; )
      n2 -= 1;
    if ((o - n2) % 2 == 1)
      break;
    o += 1;
  }
  return o === -1 ? (l || (e2.pending += "$"), e2.pos = a, true) : o - a === 0 ? (l || (e2.pending += "$$"), e2.pos = a + 1, true) : (r2 = ht(e2, o), r2.can_close ? (l || (t2 = e2.push("math_inline", "math", 0), t2.markup = "$", t2.content = e2.src.slice(a, o)), e2.pos = o + 1, true) : (l || (e2.pending += "$"), e2.pos = a, true));
};
var no = (e2, l, o, t2) => {
  let r2, n2, a, d, m = false, u = e2.bMarks[l] + e2.tShift[l], c = e2.eMarks[l];
  if (u + 2 > c || e2.src.slice(u, u + 2) !== "$$")
    return false;
  if (u += 2, r2 = e2.src.slice(u, c), t2)
    return true;
  for (r2.trim().slice(-2) === "$$" && (r2 = r2.trim().slice(0, -2), m = true), a = l; !m && (a++, !(a >= o || (u = e2.bMarks[a] + e2.tShift[a], c = e2.eMarks[a], u < c && e2.tShift[a] < e2.blkIndent))); )
    e2.src.slice(u, c).trim().slice(-2) === "$$" && (d = e2.src.slice(0, c).lastIndexOf("$$"), n2 = e2.src.slice(u, d), m = true);
  e2.line = a + 1;
  const f = e2.push("math_block", "math", 0);
  return f.block = true, f.content = (r2 && r2.trim() ? r2 + `
` : "") + e2.getLines(l + 1, a, e2.tShift[l], true) + (n2 && n2.trim() ? n2 : ""), f.map = [l, e2.line], f.markup = "$$", true;
};
var ro = (e2, l) => {
  const o = (r2) => {
    if (l.katexRef.value) {
      const n2 = l.katexRef.value.renderToString(r2, {
        throwOnError: false
      });
      return `<span class="${s}-katex-inline" data-processed>${n2}</span>`;
    } else
      return `<span class="${s}-katex-inline">${r2}</span>`;
  }, t2 = (r2, n2) => {
    if (l.katexRef.value) {
      const a = l.katexRef.value.renderToString(r2, {
        throwOnError: false,
        displayMode: true
      });
      return `<p class="${s}-katex-block" data-line=${n2} data-processed>${a}</p>`;
    } else
      return `<p class="${s}-katex-block" data-line=${n2}>${r2}</p>`;
  };
  e2.inline.ruler.after("escape", "math_inline", oo), e2.block.ruler.after("blockquote", "math_block", no, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  }), e2.renderer.rules.math_inline = (r2, n2) => o(r2[n2].content), e2.renderer.rules.math_block = (r2, n2) => t2(r2[n2].content, r2[n2].map[0]) + `
`;
};
var io = (e2, l) => {
  l = l || {};
  const o = 3, t2 = l.marker || "!", r2 = t2.charCodeAt(0), n2 = t2.length;
  let a = "", d = "";
  const m = (c, f, h, p, v) => {
    const b = c[f];
    return b.type === "admonition_open" ? (c[f].attrPush([
      "class",
      `${s}-admonition ${s}-admonition-${b.info}`
    ]), c[f].attrSet("data-line", String(c[f].map[0]))) : b.type === "admonition_title_open" && c[f].attrPush(["class", `${s}-admonition-title`]), v.renderToken(c, f, h);
  }, u = (c) => {
    const f = c.trim().split(" ", 2);
    d = "", a = f[0], f.length > 1 && (d = c.substring(a.length + 2)), (d === "" || !d) && (d = a);
  };
  e2.block.ruler.before(
    "code",
    "admonition",
    (c, f, h, p) => {
      let v, b, y, C = false, $ = c.bMarks[f] + c.tShift[f], T = c.eMarks[f];
      if (r2 !== c.src.charCodeAt($))
        return false;
      for (v = $ + 1; v <= T && t2[(v - $) % n2] === c.src[v]; v++)
        ;
      const I = Math.floor((v - $) / n2);
      if (I !== o)
        return false;
      v -= (v - $) % n2;
      const w = c.src.slice($, v), F = c.src.slice(v, T);
      if (u(F), p)
        return true;
      for (b = f; b++, !(b >= h || ($ = c.bMarks[b] + c.tShift[b], T = c.eMarks[b], $ < T && c.sCount[b] < c.blkIndent)); )
        if (r2 === c.src.charCodeAt($) && !(c.sCount[b] - c.blkIndent >= 4)) {
          for (v = $ + 1; v <= T && t2[(v - $) % n2] === c.src[v]; v++)
            ;
          if (!(Math.floor((v - $) / n2) < I) && (v -= (v - $) % n2, v = c.skipSpaces(v), !(v < T))) {
            C = true;
            break;
          }
        }
      const j = c.parentType, R = c.lineMax;
      return c.parentType = "root", c.lineMax = b, y = c.push("admonition_open", "div", 1), y.markup = w, y.block = true, y.info = a, y.map = [f, b], y = c.push("admonition_title_open", "p", 1), y.markup = w + " " + a, y.map = [f, b], y = c.push("inline", "", 0), y.content = d, y.map = [f, c.line - 1], y.children = [], y = c.push("admonition_title_close", "p", -1), y.markup = w + " " + a, c.md.block.tokenize(c, f + 1, b), y = c.push("admonition_close", "div", -1), y.markup = c.src.slice($, v), y.block = true, c.parentType = j, c.lineMax = R, c.line = b + (C ? 1 : 0), true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  ), e2.renderer.rules.admonition_open = m, e2.renderer.rules.admonition_title_open = m, e2.renderer.rules.admonition_title_close = m, e2.renderer.rules.admonition_close = m;
};
var ao = (e2, l) => {
  let o;
  e2.core.ruler.push("headingLinks", (t2) => {
    o || (o = t2.Token);
  }), e2.renderer.rules.heading_open = (t2, r2) => {
    const n2 = t2[r2], a = t2[r2 + 1].content, d = n2.markup.length;
    return l.headsRef.value.push({
      text: a,
      level: d
    }), n2.map && n2.level === 0 && (n2.attrSet("data-line", String(n2.map[0])), n2.attrSet(
      "id",
      l.mdHeadingId(a, d, l.headsRef.value.length)
    )), e2.renderer.renderToken(t2, r2, l);
  }, e2.renderer.rules.heading_close = (t2, r2, n2, a, d) => d.renderToken(t2, r2, n2);
};
var so = (e2) => {
  [
    "paragraph_open",
    "table_open",
    "ordered_list_open",
    "bullet_list_open",
    "blockquote_open",
    "hr"
  ].forEach((l) => {
    e2.renderer.rules[l] = (o, t2, r2, n2, a) => {
      let d;
      return o[t2].map && o[t2].level === 0 && (d = o[t2].map[0], o[t2].attrSet("data-line", String(d))), a.renderToken(o, t2, r2);
    };
  }), ["html_block", "fence"].forEach((l) => {
    const o = e2.renderer.rules[l];
    e2.renderer.rules[l] = (t2, r2, n2, a, d) => {
      let m;
      const u = o(t2, r2, n2, a, d);
      return t2[r2].map && t2[r2].level === 0 ? (m = t2[r2].map[0], u.replace(/^(<[^>]*)/, `$1 data-line="${m}"`)) : u;
    };
  });
};
var co = (e2) => {
  const { editorConfig: l, markdownItConfig: o } = A, t2 = inject("editorId"), r2 = inject("showCodeRowNumber"), n2 = inject("previewOnly"), a = inject("theme"), d = ref([]), m = Ql(e2), u = to(e2), { reRenderRef: c, replaceMermaid: f } = eo(e2), h = (0, import_markdown_it.default)({
    html: true,
    breaks: true
  });
  h.use(ro, { katexRef: u }), h.use(r, { figcaption: true }), h.use(io), h.use(import_markdown_it_task_lists.default), h.use(ao, { mdHeadingId: e2.mdHeadingId, headsRef: d }), h.use(import_markdown_it_codetabs.default), e2.noMermaid || h.use(lo, { themeRef: a }), h.set({
    highlight: (y, C) => {
      let $;
      !e2.noHighlight && m.value ? m.value.getLanguage(C) ? $ = m.value.highlight(y, {
        language: C,
        ignoreIllegals: true
      }).value : $ = m.value.highlightAuto(y).value : $ = h.utils.escapeHtml(y);
      const T = r2 ? ol($.trim()) : `<span class="code-block">${$.trim()}</span>`;
      return `<pre><code class="language-${C}" language=${C}>${T}</code></pre>`;
    }
  }), so(h), o(h);
  const p = ref(e2.sanitize(h.render(e2.value)));
  k.emit(t2, "buildFinished", p.value), e2.onHtmlChanged(p.value), e2.onGetCatalog(d.value), k.emit(t2, "catalogChanged", d.value), f();
  const v = ve(
    async () => {
      d.value = [], p.value = e2.sanitize(h.render(e2.value)), k.emit(t2, "buildFinished", p.value), e2.onHtmlChanged(p.value), e2.onGetCatalog(d.value), k.emit(t2, "catalogChanged", d.value), f();
    },
    (l == null ? void 0 : l.renderDelay) !== void 0 ? l == null ? void 0 : l.renderDelay : n2 ? 0 : 500
  ), b = computed(() => (e2.noKatex || u.value) && (e2.noHighlight || m.value));
  return watch([toRef(e2, "value"), b, c], v), onMounted(() => {
    k.on(t2, {
      name: "pushCatalog",
      callback() {
        k.emit(t2, "catalogChanged", d.value);
      }
    });
  }), { html: p };
};
var uo = {
  value: {
    type: String,
    default: ""
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  onHtmlChanged: {
    type: Function,
    default: () => {
    }
  },
  onGetCatalog: {
    type: Function,
    default: () => {
    }
  },
  mdHeadingId: {
    type: Function,
    default: () => ""
  },
  noMermaid: {
    type: Boolean,
    default: false
  },
  sanitize: {
    type: Function,
    default: (e2) => e2
  },
  placeholder: {
    type: String,
    default: ""
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean,
    default: false
  },
  scrollAuto: {
    type: Boolean
  },
  formatCopiedText: {
    type: Function,
    default: (e2) => e2
  },
  autofocus: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  readonly: {
    type: Boolean
  },
  maxlength: {
    type: Number
  },
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function,
    default: () => {
    }
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function,
    default: () => {
    }
  },
  noPrettier: {
    type: Boolean
  },
  noHighlight: {
    type: Boolean,
    default: false
  }
};
var mo = defineComponent({
  name: "MDEditorContent",
  props: uo,
  setup(e2) {
    const l = inject("previewOnly"), o = inject("showCodeRowNumber"), t2 = inject("previewTheme"), r2 = inject("editorId"), n2 = ref(), a = ref(), {
      inputWrapperRef: d,
      codeMirrorUt: m
    } = Zl(e2), {
      html: u
    } = co(e2);
    return $l(e2, u, n2, a, m), Yl(e2, u), Jl(e2, u), () => createVNode("div", {
      class: `${s}-content`
    }, [!l && createVNode("div", {
      class: `${s}-input-wrapper`,
      ref: d
    }, null), e2.setting.preview && createVNode("div", {
      id: `${r2}-preview-wrapper`,
      class: `${s}-preview-wrapper`,
      ref: n2,
      key: "content-preview-wrapper"
    }, [createVNode("article", {
      id: `${r2}-preview`,
      class: [`${s}-preview`, `${t2 == null ? void 0 : t2.value}-theme`, o && `${s}-scrn`],
      innerHTML: u.value
    }, null)]), e2.setting.htmlPreview && createVNode("div", {
      class: `${s}-preview-wrapper`,
      ref: a,
      key: "html-preview-wrapper"
    }, [createVNode("div", {
      class: `${s}-html`
    }, [u.value])])]);
  }
});
var fo = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(e2) {
    const l = inject("usedLanguageText");
    return () => {
      var o, t2;
      return createVNode("div", {
        class: `${s}-footer-item`
      }, [createVNode("label", {
        class: `${s}-footer-label`
      }, [`${(o = l.value.footer) == null ? void 0 : o.markdownTotal}:`]), createVNode("span", null, [((t2 = e2.modelValue) == null ? void 0 : t2.length) || 0])]);
    };
  }
});
var go = {
  checked: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  }
};
var ho = defineComponent({
  props: go,
  setup(e2) {
    return () => createVNode("div", {
      class: [`${s}-checkbox`, e2.checked && `${s}-checkbox-checked`],
      onClick: () => {
        e2.onChange(!e2.checked);
      }
    }, null);
  }
});
var vo = {
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  }
};
var po = defineComponent({
  props: vo,
  setup(e2) {
    const l = inject("usedLanguageText");
    return () => {
      var o;
      return createVNode("div", {
        class: `${s}-footer-item`
      }, [createVNode("label", {
        class: `${s}-footer-label`,
        onClick: () => {
          e2.onScrollAutoChange(!e2.scrollAuto);
        }
      }, [(o = l.value.footer) == null ? void 0 : o.scrollAuto]), createVNode(ho, {
        checked: e2.scrollAuto,
        onChange: e2.onScrollAutoChange
      }, null)]);
    };
  }
});
var bo = {
  modelValue: {
    type: String,
    default: ""
  },
  footers: {
    type: Array,
    default: []
  },
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  },
  defFooters: {
    type: Object
  }
};
var ko = defineComponent({
  name: "MDEditorFooter",
  props: bo,
  setup(e2) {
    const l = computed(() => {
      const t2 = e2.footers.indexOf("="), r2 = t2 === -1 ? e2.footers : e2.footers.slice(0, t2), n2 = t2 === -1 ? [] : e2.footers.slice(t2, Number.MAX_SAFE_INTEGER);
      return [r2, n2];
    }), o = (t2) => {
      if (kt.includes(t2))
        switch (t2) {
          case "markdownTotal":
            return createVNode(fo, {
              modelValue: e2.modelValue
            }, null);
          case "scrollSwitch":
            return createVNode(po, {
              scrollAuto: e2.scrollAuto,
              onScrollAutoChange: e2.onScrollAutoChange
            }, null);
        }
      else
        return e2.defFooters instanceof Array ? e2.defFooters[t2] || "" : e2.defFooters && e2.defFooters.children instanceof Array && e2.defFooters.children[t2] || "";
    };
    return () => {
      const t2 = l.value[0].map((n2) => o(n2)), r2 = l.value[1].map((n2) => o(n2));
      return createVNode("div", {
        class: `${s}-footer`
      }, [createVNode("div", {
        class: `${s}-footer-left`
      }, [t2]), createVNode("div", {
        class: `${s}-footer-right`
      }, [r2])]);
    };
  }
});
var yo = {
  tocItem: {
    type: Object,
    default: () => ({})
  },
  mdHeadingId: {
    type: Function,
    default: () => {
    }
  },
  scrollElement: {
    type: [String, Object],
    default: ""
  },
  onClick: {
    type: Function,
    default: () => {
    }
  },
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  }
};
var $t = defineComponent({
  props: yo,
  setup(e2) {
    return () => {
      const {
        tocItem: l,
        mdHeadingId: o,
        scrollElement: t2,
        onClick: r2,
        scrollElementOffsetTop: n2
      } = e2;
      return createVNode("div", {
        class: [`${s}-catalog-link`, l.active && `${s}-catalog-active`],
        onClick: (a) => {
          r2(a, l), a.stopPropagation();
          const d = o(l.text, l.level, l.index), m = document.getElementById(d), u = t2 instanceof Element ? t2 : document.querySelector(t2);
          if (m && u) {
            let c = m.offsetParent, f = m.offsetTop;
            if (u.contains(c))
              for (; c && u != c; )
                f += c == null ? void 0 : c.offsetTop, c = c == null ? void 0 : c.offsetParent;
            u == null || u.scrollTo({
              top: f - n2,
              behavior: "smooth"
            });
          }
        }
      }, [createVNode("span", {
        title: l.text
      }, [l.text]), createVNode("div", {
        class: `${s}-catalog-wrapper`
      }, [l.children && l.children.map((a) => createVNode($t, {
        mdHeadingId: o,
        key: `${l.text}-link-${a.level}-${a.text}`,
        tocItem: a,
        scrollElement: t2,
        onClick: r2,
        scrollElementOffsetTop: n2
      }, null))])]);
    };
  }
});
var Co = {
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
  editorId: {
    type: String
  },
  class: {
    type: String,
    default: ""
  },
  mdHeadingId: {
    type: Function,
    default: (e2) => e2
  },
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object]
  },
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
   *
   * 默认：20px
   */
  offsetTop: {
    type: Number,
    default: 20
  },
  /**
   * 滚动区域的固定顶部高度
   *
   * 默认：0
   */
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  },
  onClick: {
    type: Function
  }
};
var he = defineComponent({
  name: "MdCatalog",
  props: Co,
  emits: ["onClick"],
  setup(e2, l) {
    const o = e2.editorId, t2 = reactive({
      list: [],
      show: false,
      scrollElement: e2.scrollElement || `#${o}-preview-wrapper`
    }), r2 = computed(() => {
      const a = [];
      return t2.list.forEach(({
        text: d,
        level: m,
        active: u
      }, c) => {
        const f = {
          level: m,
          text: d,
          index: c + 1,
          active: !!u
        };
        if (a.length === 0)
          a.push(f);
        else {
          let h = a[a.length - 1];
          if (f.level > h.level)
            for (let p = h.level + 1; p <= 6; p++) {
              const {
                children: v
              } = h;
              if (!v) {
                h.children = [f];
                break;
              }
              if (h = v[v.length - 1], f.level <= h.level) {
                v.push(f);
                break;
              }
            }
          else
            a.push(f);
        }
      }), a;
    });
    onMounted(() => {
      k.on(o, {
        name: "catalogChanged",
        callback: (a) => {
          t2.list = a.map((d, m) => m === 0 ? {
            ...d,
            active: true
          } : {
            ...d
          });
        }
      }), k.emit(o, "pushCatalog");
    });
    const n2 = () => {
      var d;
      const a = t2.scrollElement instanceof HTMLElement ? t2.scrollElement : document.querySelector(t2.scrollElement);
      (d = a === document.documentElement ? window : a) == null || d.addEventListener("scroll", nl(() => {
        if (t2.list.length === 0)
          return false;
        const {
          activeHead: m
        } = t2.list.reduce((u, c, f) => {
          const h = document.getElementById(e2.mdHeadingId(c.text, c.level, f + 1));
          if (h instanceof HTMLElement) {
            const p = rl(h, a);
            if (p < e2.offsetTop && p > u.minTop)
              return {
                activeHead: c,
                minTop: p
              };
          }
          return u;
        }, {
          activeHead: t2.list[0],
          minTop: Number.MIN_SAFE_INTEGER
        });
        t2.list = t2.list.map((u) => u === m ? {
          ...u,
          active: true
        } : {
          ...u,
          active: false
        });
      }));
    };
    return onMounted(() => {
      n2(), k.on(o, {
        name: Ce,
        callback(a) {
          a && nextTick(n2);
        }
      });
    }), () => createVNode("div", {
      class: `${s}-catalog${e2.theme === "dark" ? "-dark" : ""} ${e2.class}`
    }, [r2.value.map((a) => createVNode($t, {
      mdHeadingId: e2.mdHeadingId,
      tocItem: a,
      key: `link-${a.level}-${a.text}`,
      scrollElement: t2.scrollElement,
      onClick: (d, m) => {
        e2.onClick ? e2.onClick(d, m) : l.emit("onClick", d, m);
      },
      scrollElementOffsetTop: e2.scrollElementOffsetTop
    }, null))]);
  }
});
var $o = (e2, l) => {
  const { editorId: o, previewOnly: t2 } = e2, r2 = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ""
  });
  watch(
    () => e2.modelValue,
    () => {
      r2.buildFinished = false;
    }
  ), onMounted(() => {
    t2 || (k.on(o, {
      name: "buildFinished",
      callback(n2) {
        r2.buildFinished = true, r2.html = n2;
      }
    }), k.on(o, {
      name: pe,
      callback() {
        const n2 = new Promise((a) => {
          if (r2.buildFinished)
            a(r2.html);
          else {
            const d = (m) => {
              a(m), k.remove(o, "buildFinished", d);
            };
            k.on(o, {
              name: "buildFinished",
              callback: d
            });
          }
        });
        e2.onSave ? e2.onSave(e2.modelValue, n2) : l.emit("onSave", e2.modelValue, n2);
      }
    }));
  });
};
var wo = (e2) => {
  var n2;
  const { editorId: l, previewOnly: o } = e2, t2 = (n2 = A == null ? void 0 : A.editorExtensions) == null ? void 0 : n2.highlight;
  provide("editorId", l), provide("tabWidth", e2.tabWidth), provide(
    "theme",
    computed(() => e2.theme)
  ), provide(
    "highlight",
    computed(() => {
      const a = {
        ...Ze,
        ...t2 == null ? void 0 : t2.css
      }, d = e2.codeStyleReverse && e2.codeStyleReverseList.includes(e2.previewTheme) ? "dark" : e2.theme;
      return {
        js: (t2 == null ? void 0 : t2.js) || zt,
        css: a[e2.codeTheme] ? a[e2.codeTheme][d] : Ze.atom[d]
      };
    })
  ), provide("previewOnly", o), provide("showCodeRowNumber", e2.showCodeRowNumber);
  const r2 = computed(() => {
    var d;
    const a = {
      ...ze,
      ...(d = A == null ? void 0 : A.editorConfig) == null ? void 0 : d.languageUserDefined
    };
    return a[e2.language] ? a[e2.language] : ze["zh-CN"];
  });
  provide("usedLanguageText", r2), provide(
    "previewTheme",
    computed(() => e2.previewTheme)
  );
};
var To = (e2) => {
  var u, c, f, h, p, v;
  const { noPrettier: l, previewOnly: o, noIconfont: t2, noUploadImg: r2 } = e2, { editorExtensions: n2 } = A, a = l || !!((c = (u = A.editorExtensions) == null ? void 0 : u.prettier) != null && c.prettierInstance), d = l || !!((h = (f = A.editorExtensions) == null ? void 0 : f.prettier) != null && h.parserMarkdownInstance), m = r2 || !!((v = (p = A.editorExtensions) == null ? void 0 : p.cropper) != null && v.instance);
  onMounted(() => {
    var I, w, F, j;
    const b = document.createElement("script");
    b.src = (n2 == null ? void 0 : n2.iconfont) || Kt, b.id = `${s}-icon`;
    const y = document.createElement("script"), C = document.createElement("script");
    y.src = ((I = n2 == null ? void 0 : n2.prettier) == null ? void 0 : I.standaloneJs) || We.main, y.id = `${s}-prettier`, C.src = ((w = n2 == null ? void 0 : n2.prettier) == null ? void 0 : w.parserMarkdownJs) || We.markdown, C.id = `${s}-prettierMD`;
    const $ = document.createElement("link");
    $.rel = "stylesheet", $.href = ((F = n2 == null ? void 0 : n2.cropper) == null ? void 0 : F.css) || Ke.css, $.id = `${s}-cropperCss`;
    const T = document.createElement("script");
    T.src = ((j = n2 == null ? void 0 : n2.cropper) == null ? void 0 : j.js) || Ke.js, T.id = `${s}-cropper`, t2 || V(b), o || (m || (V($), V(T)), a || V(y), d || V(C));
  });
};
var So = (e2, l) => {
  const { editorId: o, previewOnly: t2 } = e2, r2 = reactive({
    pageFullscreen: e2.pageFullscreen,
    fullscreen: false,
    preview: e2.preview,
    htmlPreview: e2.preview ? false : e2.htmlPreview
  }), n2 = (m, u) => {
    r2[m] = u === void 0 ? !r2[m] : u, m === "preview" && r2.preview ? r2.htmlPreview = false : m === "htmlPreview" && r2.htmlPreview && (r2.preview = false);
  };
  let a = "";
  const d = () => {
    r2.pageFullscreen || r2.fullscreen ? document.body.style.overflow = "hidden" : document.body.style.overflow = a;
  };
  return watch(() => [r2.pageFullscreen, r2.fullscreen], d), onMounted(() => {
    t2 || k.on(o, {
      name: "uploadImage",
      callback(m, u) {
        const c = (f) => {
          k.emit(o, "replace", "image", {
            desc: "",
            urls: f
          }), u && u();
        };
        e2.onUploadImg ? e2.onUploadImg(m, c) : l.emit("onUploadImg", m, c);
      }
    }), a = document.body.style.overflow, d();
  }), [r2, n2];
};
var xo = (e2) => {
  const { editorId: l } = e2, o = ref(false);
  onMounted(() => {
    k.on(l, {
      name: Le,
      callback: (r2) => {
        r2 === void 0 ? o.value = !o.value : o.value = r2;
      }
    });
  });
  const t2 = computed(() => !e2.toolbarsExclude.includes("catalog") && e2.toolbars.includes("catalog"));
  return [o, t2];
};
var Eo = (e2, l, o, t2, r2) => {
  const { editorId: n2 } = e2;
  watch(
    () => t2.pageFullscreen,
    (d) => {
      k.emit(n2, Je, d);
    }
  ), watch(
    () => t2.fullscreen,
    (d) => {
      k.emit(n2, Ye, d);
    }
  ), watch(
    () => t2.preview,
    (d) => {
      k.emit(n2, Ce, d);
    }
  ), watch(
    () => t2.htmlPreview,
    (d) => {
      k.emit(n2, Qe, d);
    }
  ), watch(o, (d) => {
    k.emit(n2, et, d);
  });
  const a = {
    on(d, m) {
      switch (d) {
        case "pageFullscreen": {
          k.on(n2, {
            name: Je,
            callback(u) {
              m(u);
            }
          });
          break;
        }
        case "fullscreen": {
          k.on(n2, {
            name: Ye,
            callback(u) {
              m(u);
            }
          });
          break;
        }
        case "preview": {
          k.on(n2, {
            name: Ce,
            callback(u) {
              m(u);
            }
          });
          break;
        }
        case "htmlPreview": {
          k.on(n2, {
            name: Qe,
            callback(u) {
              m(u);
            }
          });
          break;
        }
        case "catalog": {
          k.on(n2, {
            name: et,
            callback(u) {
              m(u);
            }
          });
          break;
        }
      }
    },
    togglePageFullscreen(d) {
      r2("pageFullscreen", d);
    },
    toggleFullscreen(d) {
      k.emit(n2, yt, d);
    },
    togglePreview(d) {
      r2("preview", d);
    },
    toggleHtmlPreview(d) {
      r2("htmlPreview", d);
    },
    toggleCatalog(d) {
      k.emit(n2, Le, d);
    },
    triggerSave() {
      k.emit(n2, pe);
    },
    insert(d) {
      k.emit(n2, "replace", "universal", { generate: d });
    },
    focus() {
      k.emit(n2, Ct);
    }
  };
  l.expose(a);
};
var Lo = (e2) => e2;
var Ao = {
  /**
   * 主题
   *
   * @default 'light'
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ""
  },
  /**
   * input回调事件
   */
  onChange: {
    type: Function
  },
  /**
   * input回调事件
   */
  onSave: {
    type: Function
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function
  },
  /**
   * 是否页面内全屏
   *
   * @default false
   */
  pageFullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 是否展开预览
   *
   * @default true
   */
  preview: {
    type: Boolean,
    default: true
  },
  /**
   * 是否展开html预览
   *
   * @default false
   */
  htmlPreview: {
    type: Boolean,
    default: false
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @default false
   */
  previewOnly: {
    type: Boolean,
    default: false
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String,
    default: "zh-CN"
  },
  /**
   * 工具栏选择显示
   *
   * @default allToolbar
   */
  toolbars: {
    type: Array,
    default: bt
  },
  /**
   * 工具栏选择不显示
   *
   * @default []
   */
  toolbarsExclude: {
    type: Array,
    default: []
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean,
    default: false
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String,
    default: Wt
  },
  /**
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number,
    default: 2
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default false
   */
  showCodeRowNumber: {
    type: Boolean,
    default: false
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String,
    default: "default"
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标题的id生成方式
   *
   * @default (text: string) => text
   */
  mdHeadingId: {
    type: Function,
    default: Lo
  },
  /**
   * 表格预设格子数
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  /**
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean,
    default: false
  },
  /**
   *
   * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
   * 推荐DOMPurify、sanitize-html
   *
   * @default (text: string) => text
   */
  sanitize: {
    type: Function,
    default: (e2) => e2
  },
  /**
   * 空提示
   *
   * @default ''
   */
  placeholder: {
    type: String,
    default: ""
  },
  /**
   * 不使用katex
   *
   * @default false
   */
  noKatex: {
    type: Boolean,
    default: false
  },
  /**
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object]
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String,
    default: "atom"
  },
  /**
   * 页脚列表显示顺序
   */
  footers: {
    type: Array,
    default: kt
  },
  /**
   * 是否默认激活输入框和预览框同步滚动
   *
   * @default true
   */
  scrollAuto: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义的也叫工具组件列表
   */
  defFooters: {
    type: [String, Object]
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean
  },
  /**
   * 复制代码格式化方法
   *
   * @default (text) => text
   */
  formatCopiedText: {
    type: Function,
    default: (e2) => e2
  },
  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array,
    default: ["default", "mk-cute"]
  },
  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number
  },
  /**
   * 是否启用自动识别粘贴代码类别
   * 目前支持 vscode 复制的代码识别
   *
   * @default false
   */
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function
  },
  noHighlight: {
    type: Boolean,
    default: false
  }
};
var Io = [
  "onChange",
  "onSave",
  "onUploadImg",
  "onHtmlChanged",
  "onGetCatalog",
  "onError",
  "update:modelValue",
  "onBlur",
  "onFocus"
];
var J = defineComponent({
  name: "MdEditorV3",
  props: Ao,
  emits: Io,
  setup(e2, l) {
    const {
      editorId: o,
      previewOnly: t2,
      noKatex: r2,
      noMermaid: n2,
      noPrettier: a,
      noUploadImg: d,
      noHighlight: m
    } = e2, u = reactive({
      scrollAuto: e2.scrollAuto
    });
    $o(e2, l), wo(e2), To(e2);
    const [c, f] = So(e2, l), [h, p] = xo(e2);
    return onBeforeUnmount(() => {
      k.clear(o);
    }), Eo(e2, l, h, c, f), () => {
      var y;
      const v = G({
        props: e2,
        ctx: l
      }, "defToolbars"), b = G({
        props: e2,
        ctx: l
      }, "defFooters");
      return createVNode("div", {
        id: o,
        class: [s, e2.class, e2.theme === "dark" && `${s}-dark`, c.fullscreen || c.pageFullscreen ? `${s}-fullscreen` : "", t2 && `${s}-previewOnly`],
        style: e2.style
      }, [!t2 && createVNode(kl, {
        noPrettier: a,
        toolbars: e2.toolbars,
        toolbarsExclude: e2.toolbarsExclude,
        setting: c,
        updateSetting: f,
        tableShape: e2.tableShape,
        defToolbars: v,
        noUploadImg: d
      }, null), createVNode(mo, {
        value: e2.modelValue,
        setting: c,
        mdHeadingId: e2.mdHeadingId,
        noMermaid: n2,
        noPrettier: a,
        sanitize: e2.sanitize,
        placeholder: e2.placeholder,
        noKatex: r2,
        scrollAuto: u.scrollAuto,
        formatCopiedText: e2.formatCopiedText,
        autofocus: e2.autoFocus,
        disabled: e2.disabled,
        readonly: e2.readOnly,
        maxlength: e2.maxLength,
        autoDetectCode: e2.autoDetectCode,
        noHighlight: m,
        onChange: (C) => {
          e2.onChange ? e2.onChange(C) : (l.emit("update:modelValue", C), l.emit("onChange", C));
        },
        onHtmlChanged: (C) => {
          e2.onHtmlChanged ? e2.onHtmlChanged(C) : l.emit("onHtmlChanged", C);
        },
        onGetCatalog: (C) => {
          e2.onGetCatalog ? e2.onGetCatalog(C) : l.emit("onGetCatalog", C);
        },
        onBlur: (C) => {
          e2.onBlur ? e2.onBlur(C) : l.emit("onBlur", C);
        },
        onFocus: (C) => {
          e2.onFocus ? e2.onFocus(C) : l.emit("onFocus", C);
        }
      }, null), !t2 && ((y = e2.footers) == null ? void 0 : y.length) > 0 && createVNode(ko, {
        modelValue: e2.modelValue,
        footers: e2.footers,
        defFooters: b,
        scrollAuto: u.scrollAuto,
        onScrollAutoChange: (C) => u.scrollAuto = C
      }, null), p.value && !t2 && createVNode(he, {
        theme: e2.theme,
        style: {
          display: h.value ? "block" : "none"
        },
        class: `${s}-catalog-editor`,
        editorId: o,
        mdHeadingId: e2.mdHeadingId
      }, null)]);
    };
  }
});
var Ho = {
  title: {
    type: String,
    default: ""
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  }
};
var $e = defineComponent({
  name: "NormalToolbar",
  props: Ho,
  emits: ["onClick"],
  setup(e2, l) {
    return () => {
      const o = G({
        props: e2,
        ctx: l
      }, "trigger");
      return createVNode("div", {
        class: `${s}-toolbar-item`,
        title: e2.title,
        onClick: (t2) => {
          e2.onClick instanceof Function ? e2.onClick(t2) : l.emit("onClick", t2);
        }
      }, [o]);
    };
  }
});
var Fo = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onChange: {
    type: Function
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object]
  }
};
var we = defineComponent({
  name: "DropdownToolbar",
  props: Fo,
  emits: ["onChange"],
  setup(e2, l) {
    const o = inject("editorId");
    return () => {
      const t2 = G({
        props: e2,
        ctx: l
      }, "trigger"), r2 = G({
        props: e2,
        ctx: l
      }, "overlay");
      return createVNode(oe, {
        relative: `#${o}-toolbar-wrapper`,
        visible: e2.visible,
        onChange: (n2) => {
          e2.onChange instanceof Function ? e2.onChange(n2) : l.emit("onChange", n2);
        },
        overlay: r2
      }, {
        default: () => [createVNode("div", {
          class: `${s}-toolbar-item`,
          title: e2.title || ""
        }, [t2])]
      });
    };
  }
});
function Mo(e2) {
  return typeof e2 == "function" || Object.prototype.toString.call(e2) === "[object Object]" && !isVNode(e2);
}
var Bo = {
  title: {
    type: String,
    default: ""
  },
  modalTitle: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  },
  onClose: {
    type: Function
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function
  }
};
var Te = defineComponent({
  name: "ModalToolbar",
  props: Bo,
  emits: ["onClick", "onClose", "onAdjust"],
  setup(e2, l) {
    return () => {
      const o = G({
        props: e2,
        ctx: l
      }, "trigger"), t2 = G({
        props: e2,
        ctx: l
      }, "default");
      return createVNode(Fragment, null, [createVNode("div", {
        class: `${s}-toolbar-item`,
        title: e2.title,
        onClick: () => {
          e2.onClick instanceof Function ? e2.onClick() : l.emit("onClick");
        }
      }, [o]), createVNode(Ae, {
        width: e2.width,
        height: e2.height,
        title: e2.modalTitle,
        visible: e2.visible,
        onClose: () => {
          e2.onClose instanceof Function ? e2.onClose() : l.emit("onClose");
        },
        showAdjust: e2.showAdjust,
        isFullscreen: e2.isFullscreen,
        onAdjust: (r2) => {
          e2.onAdjust instanceof Function ? e2.onAdjust(r2) : l.emit("onAdjust", r2);
        }
      }, Mo(t2) ? t2 : {
        default: () => [t2]
      })]);
    };
  }
});
J.install = (e2) => (e2.component(J.name, J), e2.component($e.name, $e), e2.component(we.name, we), e2.component(he.name, he), e2.component(Te.name, Te), e2);
J.NormalToolbar = $e;
J.DropdownToolbar = we;
J.MdCatalog = he;
J.ModalToolbar = Te;
J.config = Jt;
export {
  J as default
};
/*! Bundled license information:

medium-zoom/dist/medium-zoom.esm.js:
  (*! medium-zoom 1.0.8 | MIT License | https://github.com/francoischalifour/medium-zoom *)
*/
//# sourceMappingURL=md-editor-v3.js.map
