(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vscode-languageserver-types/main',["require", "exports"], factory);
  }
})(function (require, exports) {
  /* --------------------------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License. See License.txt in the project root for license information.
   * ------------------------------------------------------------------------------------------ */
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * The Position namespace provides helper functions to work with
   * [Position](#Position) literals.
   */
  var Position;
  (function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
      return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
  })(Position = exports.Position || (exports.Position = {}));

  /**
   * The Range namespace provides helper functions to work with
   * [Range](#Range) literals.
   */
  var Range;
  (function (Range) {
    function create(one, two, three, four) {
      if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
        return { start: Position.create(one, two), end: Position.create(three, four) };
      }
      if (Position.is(one) && Position.is(two)) {
        return { start: one, end: two };
      }

      throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
  })(Range = exports.Range || (exports.Range = {}));

  /**
   * The Location namespace provides helper functions to work with
   * [Location](#Location) literals.
   */
  var Location;
  (function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
  })(Location = exports.Location || (exports.Location = {}));

  /**
   * The Color namespace provides helper functions to work with
   * [Color](#Color) literals.
   */
  var Color;
  (function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
      return {
        red: red,
        green: green,
        blue: blue,
        alpha: alpha,
      };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.number(candidate.red)
        && Is.number(candidate.green)
        && Is.number(candidate.blue)
        && Is.number(candidate.alpha);
    }
    Color.is = is;
  })(Color = exports.Color || (exports.Color = {}));

  /**
   * The ColorInformation namespace provides helper functions to work with
   * [ColorInformation](#ColorInformation) literals.
   */
  var ColorInformation;
  (function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
      return {range: range, color: color,};
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the
     * [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
      var candidate = value;
      return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
  })(ColorInformation = exports.ColorInformation || (exports.ColorInformation = {}));

  /**
   * The Color namespace provides helper functions to work with
   * [ColorPresentation](#ColorPresentation) literals.
   */
  var ColorPresentation;
  (function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
      return {
        label: label,
        textEdit: textEdit,
        additionalTextEdits: additionalTextEdits,
      };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the
     * [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.string(candidate.label)
        && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
        && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
  })(ColorPresentation = exports.ColorPresentation || (exports.ColorPresentation = {}));

  /**
   * Enum of known range kinds
   */
  var FoldingRangeKind;
  (function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
  })(FoldingRangeKind = exports.FoldingRangeKind || (exports.FoldingRangeKind = {}));
  
  /**
   * The folding range namespace provides helper functions to work with
   * [FoldingRange](#FoldingRange) literals.
   */
  var FoldingRange;
  (function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
      var result = {
        startLine: startLine,
        endLine: endLine
      };
      if (Is.defined(startCharacter)) {
        result.startCharacter = startCharacter;
      }
      if (Is.defined(endCharacter)) {
        result.endCharacter = endCharacter;
      }
      if (Is.defined(kind)) {
        result.kind = kind;
      }
      return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.number(candidate.startLine) && Is.number(candidate.startLine)
        && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter))
        && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter))
        && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
  })(FoldingRange = exports.FoldingRange || (exports.FoldingRange = {}));

  /**
   * The DiagnosticRelatedInformation namespace provides helper functions to work with
   * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
   */
  var DiagnosticRelatedInformation;
  (function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
      return {location: location, message: message, };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
  })(DiagnosticRelatedInformation = exports.DiagnosticRelatedInformation || (exports.DiagnosticRelatedInformation = {}));

  /**
   * The diagnostic's severity.
   */
  var DiagnosticSeverity;
  (function (DiagnosticSeverity) {
    // Reports an error.
    DiagnosticSeverity.Error = 1;
    // Reports a warning.
    DiagnosticSeverity.Warning = 2;
    // Reports an information.
    DiagnosticSeverity.Information = 3;
    // Reports a hint.
    DiagnosticSeverity.Hint = 4;
  })(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));

  /**
   * The Diagnostic namespace provides helper functions to work with
   * [Diagnostic](#Diagnostic) literals.
   */
  var Diagnostic;
  (function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
      var result = { range: range, message: message };
      if (Is.defined(severity)) {
        result.severity = severity;
      }
      if (Is.defined(code)) {
        result.code = code;
      }
      if (Is.defined(source)) {
        result.source = source;
      }
      if (Is.defined(relatedInformation)) {
        result.relatedInformation = relatedInformation;
      }
      return result;
    }

    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Range.is(candidate.range)
        && Is.string(candidate.message)
        && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
        && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
        && (Is.string(candidate.source) || Is.undefined(candidate.source))
        && (Is.undefined(candidate.relatedInformation)
            || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
  })(Diagnostic = exports.Diagnostic || (exports.Diagnostic = {}));

  /**
   * The Command namespace provides helper functions to work with
   * [Command](#Command) literals.
   */
  var Command;
  (function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var result = { title: title, command: command };
      if (Is.defined(args) && args.length > 0) {
        result.arguments = args;
      }
      return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
  })(Command = exports.Command || (exports.Command = {}));

  /**
   * The TextEdit namespace provides helper function to create replace,
   * insert and delete edits more easily.
   */
  var TextEdit;
  (function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
      return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
      return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
      return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
    }
    TextEdit.is = is;
  })(TextEdit = exports.TextEdit || (exports.TextEdit = {}));

  /**
   * The TextDocumentEdit namespace provides helper function to create
   * an edit that manipulates a text document.
   */
  var TextDocumentEdit;
  (function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
      return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && VersionedTextDocumentIdentifier.is(candidate.textDocument)
        && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
  })(TextDocumentEdit = exports.TextDocumentEdit || (exports.TextDocumentEdit = {}));

  var WorkspaceEdit;
  (function (WorkspaceEdit) {
    function is(value) {
      var candidate = value;
      return candidate &&
        (candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
        (candidate.documentChanges === void 0 || Is.typedArray(candidate.documentChanges, TextDocumentEdit.is));
    }
    WorkspaceEdit.is = is;
  })(WorkspaceEdit = exports.WorkspaceEdit || (exports.WorkspaceEdit = {}));

  var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
      this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
      this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
      this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
      this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
      this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
      return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
      this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
  }());

  /**
   * A workspace change helps constructing changes to a workspace.
   */
  var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
      var _this = this;
      this._textEditChanges = Object.create(null);
      if (workspaceEdit) {
        this._workspaceEdit = workspaceEdit;
        if (workspaceEdit.documentChanges) {
          workspaceEdit.documentChanges.forEach(function (textDocumentEdit) {
            var textEditChange = new TextEditChangeImpl(textDocumentEdit.edits);
            _this._textEditChanges[textDocumentEdit.textDocument.uri] = textEditChange;
          });
        }
        else if (workspaceEdit.changes) {
          Object.keys(workspaceEdit.changes).forEach(function (key) {
            var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
            _this._textEditChanges[key] = textEditChange;
          });
        }
      }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
      /**
       * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
       * use to be returned from a workspace edit operation like rename.
       */
      get: function () {return this._workspaceEdit;},
      enumerable: true,
      configurable: true
    });

    WorkspaceChange.prototype.getTextEditChange = function (key) {
      if (VersionedTextDocumentIdentifier.is(key)) {
        if (!this._workspaceEdit) {
          this._workspaceEdit = {
              documentChanges: []
          };
        }
        if (!this._workspaceEdit.documentChanges) {
            throw new Error('Workspace edit is not configured for versioned document changes.');
        }
        var textDocument = key;
        var result = this._textEditChanges[textDocument.uri];
        if (!result) {
          var edits = [];
          var textDocumentEdit = {
              textDocument: textDocument,
              edits: edits
          };
          this._workspaceEdit.documentChanges.push(textDocumentEdit);
          result = new TextEditChangeImpl(edits);
          this._textEditChanges[textDocument.uri] = result;
        }
        return result;
      }
      else {
        if (!this._workspaceEdit) {
          this._workspaceEdit = {
              changes: Object.create(null)
          };
        }
        if (!this._workspaceEdit.changes) {
          throw new Error('Workspace edit is not configured for normal text edit changes.');
        }
        var result = this._textEditChanges[key];
        if (!result) {
          var edits = [];
          this._workspaceEdit.changes[key] = edits;
          result = new TextEditChangeImpl(edits);
          this._textEditChanges[key] = result;
        }
        return result;
      }
    };
    return WorkspaceChange;
  }());

  exports.WorkspaceChange = WorkspaceChange;

  /**
   * The TextDocumentIdentifier namespace provides helper functions to work with
   * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
   */
  var TextDocumentIdentifier;
  (function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
      return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
  })(TextDocumentIdentifier = exports.TextDocumentIdentifier || (exports.TextDocumentIdentifier = {}));

  /**
   * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
   * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
   */
  var VersionedTextDocumentIdentifier;
  (function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
      return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.number(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
  })(VersionedTextDocumentIdentifier = exports.VersionedTextDocumentIdentifier || (exports.VersionedTextDocumentIdentifier = {}));

  /**
   * The TextDocumentItem namespace provides helper functions to work with
   * [TextDocumentItem](#TextDocumentItem) literals.
   */
  var TextDocumentItem;
  (function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
      return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Is.string(candidate.uri)
        && Is.string(candidate.languageId)
        && Is.number(candidate.version)
        && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
  })(TextDocumentItem = exports.TextDocumentItem || (exports.TextDocumentItem = {}));

  /**
   * Describes the content type that a client supports in various
   * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
   *
   * Please note that `MarkupKinds` must not start with a `$`. This kinds
   * are reserved for internal usage.
   */
  var MarkupKind;
  (function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
  })(MarkupKind = exports.MarkupKind || (exports.MarkupKind = {}));

  (function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
      var candidate = value;
      return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
  })(MarkupKind = exports.MarkupKind || (exports.MarkupKind = {}));

  var MarkupContent;
  (function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(value)
        && MarkupKind.is(candidate.kind)
        && Is.string(candidate.value);
    }
    MarkupContent.is = is;
  })(MarkupContent = exports.MarkupContent || (exports.MarkupContent = {}));

  /**
   * The kind of a completion entry.
   */
  var CompletionItemKind;
  (function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
  })(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));

  /**
   * Defines whether the insert text in a completion item should be interpreted as
   * plain text or a snippet.
   */
  var InsertTextFormat;
  (function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
  })(InsertTextFormat = exports.InsertTextFormat || (exports.InsertTextFormat = {}));

  /**
   * The CompletionItem namespace provides functions to deal with
   * completion items.
   */
  var CompletionItem;
  (function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
      return { label: label };
    }
    CompletionItem.create = create;
  })(CompletionItem = exports.CompletionItem || (exports.CompletionItem = {}));

  /**
   * The CompletionList namespace provides functions to deal with
   * completion lists.
   */
  var CompletionList;
  (function (CompletionList) {
    /**
     * Creates a new completion list.
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
  })(CompletionList = exports.CompletionList || (exports.CompletionList = {}));

  var MarkedString;
  (function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
      // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
      return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
      var candidate = value;
      return Is.string(candidate)
        || (Is.objectLiteral(candidate)
            && Is.string(candidate.language)
            && Is.string(candidate.value));
    }
    MarkedString.is = is;
  })(MarkedString = exports.MarkedString || (exports.MarkedString = {}));

  var Hover;
  (function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate)
        && (MarkupContent.is(candidate.contents)
            || MarkedString.is(candidate.contents)
            || Is.typedArray(candidate.contents, MarkedString.is))
        && (value.range === void 0
            || Range.is(value.range));
    }
    Hover.is = is;
  })(Hover = exports.Hover || (exports.Hover = {}));

  /**
   * The ParameterInformation namespace provides helper functions to work with
   * [ParameterInformation](#ParameterInformation) literals.
   */
  var ParameterInformation;
  (function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
      return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
  })(ParameterInformation = exports.ParameterInformation || (exports.ParameterInformation = {}));

  /**
   * The SignatureInformation namespace provides helper functions to work with
   * [SignatureInformation](#SignatureInformation) literals.
   */
  var SignatureInformation;
  (function (SignatureInformation) {
    function create(label, documentation) {
      var parameters = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        parameters[_i - 2] = arguments[_i];
      }
      var result = { label: label };
      if (Is.defined(documentation)) {
        result.documentation = documentation;
      }
      if (Is.defined(parameters)) {
        result.parameters = parameters;
      }
      else {
        result.parameters = [];
      }
      return result;
    }
    SignatureInformation.create = create;
  })(SignatureInformation = exports.SignatureInformation || (exports.SignatureInformation = {}));

  /**
   * A document highlight kind.
   */
  var DocumentHighlightKind;
  (function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
  })(DocumentHighlightKind = exports.DocumentHighlightKind || (exports.DocumentHighlightKind = {}));

  /**
   * DocumentHighlight namespace to provide helper functions to work with
   * [DocumentHighlight](#DocumentHighlight) literals.
   */
  var DocumentHighlight;
  (function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
      var result = { range: range };
      if (Is.number(kind)) {
        result.kind = kind;
      }
      return result;
    }
    DocumentHighlight.create = create;
  })(DocumentHighlight = exports.DocumentHighlight || (exports.DocumentHighlight = {}));

  /**
   * A symbol kind.
   */
  var SymbolKind;
  (function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
  })(SymbolKind = exports.SymbolKind || (exports.SymbolKind = {}));

  var SymbolInformation;
  (function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
      var result = {
        name: name,
        kind: kind,
        location: { uri: uri, range: range }
      };
      if (containerName) {
        result.containerName = containerName;
      }
      return result;
    }
    SymbolInformation.create = create;
  })(SymbolInformation = exports.SymbolInformation || (exports.SymbolInformation = {}));

  /**
   * Represents programming constructs like variables, classes, interfaces etc.
   * that appear in a document. Document symbols can be hierarchical and they
   * have two ranges: one that encloses its definition and one that points to
   * its most interesting range, e.g. the range of an identifier.
   */
  var DocumentSymbol = /** @class */ (function () {
    function DocumentSymbol() {}
    return DocumentSymbol;
  }());

  exports.DocumentSymbol = DocumentSymbol;

  (function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
      var result = {
        name: name,
        detail: detail,
        kind: kind,
        range: range,
        selectionRange: selectionRange
      };
      if (children !== void 0) {
        result.children = children;
      }
      return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
      var candidate = value;
      return candidate &&
        Is.string(candidate.name) && Is.number(candidate.kind) &&
        Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
        (candidate.detail === void 0 || Is.string(candidate.detail)) &&
        (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
        (candidate.children === void 0 || Array.isArray(candidate.children));
    }
    DocumentSymbol.is = is;
  })(DocumentSymbol = exports.DocumentSymbol || (exports.DocumentSymbol = {}));

  exports.DocumentSymbol = DocumentSymbol;

  /**
   * A set of predefined code action kinds
   */
  var CodeActionKind;
  (function (CodeActionKind) {
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
  })(CodeActionKind = exports.CodeActionKind || (exports.CodeActionKind = {}));

  /**
   * The CodeActionContext namespace provides helper functions to work with
   * [CodeActionContext](#CodeActionContext) literals.
   */
  var CodeActionContext;
  (function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
      var result = { diagnostics: diagnostics };
      if (only !== void 0 && only !== null) {
        result.only = only;
      }
      return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Is.typedArray(candidate.diagnostics, Diagnostic.is)
        && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
  })(CodeActionContext = exports.CodeActionContext || (exports.CodeActionContext = {}));

  var CodeAction;
  (function (CodeAction) {
    function create(title, commandOrEdit, kind) {
      var result = { title: title };
      if (Command.is(commandOrEdit)) {
        result.command = commandOrEdit;
      }
      else {
        result.edit = commandOrEdit;
      }
      if (kind !== void null) {
        result.kind = kind;
      }
      return result;
    }
    CodeAction.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.title) &&
        (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
        (candidate.kind === void 0 || Is.string(candidate.kind)) &&
        (candidate.edit !== void 0 || candidate.command !== void 0) &&
        (candidate.command === void 0 || Command.is(candidate.command)) &&
        (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
  })(CodeAction = exports.CodeAction || (exports.CodeAction = {}));

  /**
   * The CodeLens namespace provides helper functions to work with
   * [CodeLens](#CodeLens) literals.
   */
  var CodeLens;
  (function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
      var result = { range: range };
      if (Is.defined(data))
        result.data = data;
      return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Range.is(candidate.range)
        && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
  })(CodeLens = exports.CodeLens || (exports.CodeLens = {}));

  /**
   * The FormattingOptions namespace provides helper functions to work with
   * [FormattingOptions](#FormattingOptions) literals.
   */
  var FormattingOptions;
  (function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
      return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Is.number(candidate.tabSize)
        && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
  })(FormattingOptions = exports.FormattingOptions || (exports.FormattingOptions = {}));

  /**
   * A document link is a range in a text document that links to an internal or external resource, like another
   * text document or a web site.
   */
  var DocumentLink = /** @class */ (function () {
    function DocumentLink() {
    }
    return DocumentLink;
  }());
  exports.DocumentLink = DocumentLink;

  /**
   * The DocumentLink namespace provides helper functions to work with
   * [DocumentLink](#DocumentLink) literals.
   */
  (function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
      return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
  })(DocumentLink = exports.DocumentLink || (exports.DocumentLink = {}));

  exports.DocumentLink = DocumentLink;
  exports.EOL = ['\n', '\r\n', '\r'];

  var TextDocument;
  (function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
      var candidate = value;
      return Is.defined(candidate)
        && Is.string(candidate.uri)
        && (Is.undefined(candidate.languageId)
            || Is.string(candidate.languageId))
        && Is.number(candidate.lineCount)
        && Is.func(candidate.getText)
        && Is.func(candidate.positionAt)
        && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;

    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort(edits, function (a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = text.length;
      for (var i = sortedEdits.length - 1; i >= 0; i--) {
        var e = sortedEdits[i];
        var startOffset = document.offsetAt(e.range.start);
        var endOffset = document.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        }
        else {
          throw new Error('Ovelapping edit');
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument.applyEdits = applyEdits;

    function mergeSort(data, compare) {
      if (data.length <= 1) {
        // sorted
        return data;
      }
      var p = (data.length / 2) | 0;
      var left = data.slice(0, p);
      var right = data.slice(p);
      mergeSort(left, compare);
      mergeSort(right, compare);
      var leftIdx = 0;
      var rightIdx = 0;
      var i = 0;
      while (leftIdx < left.length && rightIdx < right.length) {
        var ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
          // smaller_equal -> take left to preserve order
          data[i++] = left[leftIdx++];
        }
        else {
          // greater -> take right
          data[i++] = right[rightIdx++];
        }
      }
      while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
      }
      while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
      }
      return data;
    }
  })(TextDocument = exports.TextDocument || (exports.TextDocument = {}));

  /**
   * Represents reasons why a text document is saved.
   */
  var TextDocumentSaveReason;
  (function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
  })(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));

  var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
      get: function () {return this._uri;},
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
      get: function () {return this._languageId;},
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {return this._version;},
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };

    FullTextDocument.prototype.update = function (event, version) {
      this._content = event.text;
      this._version = version;
      this._lineOffsets = null;
    };

    FullTextDocument.prototype.getLineOffsets = function () {
      if (this._lineOffsets === null) {
        var lineOffsets = [];
        var text = this._content;
        var isLineStart = true;
        for (var i = 0; i < text.length; i++) {
          if (isLineStart) {
            lineOffsets.push(i);
            isLineStart = false;
          }
          var ch = text.charAt(i);
          isLineStart = (ch === '\r' || ch === '\n');
          if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
            i++;
          }
        }
        if (isLineStart && text.length > 0) {
          lineOffsets.push(text.length);
        }
        this._lineOffsets = lineOffsets;
      }
      return this._lineOffsets;
    };

    FullTextDocument.prototype.positionAt = function (offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return Position.create(0, offset);
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        }
        else {
          low = mid + 1;
        }
      }
      // low is the least x for which the line offset is larger than the current offset
      // or array.length if no line offset is larger than the current offset
      var line = low - 1;
      return Position.create(line, offset - lineOffsets[line]);
    };

    FullTextDocument.prototype.offsetAt = function (position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      }
      if (position.line < 0) {
          return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };

    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
  }());

  var Is;
  (function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
      return typeof value !== 'undefined';
    }
    Is.defined = defined;

    function undefined(value) {
      return typeof value === 'undefined';
    }
    Is.undefined = undefined;

    function boolean(value) {
      return value === true || value === false;
    }
    Is.boolean = boolean;

    function string(value) {
      return toString.call(value) === '[object String]';
    }
    Is.string = string;

    function number(value) {
      return toString.call(value) === '[object Number]';
    }
    Is.number = number;

    function func(value) {
      return toString.call(value) === '[object Function]';
    }
    Is.func = func;

    function objectLiteral(value) {
      // Strictly speaking class instances pass this check as well. Since the LSP
      // doesn't use classes we ignore this for now. If we do we need to add something
      // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
      return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;

    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
  })(Is || (Is = {}));
});

define(
  'vscode-languageserver-types',
  [
    'vscode-languageserver-types/main'
  ],
  function (main) { return main; }
);

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) {
      module.exports = v;
    }
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'jsonc-parser/impl/scanner',
      [
        "require",
        "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Creates a JSON scanner on the given text.
   * If ignoreTrivia is set, whitespaces or comments are ignored.
   */
  function createScanner(text, ignoreTrivia) {
    if (ignoreTrivia === void 0) {
      ignoreTrivia = false;
    }

    var pos = 0, len = text.length, value = '', tokenOffset = 0, token = 16 /* Unknown */, scanError = 0 /* None */;
    function scanHexDigits(count, exact) {
      var digits = 0;
      var value = 0;
      while (digits < count || !exact) {
        var ch = text.charCodeAt(pos);
        if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
          value = value * 16 + ch - 48 /* _0 */;
        }
        else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
          value = value * 16 + ch - 65 /* A */ + 10;
        }
        else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
          value = value * 16 + ch - 97 /* a */ + 10;
        }
        else {
          break;
        }
        pos++;
        digits++;
      }
      if (digits < count) {
        value = -1;
      }
      return value;
    }

    function setPosition(newPosition) {
      pos = newPosition;
      value = '';
      tokenOffset = 0;
      token = 16 /* Unknown */;
      scanError = 0 /* None */;
    }

    function scanNumber() {
      var start = pos;
      if (text.charCodeAt(pos) === 48 /* _0 */) {
        pos++;
      }
      else {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      }
      if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
        pos++;
        if (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
          while (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
          }
        }
        else {
          scanError = 3 /* UnexpectedEndOfNumber */;
          return text.substring(start, pos);
        }
      }
      var end = pos;
      if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
        pos++;
        if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
          pos++;
          }
          if (pos < text.length && isDigit(text.charCodeAt(pos))) {
            pos++;
            while (pos < text.length && isDigit(text.charCodeAt(pos))) {
              pos++;
            }
            end = pos;
          }
          else {
            scanError = 3 /* UnexpectedEndOfNumber */;
          }
        }
        return text.substring(start, end);
      }

      function scanString() {
        var result = '', start = pos;
        while (true) {
          if (pos >= len) {
            result += text.substring(start, pos);
            scanError = 2 /* UnexpectedEndOfString */;
            break;
          }
          var ch = text.charCodeAt(pos);
          if (ch === 34 /* doubleQuote */) {
            result += text.substring(start, pos);
            pos++;
            break;
          }
          if (ch === 92 /* backslash */) {
            result += text.substring(start, pos);
            pos++;
            if (pos >= len) {
              scanError = 2 /* UnexpectedEndOfString */;
              break;
            }
            ch = text.charCodeAt(pos++);
            switch (ch) {
              case 34 /* doubleQuote */:
                result += '\"';
                break;
              case 92 /* backslash */:
                result += '\\';
                break;
              case 47 /* slash */:
                result += '/';
                break;
              case 98 /* b */:
                result += '\b';
                break;
              case 102 /* f */:
                result += '\f';
                break;
              case 110 /* n */:
                result += '\n';
                break;
              case 114 /* r */:
                result += '\r';
                break;
              case 116 /* t */:
                result += '\t';
                break;
              case 117 /* u */:
                var ch_1 = scanHexDigits(4, true);
                if (ch_1 >= 0) {
                  result += String.fromCharCode(ch_1);
                }
                else {
                  scanError = 4 /* InvalidUnicode */;
                }
                break;
              default:
                scanError = 5 /* InvalidEscapeCharacter */;
            }
            start = pos;
            continue;
          }
          if (ch >= 0 && ch <= 0x1f) {
            if (isLineBreak(ch)) {
              result += text.substring(start, pos);
              scanError = 2 /* UnexpectedEndOfString */;
              break;
            }
            else {
              scanError = 6 /* InvalidCharacter */;
              // mark as error but continue with string
            }
          }
          pos++;
        }
        return result;
      }

      function scanNext() {
        value = '';
        scanError = 0 /* None */;
        tokenOffset = pos;
        if (pos >= len) {
          // at the end
          tokenOffset = len;
          return token = 17 /* EOF */;
        }
        var code = text.charCodeAt(pos);
        // trivia: whitespace
        if (isWhiteSpace(code)) {
          do {
            pos++;
            value += String.fromCharCode(code);
            code = text.charCodeAt(pos);
          } while (isWhiteSpace(code));
          return token = 15 /* Trivia */;
        }
        // trivia: newlines
        if (isLineBreak(code)) {
          pos++;
          value += String.fromCharCode(code);
          if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
            pos++;
            value += '\n';
          }
          return token = 14 /* LineBreakTrivia */;
        }

        switch (code) {
          // tokens: []{}:,
          case 123 /* openBrace */:
            pos++;
            return token = 1 /* OpenBraceToken */;
          case 125 /* closeBrace */:
            pos++;
            return token = 2 /* CloseBraceToken */;
          case 91 /* openBracket */:
            pos++;
            return token = 3 /* OpenBracketToken */;
          case 93 /* closeBracket */:
            pos++;
            return token = 4 /* CloseBracketToken */;
          case 58 /* colon */:
            pos++;
            return token = 6 /* ColonToken */;
          case 44 /* comma */:
            pos++;
            return token = 5 /* CommaToken */;
          // strings
          case 34 /* doubleQuote */:
            pos++;
            value = scanString();
            return token = 10 /* StringLiteral */;
          // comments
          case 47 /* slash */:
            var start = pos - 1;
            // Single-line comment
            if (text.charCodeAt(pos + 1) === 47 /* slash */) {
              pos += 2;
              while (pos < len) {
                if (isLineBreak(text.charCodeAt(pos))) {
                  break;
                }
                pos++;
              }
              value = text.substring(start, pos);
              return token = 12 /* LineCommentTrivia */;
            }
            // Multi-line comment
            if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
              pos += 2;
              var commentClosed = false;
              while (pos < len) {
                var ch = text.charCodeAt(pos);
                if (ch === 42 /* asterisk */ && (pos + 1 < len) && text.charCodeAt(pos + 1) === 47 /* slash */) {
                  pos += 2;
                  commentClosed = true;
                  break;
                }
                pos++;
              }
              if (!commentClosed) {
                pos++;
                scanError = 1 /* UnexpectedEndOfComment */;
              }
              value = text.substring(start, pos);
              return token = 13 /* BlockCommentTrivia */;
            }
            // just a single slash
            value += String.fromCharCode(code);
            pos++;
            return token = 16 /* Unknown */;

          // numbers
          case 45 /* minus */:
            value += String.fromCharCode(code);
            pos++;
            if (pos === len || !isDigit(text.charCodeAt(pos))) {
                return token = 16 /* Unknown */;
            }

          // found a minus, followed by a number so
          // we fall through to proceed with scanning
          // numbers
          case 48 /* _0 */:
          case 49 /* _1 */:
          case 50 /* _2 */:
          case 51 /* _3 */:
          case 52 /* _4 */:
          case 53 /* _5 */:
          case 54 /* _6 */:
          case 55 /* _7 */:
          case 56 /* _8 */:
          case 57 /* _9 */:
            value += scanNumber();
            return token = 11 /* NumericLiteral */;

          // literals and unknown symbols
          default:
            // is a literal? Read the full word.
            while (pos < len && isUnknownContentCharacter(code)) {
              pos++;
              code = text.charCodeAt(pos);
            }
            if (tokenOffset !== pos) {
              value = text.substring(tokenOffset, pos);
              // keywords: true, false, null
              switch (value) {
                case 'true': return token = 8 /* TrueKeyword */;
                case 'false': return token = 9 /* FalseKeyword */;
                case 'null': return token = 7 /* NullKeyword */;
              }
              return token = 16 /* Unknown */;
            }
            // some
            value += String.fromCharCode(code);
            pos++;
            return token = 16 /* Unknown */;
        }
      }
      function isUnknownContentCharacter(code) {
        if (isWhiteSpace(code) || isLineBreak(code)) {
          return false;
        }
        switch (code) {
          case 125 /* closeBrace */:
          case 93 /* closeBracket */:
          case 123 /* openBrace */:
          case 91 /* openBracket */:
          case 34 /* doubleQuote */:
          case 58 /* colon */:
          case 44 /* comma */:
          case 47 /* slash */:
              return false;
        }
        return true;
      }

      function scanNextNonTrivia() {
        var result;
        do {
          result = scanNext();
        } while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
        return result;
      }
      return {
          setPosition: setPosition,
          getPosition: function () { return pos; },
          scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
          getToken: function () { return token; },
          getTokenValue: function () { return value; },
          getTokenOffset: function () { return tokenOffset; },
          getTokenLength: function () { return pos - tokenOffset; },
          getTokenError: function () { return scanError; }
      };
    }
    exports.createScanner = createScanner;
    function isWhiteSpace(ch) {
      return ch === 32 /* space */
        || ch === 9 /* tab */
        || ch === 11 /* verticalTab */
        || ch === 12 /* formFeed */
        || ch === 160 /* nonBreakingSpace */
        || ch === 5760 /* ogham */
        || ch >= 8192 /* enQuad */
        && ch <= 8203 /* zeroWidthSpace */
        || ch === 8239 /* narrowNoBreakSpace */
        || ch === 8287 /* mathematicalSpace */
        || ch === 12288 /* ideographicSpace */
        || ch === 65279 /* byteOrderMark */;
    }
    function isLineBreak(ch) {
      return ch === 10 /* lineFeed */
        || ch === 13 /* carriageReturn */
        || ch === 8232 /* lineSeparator */
        || ch === 8233 /* paragraphSeparator */;
    }
    function isDigit(ch) {
      return ch >= 48 /* _0 */
        && ch <= 57 /* _9 */;
    }
});

//# sourceMappingURL=scanner.js.map;
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'jsonc-parser/impl/format',
      [
        "require",
        "exports",
        "./scanner"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var scanner_1 = require("./scanner");
  function format(documentText, range, options) {
    var initialIndentLevel;
    var formatText;
    var formatTextStart;
    var rangeStart;
    var rangeEnd;
    if (range) {
      rangeStart = range.offset;
      rangeEnd = rangeStart + range.length;
      formatTextStart = rangeStart;
      while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
        formatTextStart--;
      }
      var endOffset = rangeEnd;
      while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
        endOffset++;
      }
      formatText = documentText.substring(formatTextStart, endOffset);
      initialIndentLevel = computeIndentLevel(formatText, options);
    }
    else {
      formatText = documentText;
      initialIndentLevel = 0;
      formatTextStart = 0;
      rangeStart = 0;
      rangeEnd = documentText.length;
    }

    var eol = getEOL(options, documentText);
    var lineBreak = false;
    var indentLevel = 0;
    var indentValue;
    if (options.insertSpaces) {
      indentValue = repeat(' ', options.tabSize || 4);
    }
    else {
      indentValue = '\t';
    }
    var scanner = scanner_1.createScanner(formatText, false);
    var hasError = false;
    function newLineAndIndent() {
      return eol + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    function scanNext() {
      var token = scanner.scan();
      lineBreak = false;
      while (token === 15 /* Trivia */
          || token === 14 /* LineBreakTrivia */) {
        lineBreak = lineBreak || (token === 14 /* LineBreakTrivia */);
        token = scanner.scan();
      }
      hasError = token === 16 /* Unknown */
        || scanner.getTokenError() !== 0 /* None */;
      return token;
    }
    var editOperations = [];
    function addEdit(text, startOffset, endOffset) {
      if (!hasError && startOffset < rangeEnd && endOffset > rangeStart && documentText.substring(startOffset, endOffset) !== text) {
          editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
      }
    }
    var firstToken = scanNext();
    if (firstToken !== 17 /* EOF */) {
      var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
      var initialIndent = repeat(indentValue, initialIndentLevel);
      addEdit(initialIndent, formatTextStart, firstTokenStart);
    }

    while (firstToken !== 17 /* EOF */) {
      var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
      var secondToken = scanNext();
      var replaceContent = '';
      while (!lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
        // comments on the same line: keep them on the same line, but ignore them otherwise
        var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
        addEdit(' ', firstTokenEnd, commentTokenStart);
        firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
        replaceContent = secondToken === 12 /* LineCommentTrivia */ ? newLineAndIndent() : '';
        secondToken = scanNext();
      }

      if (secondToken === 2 /* CloseBraceToken */) {
        if (firstToken !== 1 /* OpenBraceToken */) {
          indentLevel--;
          replaceContent = newLineAndIndent();
        }
      }
      else if (secondToken === 4 /* CloseBracketToken */) {
        if (firstToken !== 3 /* OpenBracketToken */) {
          indentLevel--;
          replaceContent = newLineAndIndent();
        }
      }
      else {
        switch (firstToken) {
          case 3 /* OpenBracketToken */:
          case 1 /* OpenBraceToken */:
            indentLevel++;
            replaceContent = newLineAndIndent();
            break;

          case 5 /* CommaToken */:
          case 12 /* LineCommentTrivia */:
            replaceContent = newLineAndIndent();
            break;

          case 13 /* BlockCommentTrivia */:
            if (lineBreak) {
              replaceContent = newLineAndIndent();
            }
            else {
              // symbol following comment on the same line: keep on same line, separate with ' '
              replaceContent = ' ';
            }
            break;

          case 6 /* ColonToken */:
            replaceContent = ' ';
            break;

          case 10 /* StringLiteral */:
            if (secondToken === 6 /* ColonToken */) {
              replaceContent = '';
              break;
            }
          // fall through
          case 7 /* NullKeyword */:
          case 8 /* TrueKeyword */:
          case 9 /* FalseKeyword */:
          case 11 /* NumericLiteral */:
          case 2 /* CloseBraceToken */:
          case 4 /* CloseBracketToken */:
            if (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */) {
              replaceContent = ' ';
            }
            else if (secondToken !== 5 /* CommaToken */ && secondToken !== 17 /* EOF */) {
              hasError = true;
            }
            break;

          case 16 /* Unknown */:
            hasError = true;
            break;
        }
        if (lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
          replaceContent = newLineAndIndent();
        }
      }
      var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(replaceContent, firstTokenEnd, secondTokenStart);
      firstToken = secondToken;
    }
    return editOperations;
  }

  exports.format = format;

  function repeat(s, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
      result += s;
    }
    return result;
  }

  function computeIndentLevel(content, options) {
    var i = 0;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
      var ch = content.charAt(i);
      if (ch === ' ') {
        nChars++;
      }
      else if (ch === '\t') {
        nChars += tabSize;
      }
      else {
        break;
      }
      i++;
    }
    return Math.floor(nChars / tabSize);
  }

  function getEOL(options, text) {
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch === '\r') {
        if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
          return '\r\n';
        }
        return '\r';
      }
      else if (ch === '\n') {
        return '\n';
      }
    }
    return (options && options.eol) || '\n';
  }

  function isEOL(text, offset) {
    return '\r\n'.indexOf(text.charAt(offset)) !== -1;
  }

  exports.isEOL = isEOL;
});

//# sourceMappingURL=format.js.map;
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'jsonc-parser/impl/parser',
      [
        "require",
        "exports",
        "./scanner"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var scanner_1 = require("./scanner");
  /**
   * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
   */
  function getLocation(text, position) {
    var segments = []; // strings or numbers
    var earlyReturnException = new Object();
    var previousNode = void 0;
    var previousNodeInst = {
      value: {},
      offset: 0,
      length: 0,
      type: 'object',
      parent: void 0
    };
    var isAtPropertyKey = false;
    function setPreviousNode(value, offset, length, type) {
      previousNodeInst.value = value;
      previousNodeInst.offset = offset;
      previousNodeInst.length = length;
      previousNodeInst.type = type;
      previousNodeInst.colonOffset = void 0;
      previousNode = previousNodeInst;
    }
    try {
      visit(text, {
        onObjectBegin: function (offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          isAtPropertyKey = position > offset;
          segments.push(''); // push a placeholder (will be replaced)
        },
        onObjectProperty: function (name, offset, length) {
          if (position < offset) {
            throw earlyReturnException;
          }
          setPreviousNode(name, offset, length, 'property');
          segments[segments.length - 1] = name;
          if (position <= offset + length) {
            throw earlyReturnException;
          }
        },
        onObjectEnd: function (offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.pop();
        },
        onArrayBegin: function (offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.push(0);
        },
        onArrayEnd: function (offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          previousNode = void 0;
          segments.pop();
        },
        onLiteralValue: function (value, offset, length) {
          if (position < offset) {
            throw earlyReturnException;
          }
          setPreviousNode(value, offset, length, getLiteralNodeType(value));
          if (position <= offset + length) {
            throw earlyReturnException;
          }
        },
        onSeparator: function (sep, offset, length) {
          if (position <= offset) {
            throw earlyReturnException;
          }
          if (sep === ':' && previousNode && previousNode.type === 'property') {
            previousNode.colonOffset = offset;
            isAtPropertyKey = false;
            previousNode = void 0;
          }
          else if (sep === ',') {
            var last = segments[segments.length - 1];
            if (typeof last === 'number') {
              segments[segments.length - 1] = last + 1;
            }
            else {
              isAtPropertyKey = true;
              segments[segments.length - 1] = '';
            }
            previousNode = void 0;
          }
        }
      });
    }
    catch (e) {
      if (e !== earlyReturnException) {
        throw e;
      }
    }
    return {
      path: segments,
      previousNode: previousNode,
      isAtPropertyKey: isAtPropertyKey,
      matches: function (pattern) {
        var k = 0;
        for (var i = 0; k < pattern.length && i < segments.length; i++) {
          if (pattern[k] === segments[i] || pattern[k] === '*') {
            k++;
          }
          else if (pattern[k] !== '**') {
            return false;
          }
        }
        return k === pattern.length;
      }
    };
  }

  exports.getLocation = getLocation;

  /**
   * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
   * Therefore always check the errors list to find out if the input was valid.
   */
  function parse(text, errors, options) {
    if (errors === void 0) {
      errors = [];
    }
    var currentProperty = null;
    var currentParent = [];
    var previousParents = [];
    function onValue(value) {
      if (Array.isArray(currentParent)) {
        currentParent.push(value);
      }
      else if (currentProperty) {
        currentParent[currentProperty] = value;
      }
    }
    var visitor = {
      onObjectBegin: function () {
        var object = {};
        onValue(object);
        previousParents.push(currentParent);
        currentParent = object;
        currentProperty = null;
      },
      onObjectProperty: function (name) {
        currentProperty = name;
      },
      onObjectEnd: function () {
        currentParent = previousParents.pop();
      },
      onArrayBegin: function () {
        var array = [];
        onValue(array);
        previousParents.push(currentParent);
        currentParent = array;
        currentProperty = null;
      },
      onArrayEnd: function () {
        currentParent = previousParents.pop();
      },
      onLiteralValue: onValue,
      onError: function (error, offset, length) {
        errors.push({ error: error, offset: offset, length: length });
      }
    };
    visit(text, visitor, options);
    return currentParent[0];
  }
  exports.parse = parse;

  /**
   * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
   */
  function parseTree(text, errors, options) {
    if (errors === void 0) {
      errors = [];
    }
    var currentParent = { type: 'array', offset: -1, length: -1, children: [], parent: void 0 }; // artificial root
    function ensurePropertyComplete(endOffset) {
      if (currentParent.type === 'property') {
        currentParent.length = endOffset - currentParent.offset;
        currentParent = currentParent.parent;
      }
    }
    function onValue(valueNode) {
      currentParent.children.push(valueNode);
      return valueNode;
    }
    var visitor = {
      onObjectBegin: function (offset) {
        currentParent = onValue({ type: 'object', offset: offset, length: -1, parent: currentParent, children: [] });
      },
      onObjectProperty: function (name, offset, length) {
        currentParent = onValue({ type: 'property', offset: offset, length: -1, parent: currentParent, children: [] });
        currentParent.children.push({ type: 'string', value: name, offset: offset, length: length, parent: currentParent });
      },
      onObjectEnd: function (offset, length) {
        currentParent.length = offset + length - currentParent.offset;
        currentParent = currentParent.parent;
        ensurePropertyComplete(offset + length);
      },
      onArrayBegin: function (offset, length) {
        currentParent = onValue({ type: 'array', offset: offset, length: -1, parent: currentParent, children: [] });
      },
      onArrayEnd: function (offset, length) {
        currentParent.length = offset + length - currentParent.offset;
        currentParent = currentParent.parent;
        ensurePropertyComplete(offset + length);
      },
      onLiteralValue: function (value, offset, length) {
        onValue({ type: getLiteralNodeType(value), offset: offset, length: length, parent: currentParent, value: value });
        ensurePropertyComplete(offset + length);
      },
      onSeparator: function (sep, offset, length) {
        if (currentParent.type === 'property') {
          if (sep === ':') {
            currentParent.colonOffset = offset;
          }
          else if (sep === ',') {
            ensurePropertyComplete(offset);
          }
        }
      },
      onError: function (error, offset, length) {
        errors.push({ error: error, offset: offset, length: length });
      }
    };
    visit(text, visitor, options);
    var result = currentParent.children[0];
    if (result) {
      delete result.parent;
    }
    return result;
  }
  exports.parseTree = parseTree;

  /**
   * Finds the node at the given path in a JSON DOM.
   */
  function findNodeAtLocation(root, path) {
    if (!root) {
      return void 0;
    }
    var node = root;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
      var segment = path_1[_i];
      if (typeof segment === 'string') {
        if (node.type !== 'object' || !Array.isArray(node.children)) {
          return void 0;
        }
        var found = false;
        for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
          var propertyNode = _b[_a];
          if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
            node = propertyNode.children[1];
            found = true;
            break;
          }
        }
        if (!found) {
          return void 0;
        }
      }
      else {
        var index = segment;
        if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
          return void 0;
        }
        node = node.children[index];
      }
    }
    return node;
  }
  exports.findNodeAtLocation = findNodeAtLocation;

  /**
   * Gets the JSON path of the given JSON DOM node
   */
  function getNodePath(node) {
    if (!node.parent || !node.parent.children) {
      return [];
    }
    var path = getNodePath(node.parent);
    if (node.parent.type === 'property') {
      var key = node.parent.children[0].value;
      path.push(key);
    }
    else if (node.parent.type === 'array') {
      var index = node.parent.children.indexOf(node);
      if (index !== -1) {
        path.push(index);
      }
    }
    return path;
  }
  exports.getNodePath = getNodePath;

  /**
   * Evaluates the JavaScript object of the given JSON DOM node
   */
  function getNodeValue(node) {
    switch (node.type) {
      case 'array':
        return node.children.map(getNodeValue);

      case 'object':
        var obj = Object.create(null);
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
          var prop = _a[_i];
          var valueNode = prop.children[1];
          if (valueNode) {
            obj[prop.children[0].value] = getNodeValue(valueNode);
          }
        }
        return obj;

      case 'null':
      case 'string':
      case 'number':
      case 'boolean':
        return node.value;

      default:
        return void 0;
    }
  }
  exports.getNodeValue = getNodeValue;

  function contains(node, offset, includeRightBound) {
      if (includeRightBound === void 0) {
        includeRightBound = false;
      }
      return (offset >= node.offset && offset < (node.offset + node.length)) || includeRightBound && (offset === (node.offset + node.length));
  }
  exports.contains = contains;

  /**
   * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
   */
  function findNodeAtOffset(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    if (contains(node, offset, includeRightBound)) {
      var children = node.children;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length && children[i].offset <= offset; i++) {
          var item = findNodeAtOffset(children[i], offset, includeRightBound);
          if (item) {
            return item;
          }
        }
      }
      return node;
    }
    return void 0;
  }
  exports.findNodeAtOffset = findNodeAtOffset;

  /**
   * Parses the given text and invokes the visitor functions for each object, array and literal reached.
   */
  function visit(text, visitor, options) {
    var _scanner = scanner_1.createScanner(text, false);
    function toNoArgVisit(visitFunction) {
      return visitFunction ? 
        function () {
          return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength());
        }
        : function () { return true; };
    }
    function toOneArgVisit(visitFunction) {
      return visitFunction ?
        function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()); } :
        function () { return true; };
    }
    var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty),
      onObjectEnd = toNoArgVisit(visitor.onObjectEnd),
      onArrayBegin = toNoArgVisit(visitor.onArrayBegin),
      onArrayEnd = toNoArgVisit(visitor.onArrayEnd),
      onLiteralValue = toOneArgVisit(visitor.onLiteralValue),
      onSeparator = toOneArgVisit(visitor.onSeparator),
      onComment = toNoArgVisit(visitor.onComment),
      onError = toOneArgVisit(visitor.onError);
    var disallowComments = options && options.disallowComments;
    var allowTrailingComma = options && options.allowTrailingComma;

    function scanNext() {
      while (true) {
        var token = _scanner.scan();
        switch (_scanner.getTokenError()) {
          case 4 /* InvalidUnicode */:
            handleError(14 /* InvalidUnicode */);
            break;

          case 5 /* InvalidEscapeCharacter */:
            handleError(15 /* InvalidEscapeCharacter */);
            break;

          case 3 /* UnexpectedEndOfNumber */:
            handleError(13 /* UnexpectedEndOfNumber */);
            break;

          case 1 /* UnexpectedEndOfComment */:
            if (!disallowComments) {
                handleError(11 /* UnexpectedEndOfComment */);
            }
            break;

          case 2 /* UnexpectedEndOfString */:
            handleError(12 /* UnexpectedEndOfString */);
            break;

          case 6 /* InvalidCharacter */:
            handleError(16 /* InvalidCharacter */);
            break;
        }

        switch (token) {
          case 12 /* LineCommentTrivia */:
          case 13 /* BlockCommentTrivia */:
            if (disallowComments) {
                handleError(10 /* InvalidCommentToken */);
            }
            else {
                onComment();
            }
            break;

          case 16 /* Unknown */:
            handleError(1 /* InvalidSymbol */);
            break;

          case 15 /* Trivia */:
          case 14 /* LineBreakTrivia */:
            break;

          default:
            return token;
        }
      }
    }

    function handleError(error, skipUntilAfter, skipUntil) {
      if (skipUntilAfter === void 0) {
        skipUntilAfter = [];
      }
      if (skipUntil === void 0) {
        skipUntil = [];
      }
      onError(error);
      if (skipUntilAfter.length + skipUntil.length > 0) {
        var token = _scanner.getToken();
        while (token !== 17 /* EOF */) {
          if (skipUntilAfter.indexOf(token) !== -1) {
            scanNext();
            break;
          }
          else if (skipUntil.indexOf(token) !== -1) {
            break;
          }
          token = scanNext();
        }
      }
    }

    function parseString(isValue) {
      var value = _scanner.getTokenValue();
      if (isValue) {
        onLiteralValue(value);
      }
      else {
        onObjectProperty(value);
      }
      scanNext();
      return true;
    }

    function parseLiteral() {
      switch (_scanner.getToken()) {
        case 11 /* NumericLiteral */:
          var value = 0;
          try {
            value = JSON.parse(_scanner.getTokenValue());
            if (typeof value !== 'number') {
              handleError(2 /* InvalidNumberFormat */);
              value = 0;
            }
          }
          catch (e) {
            handleError(2 /* InvalidNumberFormat */);
          }
          onLiteralValue(value);
          break;

        case 7 /* NullKeyword */:
          onLiteralValue(null);
          break;

        case 8 /* TrueKeyword */:
          onLiteralValue(true);
          break;

        case 9 /* FalseKeyword */:
          onLiteralValue(false);
          break;

        default:
          return false;
      }
      scanNext();
      return true;
    }

    function parseProperty() {
      if (_scanner.getToken() !== 10 /* StringLiteral */) {
        handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        return false;
      }
      parseString(false);
      if (_scanner.getToken() === 6 /* ColonToken */) {
        onSeparator(':');
        scanNext(); // consume colon
        if (!parseValue()) {
          handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
      }
      else {
        handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
      }
      return true;
    }

    function parseObject() {
      onObjectBegin();
      scanNext(); // consume open brace
      var needsComma = false;
      while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
        if (_scanner.getToken() === 5 /* CommaToken */) {
          if (!needsComma) {
            handleError(4 /* ValueExpected */, [], []);
          }
          onSeparator(',');
          scanNext(); // consume comma
          if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
            break;
          }
        }
        else if (needsComma) {
          handleError(6 /* CommaExpected */, [], []);
        }
        if (!parseProperty()) {
          handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
        needsComma = true;
      }
      onObjectEnd();
      if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
        handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
      }
      else {
        scanNext(); // consume close brace
      }
      return true;
    }

    function parseArray() {
      onArrayBegin();
      scanNext(); // consume open bracket
      var needsComma = false;
      while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
        if (_scanner.getToken() === 5 /* CommaToken */) {
          if (!needsComma) {
            handleError(4 /* ValueExpected */, [], []);
          }
          onSeparator(',');
          scanNext(); // consume comma
          if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
            break;
          }
        }
        else if (needsComma) {
          handleError(6 /* CommaExpected */, [], []);
        }
        if (!parseValue()) {
          handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
        }
        needsComma = true;
      }
      onArrayEnd();
      if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
        handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
      }
      else {
        scanNext(); // consume close bracket
      }
      return true;
    }

    function parseValue() {
      switch (_scanner.getToken()) {
        case 3 /* OpenBracketToken */:
          return parseArray();

        case 1 /* OpenBraceToken */:
          return parseObject();

        case 10 /* StringLiteral */:
          return parseString(true);

        default:
          return parseLiteral();
      }
    }

    scanNext();

    if (_scanner.getToken() === 17 /* EOF */) {
      return true;
    }
    if (!parseValue()) {
      handleError(4 /* ValueExpected */, [], []);
      return false;
    }
    if (_scanner.getToken() !== 17 /* EOF */) {
      handleError(9 /* EndOfFileExpected */, [], []);
    }
    return true;
  }
  exports.visit = visit;

  /**
   * Takes JSON with JavaScript-style comments and remove
   * them. Optionally replaces every none-newline character
   * of comments with a replaceCharacter
   */
  function stripComments(text, replaceCh) {
    var _scanner = scanner_1.createScanner(text), parts = [], kind, offset = 0, pos;
    do {
      pos = _scanner.getPosition();
      kind = _scanner.scan();
      switch (kind) {
        case 12 /* LineCommentTrivia */:
        case 13 /* BlockCommentTrivia */:
        case 17 /* EOF */:
          if (offset !== pos) {
            parts.push(text.substring(offset, pos));
          }
          if (replaceCh !== void 0) {
            parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
          }
          offset = _scanner.getPosition();
          break;
      }
    } while (kind !== 17 /* EOF */);
    return parts.join('');
  }
  exports.stripComments = stripComments;

  function getLiteralNodeType(value) {
    switch (typeof value) {
      case 'boolean':
        return 'boolean';

      case 'number':
        return 'number';

      case 'string':
        return 'string';

      default:
        return 'null';
    }
  }
});

//# sourceMappingURL=parser.js.map;
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'jsonc-parser/impl/edit',
      [
        "require",
        "exports",
        "./format",
        "./parser"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var format_1 = require("./format");
  var parser_1 = require("./parser");

  function removeProperty(text, path, formattingOptions) {
    return setProperty(text, path, void 0, formattingOptions);
  }
  exports.removeProperty = removeProperty;

  function setProperty(text, originalPath, value, formattingOptions, getInsertionIndex) {
    var path = originalPath.slice();
    var errors = [];
    var root = parser_1.parseTree(text, errors);
    var parent = void 0;
    var lastSegment = void 0;
    while (path.length > 0) {
      lastSegment = path.pop();
      parent = parser_1.findNodeAtLocation(root, path);
      if (parent === void 0 && value !== void 0) {
        if (typeof lastSegment === 'string') {
          value = (_a = {}, _a[lastSegment] = value, _a);
        }
        else {
          value = [value];
        }
      }
      else {
        break;
      }
    }
    if (!parent) {
      // empty document
      if (value === void 0) { // delete
        throw new Error('Can not delete in empty document');
      }
      return withFormatting(text, { offset: root ? root.offset : 0, length: root ? root.length : 0, content: JSON.stringify(value) }, formattingOptions);
    }
    else if (parent.type === 'object' && typeof lastSegment === 'string' && Array.isArray(parent.children)) {
      var existing = parser_1.findNodeAtLocation(parent, [lastSegment]);
      if (existing !== void 0) {
        if (value === void 0) { // delete
          if (!existing.parent) {
            throw new Error('Malformed AST');
          }
          var propertyIndex = parent.children.indexOf(existing.parent);
          var removeBegin = void 0;
          var removeEnd = existing.parent.offset + existing.parent.length;
          if (propertyIndex > 0) {
            // remove the comma of the previous node
            var previous = parent.children[propertyIndex - 1];
            removeBegin = previous.offset + previous.length;
          }
          else {
            removeBegin = parent.offset + 1;
            if (parent.children.length > 1) {
              // remove the comma of the next node
              var next = parent.children[1];
              removeEnd = next.offset;
            }
          }
          return withFormatting(text, { offset: removeBegin, length: removeEnd - removeBegin, content: '' }, formattingOptions);
        }
        else {
          // set value of existing property
          return withFormatting(text, { offset: existing.offset, length: existing.length, content: JSON.stringify(value) }, formattingOptions);
        }
      }
      else {
        if (value === void 0) { // delete
          return []; // property does not exist, nothing to do
        }
        var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
        var index = getInsertionIndex ? getInsertionIndex(parent.children.map(function (p) { return p.children[0].value; })) : parent.children.length;
        var edit = void 0;
        if (index > 0) {
          var previous = parent.children[index - 1];
          edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
        }
        else if (parent.children.length === 0) {
          edit = { offset: parent.offset + 1, length: 0, content: newProperty };
        }
        else {
          edit = { offset: parent.offset + 1, length: 0, content: newProperty + ',' };
        }
        return withFormatting(text, edit, formattingOptions);
      }
    }
    else if (parent.type === 'array' && typeof lastSegment === 'number' && Array.isArray(parent.children)) {
      var insertIndex = lastSegment;
      if (insertIndex === -1) {
        // Insert
        var newProperty = "" + JSON.stringify(value);
        var edit = void 0;
        if (parent.children.length === 0) {
          edit = { offset: parent.offset + 1, length: 0, content: newProperty };
        }
        else {
          var previous = parent.children[parent.children.length - 1];
          edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
        }
        return withFormatting(text, edit, formattingOptions);
      }
      else {
        if (value === void 0 && parent.children.length >= 0) {
          //Removal
          var removalIndex = lastSegment;
          var toRemove = parent.children[removalIndex];
          var edit = void 0;
          if (parent.children.length === 1) {
            // only item
            edit = { offset: parent.offset + 1, length: parent.length - 2, content: '' };
          }
          else if (parent.children.length - 1 === removalIndex) {
            // last item
            var previous = parent.children[removalIndex - 1];
            var offset = previous.offset + previous.length;
            var parentEndOffset = parent.offset + parent.length;
            edit = { offset: offset, length: parentEndOffset - 2 - offset, content: '' };
          }
          else {
            edit = { offset: toRemove.offset, length: parent.children[removalIndex + 1].offset - toRemove.offset, content: '' };
          }
          return withFormatting(text, edit, formattingOptions);
        }
        else {
            throw new Error('Array modification not supported yet');
        }
      }
    }
    else {
      throw new Error("Can not add " + (typeof lastSegment !== 'number' ? 'index' : 'property') + " to parent of type " + parent.type);
    }
    var _a;
  }
  exports.setProperty = setProperty;

  function withFormatting(text, edit, formattingOptions) {
    // apply the edit
    var newText = applyEdit(text, edit);
    // format the new text
    var begin = edit.offset;
    var end = edit.offset + edit.content.length;
    if (edit.length === 0 || edit.content.length === 0) { // insert or remove
      while (begin > 0 && !format_1.isEOL(newText, begin - 1)) {
        begin--;
      }
      while (end < newText.length && !format_1.isEOL(newText, end)) {
        end++;
      }
    }
    var edits = format_1.format(newText, { offset: begin, length: end - begin }, formattingOptions);
    // apply the formatting edits and track the begin and end offsets of the changes
    for (var i = edits.length - 1; i >= 0; i--) {
      var edit_1 = edits[i];
      newText = applyEdit(newText, edit_1);
      begin = Math.min(begin, edit_1.offset);
      end = Math.max(end, edit_1.offset + edit_1.length);
      end += edit_1.content.length - edit_1.length;
    }
    // create a single edit with all changes
    var editLength = text.length - (newText.length - end) - begin;
    return [{ offset: begin, length: editLength, content: newText.substring(begin, end) }];
  }

  function applyEdit(text, edit) {
    return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
  }
  exports.applyEdit = applyEdit;

  function isWS(text, offset) {
    return '\r\n \t'.indexOf(text.charAt(offset)) !== -1;
  }
  exports.isWS = isWS;
});

//# sourceMappingURL=edit.js.map;
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'jsonc-parser/main',
      [
        "require",
        "exports",
        "./impl/format",
        "./impl/edit",
        "./impl/scanner",
        "./impl/parser"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var formatter = require("./impl/format");
  var edit = require("./impl/edit");
  var scanner = require("./impl/scanner");
  var parser = require("./impl/parser");
  /**
   * Creates a JSON scanner on the given text.
   * If ignoreTrivia is set, whitespaces or comments are ignored.
   */
  exports.createScanner = scanner.createScanner;
  /**
   * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
   */
  exports.getLocation = parser.getLocation;
  /**
   * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
   * Therefore always check the errors list to find out if the input was valid.
   */
  exports.parse = parser.parse;
  /**
   * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
   */
  exports.parseTree = parser.parseTree;
  /**
   * Finds the node at the given path in a JSON DOM.
   */
  exports.findNodeAtLocation = parser.findNodeAtLocation;
  /**
   * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
   */
  exports.findNodeAtOffset = parser.findNodeAtOffset;
  /**
   * Gets the JSON path of the given JSON DOM node
   */
  exports.getNodePath = parser.getNodePath;
  /**
   * Evaluates the JavaScript object of the given JSON DOM node
   */
  exports.getNodeValue = parser.getNodeValue;
  /**
   * Parses the given text and invokes the visitor functions for each object, array and literal reached.
   */
  exports.visit = parser.visit;
  /**
   * Takes JSON with JavaScript-style comments and remove
   * them. Optionally replaces every none-newline character
   * of comments with a replaceCharacter
   */
  exports.stripComments = parser.stripComments;
  /**
   * Computes the edits needed to format a JSON document.
   *
   * @param documentText The input text
   * @param range The range to format or `undefined` to format the full content
   * @param options The formatting options
   * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
   * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
   * text in the original document. However, multiple edits can have
   * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
   * To apply edits to an input, you can use `applyEdits`
   */
  function format(documentText, range, options) {
    return formatter.format(documentText, range, options);
  }
  exports.format = format;
  /**
   * Computes the edits needed to modify a value in the JSON document.
   *
   * @param documentText The input text
   * @param path The path of the value to change. The path represents either to the document root, a property or an array item.
   * If the path points to an non-existing property or item, it will be created.
   * @param value The new value for the specified property or item. If the value is undefined,
   * the property or item will be removed.
   * @param options Options
   * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
   * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
   * text in the original document. However, multiple edits can have
   * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
   * To apply edits to an input, you can use `applyEdits`
   */
  function modify(text, path, value, options) {
    return edit.setProperty(text, path, value, options.formattingOptions, options.getInsertionIndex);
  }
  exports.modify = modify;
  /**
   * Applies edits to a input string.
   */
  function applyEdits(text, edits) {
    for (var i = edits.length - 1; i >= 0; i--) {
      text = edit.applyEdit(text, edits[i]);
    }
    return text;
  }
  exports.applyEdits = applyEdits;
});

//# sourceMappingURL=main.js.map;
define(
  'jsonc-parser',
  [
    'jsonc-parser/main'
  ],
  function (main) { return main; }
);

var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-uri/index',
      [
        "require",
        "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  var isWindows;
  if (typeof process === 'object') {
    isWindows = process.platform === 'win32';
  }
  else if (typeof navigator === 'object') {
    var userAgent = navigator.userAgent;
    isWindows = userAgent.indexOf('Windows') >= 0;
  }

  function isHighSurrogate(charCode) {
    return (0xD800 <= charCode && charCode <= 0xDBFF);
  }
  function isLowSurrogate(charCode) {
    return (0xDC00 <= charCode && charCode <= 0xDFFF);
  }
  function isLowerAsciiHex(code) {
    return code >= 97 /* a */ && code <= 102 /* f */;
  }
  function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
  }
  function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
  }
  function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
  }
  //#endregion
  //
  var _schemePattern = /^\w[\w\d+.-]*$/;
  var _singleSlashStart = /^\//;
  var _doubleSlashStart = /^\/\//;
  function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) {
      throw new Error("[UriError]: Scheme is missing: {scheme: \"\", authority: \"" + ret.authority + "\", path: \"" + ret.path + "\", query: \"" + ret.query + "\", fragment: \"" + ret.fragment + "\"}");
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
      throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
      if (ret.authority) {
        if (!_singleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        }
      }
      else {
        if (_doubleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
        }
      }
    }
  }
  // for a while we allowed uris *without* schemes and this is the migration
  // for them, e.g. an uri without scheme and without strict-mode warns and falls
  // back to the file-scheme. that should cause the least carnage and still be a
  // clear warning
  function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
      return 'file';
    }
    return scheme;
  }

  // implements a bit of https://tools.ietf.org/html/rfc3986#section-5
  function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
      case 'https':
      case 'http':
      case 'file':
        if (!path) {
          path = _slash;
        }
        else if (path[0] !== _slash) {
          path = _slash + path;
        }
        break;
    }
    return path;
  }

  var _empty = '';
  var _slash = '/';
  var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

  /**
   * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
   * This class is a simple parser which creates the basic component parts
   * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
   * and encoding.
   *
   *       foo://example.com:8042/over/there?name=ferret#nose
   *       \_/   \______________/\_________/ \_________/ \__/
   *        |           |            |            |        |
   *     scheme     authority       path        query   fragment
   *        |   _____________________|__
   *       / \ /                        \
   *       urn:example:animal:ferret:nose
   */
  var URI = /** @class */ (function () {
    /**
     * @internal
     */
    function URI(schemeOrData, authority, path, query, fragment, _strict) {
      if (_strict === void 0) {
        _strict = false;
      }
      if (typeof schemeOrData === 'object') {
        this.scheme = schemeOrData.scheme || _empty;
        this.authority = schemeOrData.authority || _empty;
        this.path = schemeOrData.path || _empty;
        this.query = schemeOrData.query || _empty;
        this.fragment = schemeOrData.fragment || _empty;
        // no validation because it's this URI
        // that creates uri components.
        // _validateUri(this);
      }
      else {
        this.scheme = _schemeFix(schemeOrData, _strict);
        this.authority = authority || _empty;
        this.path = _referenceResolution(this.scheme, path || _empty);
        this.query = query || _empty;
        this.fragment = fragment || _empty;
        _validateUri(this, _strict);
      }
    }
    URI.isUri = function (thing) {
      if (thing instanceof URI) {
        return true;
      }
      if (!thing) {
        return false;
      }
      return typeof thing.authority === 'string'
        && typeof thing.fragment === 'string'
        && typeof thing.path === 'string'
        && typeof thing.query === 'string'
        && typeof thing.scheme === 'string'
        && typeof thing.fsPath === 'function'
        && typeof thing.with === 'function'
        && typeof thing.toString === 'function';
    };
    Object.defineProperty(URI.prototype, "fsPath", {
      // ---- filesystem path -----------------------
      /**
       * Returns a string representing the corresponding file system path of this URI.
       * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
       * platform specific path separator.
       *
       * * Will *not* validate the path for invalid characters and semantics.
       * * Will *not* look at the scheme of this URI.
       * * The result shall *not* be used for display purposes but for accessing a file on disk.
       *
       *
       * The *difference* to `URI#path` is the use of the platform specific separator and the handling
       * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
       *
       * ```ts
          const u = URI.parse('file://server/c$/folder/file.txt')
          u.authority === 'server'
          u.path === '/shares/c$/file.txt'
          u.fsPath === '\\server\c$\folder\file.txt'
      ```
       *
       * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
       * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
       * with URIs that represent files on disk (`file` scheme).
       */
      get: function () {
        // if (this.scheme !== 'file') {
        // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
        // }
        return _makeFsPath(this);
      },
      enumerable: true,
      configurable: true
    });

    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
      if (!change) {
          return this;
      }
      var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
      if (scheme === undefined) {
        scheme = this.scheme;
      }
      else if (scheme === null) {
        scheme = _empty;
      }
      if (authority === undefined) {
        authority = this.authority;
      }
      else if (authority === null) {
        authority = _empty;
      }

      if (path === undefined) {
        path = this.path;
      }
      else if (path === null) {
        path = _empty;
      }

      if (query === undefined) {
        query = this.query;
      }
      else if (query === null) {
        query = _empty;
      }

      if (fragment === undefined) {
        fragment = this.fragment;
      }
      else if (fragment === null) {
        fragment = _empty;
      }

      if (scheme === this.scheme
        && authority === this.authority
        && path === this.path
        && query === this.query
        && fragment === this.fragment) {
        return this;
      }
      return new _URI(scheme, authority, path, query, fragment);
    };

    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    URI.parse = function (value, _strict) {
      if (_strict === void 0) {
        _strict = false;
      }
      var match = _regexp.exec(value);
      if (!match) {
        return new _URI(_empty, _empty, _empty, _empty, _empty);
      }
      return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty),
        decodeURIComponent(match[7] || _empty),
        decodeURIComponent(match[9] || _empty),
        _strict
      );
    };
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
        const good = URI.file('/coding/c#/project1');
        good.scheme === 'file';
        good.path === '/coding/c#/project1';
        good.fragment === '';
        const bad = URI.parse('file://' + '/coding/c#/project1');
        bad.scheme === 'file';
        bad.path === '/coding/c'; // path is now broken
        bad.fragment === '/project1';
      ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    URI.file = function (path) {
      var authority = _empty;
      // normalize to fwd-slashes on windows,
      // on other systems bwd-slashes are valid
      // filename character, eg /f\oo/ba\r.txt
      if (isWindows) {
        path = path.replace(/\\/g, _slash);
      }
      // check for authority as used in UNC shares
      // or use the path as given
      if (path[0] === _slash && path[1] === _slash) {
        var idx = path.indexOf(_slash, 2);
        if (idx === -1) {
          authority = path.substring(2);
          path = _slash;
        }
        else {
          authority = path.substring(2, idx);
          path = path.substring(idx) || _slash;
        }
      }
      return new _URI('file', authority, path, _empty, _empty);
    };

    URI.from = function (components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };

    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
      if (skipEncoding === void 0) {
        skipEncoding = false;
      }
      return _asFormatted(this, skipEncoding);
    };

    URI.prototype.toJSON = function () {
      return this;
    };

    URI.revive = function (data) {
      if (!data) {
        return data;
      }
      if (data instanceof URI) {
          return data;
      }
      var result = new _URI(data);
      result._formatted = data.external;
      result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
      return result;
    };
    return URI;
  }());
  exports.URI = URI;

  var _pathSepMarker = isWindows ? 1 : undefined;
  // tslint:disable-next-line:class-name
  var _URI = /** @class */ (function (_super) {
    __extends(_URI, _super);
    function _URI() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._formatted = null;
      _this._fsPath = null;
      return _this;
    }
    Object.defineProperty(_URI.prototype, "fsPath", {
      get: function () {
        if (!this._fsPath) {
          this._fsPath = _makeFsPath(this);
        }
        return this._fsPath;
      },
      enumerable: true,
      configurable: true
    });

    _URI.prototype.toString = function (skipEncoding) {
      if (skipEncoding === void 0) {
        skipEncoding = false;
      }
      if (!skipEncoding) {
        if (!this._formatted) {
          this._formatted = _asFormatted(this, false);
        }
        return this._formatted;
      }
      else {
        // we don't cache that
        return _asFormatted(this, true);
      }
    };

    _URI.prototype.toJSON = function () {
      var res = {
          $mid: 1
      };
      // cached state
      if (this._fsPath) {
        res.fsPath = this._fsPath;
        res._sep = _pathSepMarker;
      }
      if (this._formatted) {
        res.external = this._formatted;
      }
      // uri components
      if (this.path) {
        res.path = this.path;
      }
      if (this.scheme) {
        res.scheme = this.scheme;
      }
      if (this.authority) {
        res.authority = this.authority;
      }
      if (this.query) {
        res.query = this.query;
      }
      if (this.fragment) {
        res.fragment = this.fragment;
      }
      return res;
    };
    return _URI;
  }(URI));

  // reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
  var encodeTable = (
    _a = {},
    _a[58 /* Colon */] = '%3A',
    _a[47 /* Slash */] = '%2F',
    _a[63 /* QuestionMark */] = '%3F',
    _a[35 /* Hash */] = '%23',
    _a[91 /* OpenSquareBracket */] = '%5B',
    _a[93 /* CloseSquareBracket */] = '%5D',
    _a[64 /* AtSign */] = '%40',
    _a[33 /* ExclamationMark */] = '%21',
    _a[36 /* DollarSign */] = '%24',
    _a[38 /* Ampersand */] = '%26',
    _a[39 /* SingleQuote */] = '%27',
    _a[40 /* OpenParen */] = '%28',
    _a[41 /* CloseParen */] = '%29',
    _a[42 /* Asterisk */] = '%2A',
    _a[43 /* Plus */] = '%2B',
    _a[44 /* Comma */] = '%2C',
    _a[59 /* Semicolon */] = '%3B',
    _a[61 /* Equals */] = '%3D',
    _a[32 /* Space */] = '%20',
    _a
  );

  function encodeURIComponentFast(uriComponent, allowSlash) {
    var res = undefined;
    var nativeEncodePos = -1;
    for (var pos = 0; pos < uriComponent.length; pos++) {
      var code = uriComponent.charCodeAt(pos);
      // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
      if ((code >= 97 /* a */ && code <= 122 /* z */)
        || (code >= 65 /* A */ && code <= 90 /* Z */)
        || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
        || code === 45 /* Dash */
        || code === 46 /* Period */
        || code === 95 /* Underline */
        || code === 126 /* Tilde */
        || (allowSlash && code === 47 /* Slash */)) {

        // check if we are delaying native encode
        if (nativeEncodePos !== -1) {
          res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
          nativeEncodePos = -1;
        }

        // check if we write into a new string (by default we try to return the param)
        if (res !== undefined) {
          res += uriComponent.charAt(pos);
        }
      }
      else {
        // encoding needed, we need to allocate a new string
        if (res === undefined) {
          res = uriComponent.substr(0, pos);
        }

        // check with default table first
        var escaped = encodeTable[code];
        if (escaped !== undefined) {
          // check if we are delaying native encode
          if (nativeEncodePos !== -1) {
            res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
            nativeEncodePos = -1;
          }

          // append escaped variant to result
          res += escaped;
        }
        else if (nativeEncodePos === -1) {
          // use native encode only when needed
          nativeEncodePos = pos;
        }
      }
    }

    if (nativeEncodePos !== -1) {
      res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
  }

  function encodeURIComponentMinimal(path) {
    var res = undefined;
    for (var pos = 0; pos < path.length; pos++) {
      var code = path.charCodeAt(pos);
      if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
        if (res === undefined) {
          res = path.substr(0, pos);
        }
        res += encodeTable[code];
      }
      else {
        if (res !== undefined) {
          res += path[pos];
        }
      }
    }
    return res !== undefined ? res : path;
  }

  /**
   * Compute `fsPath` for the given uri
   */
  function _makeFsPath(uri) {
    var value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
      // unc path: file://shares/c$/far/boo
      value = "//" + uri.authority + uri.path;
    }
    else if (uri.path.charCodeAt(0) === 47 /* Slash */
      && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
      && uri.path.charCodeAt(2) === 58 /* Colon */) {
      // windows drive letter: file:///c:/far/boo
      value = uri.path[1].toLowerCase() + uri.path.substr(2);
    }
    else {
      // other path
      value = uri.path;
    }
    if (isWindows) {
      value = value.replace(/\//g, '\\');
    }
    return value;
  }

  /**
   * Create the external version of a uri
   */
  function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
    var res = '';
    var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
    if (scheme) {
      res += scheme;
      res += ':';
    }

    if (authority || scheme === 'file') {
      res += _slash;
      res += _slash;
    }

    if (authority) {
      var idx = authority.indexOf('@');
      if (idx !== -1) {
        // <user>@<auth>
        var userinfo = authority.substr(0, idx);
        authority = authority.substr(idx + 1);
        idx = userinfo.indexOf(':');
        if (idx === -1) {
          res += encoder(userinfo, false);
        }
        else {
          // <user>:<pass>@<auth>
          res += encoder(userinfo.substr(0, idx), false);
          res += ':';
          res += encoder(userinfo.substr(idx + 1), false);
        }
        res += '@';
      }
      authority = authority.toLowerCase();
      idx = authority.indexOf(':');
      if (idx === -1) {
        res += encoder(authority, false);
      }
      else {
        // <auth>:<port>
        res += encoder(authority.substr(0, idx), false);
        res += authority.substr(idx);
      }
    }
    if (path) {
      // lower-case windows drive letters in /C:/fff or C:/fff
      if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
        var code = path.charCodeAt(1);
        if (code >= 65 /* A */ && code <= 90 /* Z */) {
          path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
        }
      }
      else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
        var code = path.charCodeAt(0);
        if (code >= 65 /* A */ && code <= 90 /* Z */) {
          path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
        }
      }
      // encode the rest of the path
      res += encoder(path, true);
    }
    if (query) {
      res += '?';
      res += encoder(query, false);
    }
    if (fragment) {
      res += '#';
      res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
  }
});

define(
  'vscode-uri',
  [
    'vscode-uri/index'
  ],
  function (main) { return main; }
);

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/utils/strings',
      [
        "require", "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
      return false;
    }
    for (var i = 0; i < needle.length; i++) {
      if (haystack[i] !== needle[i]) {
        return false;
      }
    }
    return true;
  }
  exports.startsWith = startsWith;

  /**
   * Determines if haystack ends with needle.
   */
  function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
      return haystack.lastIndexOf(needle) === diff;
    }
    if (diff === 0) {
      return haystack === needle;
    }
    return false;
  }
  exports.endsWith = endsWith;

  function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
  }
  exports.convertSimple2RegExpPattern = convertSimple2RegExpPattern;

  function repeat(value, count) {
    var s = '';
    while (count > 0) {
      if ((count & 1) === 1) {
        s += value;
      }
      value += value;
      count = count >>> 1;
    }
    return s;
  }
  exports.repeat = repeat;
});

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/utils/objects',
      [
        "require",
        "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function equals(one, other) {
    if (one === other) {
      return true;
    }
    if (one === null || one === undefined || other === null || other === undefined) {
      return false;
    }
    if (typeof one !== typeof other) {
      return false;
    }
    if (typeof one !== 'object') {
      return false;
    }
    if ((Array.isArray(one)) !== (Array.isArray(other))) {
      return false;
    }
    var i, key;
    if (Array.isArray(one)) {
      if (one.length !== other.length) {
        return false;
      }
      for (i = 0; i < one.length; i++) {
        if (!equals(one[i], other[i])) {
          return false;
        }
      }
    }
    else {
      var oneKeys = [];
      for (key in one) {
        oneKeys.push(key);
      }
      oneKeys.sort();
      var otherKeys = [];
      for (key in other) {
        otherKeys.push(key);
      }
      otherKeys.sort();
      if (!equals(oneKeys, otherKeys)) {
        return false;
      }
      for (i = 0; i < oneKeys.length; i++) {
        if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
          return false;
        }
      }
    }
    return true;
  }
  exports.equals = equals;

  function isNumber(val) {
    return typeof val === 'number';
  }
  exports.isNumber = isNumber;

  function isDefined(val) {
    return typeof val !== 'undefined';
  }
  exports.isDefined = isDefined;

  function isBoolean(val) {
    return typeof val === 'boolean';
  }
  exports.isBoolean = isBoolean;

  function isString(val) {
    return typeof val === 'string';
  }
  exports.isString = isString;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-languageserver-textdocument/lib/umd/main',
      [
        "require",
        "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  /* --------------------------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License. See License.txt in the project root for license information.
   * ------------------------------------------------------------------------------------------ */
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = undefined;
    }

    Object.defineProperty(FullTextDocument.prototype, "uri", {
      get: function () {
        return this._uri;
      },
      enumerable: true,
      configurable: true
    });

    Object.defineProperty(FullTextDocument.prototype, "languageId", {
      get: function () {
        return this._languageId;
      },
      enumerable: true,
      configurable: true
    });

    Object.defineProperty(FullTextDocument.prototype, "version", {
      get: function () {
        return this._version;
      },
      enumerable: true,
      configurable: true
    });

    FullTextDocument.prototype.getText = function (range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };

    FullTextDocument.prototype.update = function (changes, version) {
      for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var change = changes_1[_i];
        if (FullTextDocument.isIncremental(change)) {
          // makes sure start is before end
          var range = getWellformedRange(change.range);
          // update content
          var startOffset = this.offsetAt(range.start);
          var endOffset = this.offsetAt(range.end);
          this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
          // update the offsets
          var startLine = Math.max(range.start.line, 0);
          var endLine = Math.max(range.end.line, 0);
          var lineOffsets = this._lineOffsets;
          var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
          if (endLine - startLine === addedLineOffsets.length) {
            for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
              lineOffsets[i + startLine + 1] = addedLineOffsets[i];
            }
          }
          else {
            if (addedLineOffsets.length < 10000) {
              lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
            }
            else { // avoid too many arguments for splice
              this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
            }
          }
          var diff = change.text.length - (endOffset - startOffset);
          if (diff !== 0) {
            for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
              lineOffsets[i] = lineOffsets[i] + diff;
            }
          }
        }
        else if (FullTextDocument.isFull(change)) {
          this._content = change.text;
          this._lineOffsets = undefined;
        }
        else {
          throw new Error('Unknown change event received');
        }
      }
      this._version = version;
    };

    FullTextDocument.prototype.getLineOffsets = function () {
      if (this._lineOffsets === undefined) {
        this._lineOffsets = computeLineOffsets(this._content, true);
      }
      return this._lineOffsets;
    };

    FullTextDocument.prototype.positionAt = function (offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return { line: 0, character: offset };
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        }
        else {
          low = mid + 1;
        }
      }
      // low is the least x for which the line offset is larger than the current offset
      // or array.length if no line offset is larger than the current offset
      var line = low - 1;
      return {
        line: line,
        character: offset - lineOffsets[line]
      };
    };

    FullTextDocument.prototype.offsetAt = function (position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      }
      if (position.line < 0) {
        return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };

    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
      get: function () {
        return this.getLineOffsets().length;
      },
      enumerable: true,
      configurable: true
    });

    FullTextDocument.isIncremental = function (event) {
      var candidate = event;
      return candidate !== undefined && candidate !== null &&
          typeof candidate.text === 'string' && candidate.range !== undefined &&
          (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    };

    FullTextDocument.isFull = function (event) {
      var candidate = event;
      return candidate !== undefined && candidate !== null &&
          typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    };

    return FullTextDocument;
  }());

  var TextDocument;
  (function (TextDocument) {
    /**
     * Creates a new text document.
     *
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param version The document's initial version number.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;

    /**
     * Updates a TextDocument by modifing its content.
     *
     * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
     * @param changes the changes to apply to the document.
     * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
     *
     */
    function update(document, changes, version) {
      if (document instanceof FullTextDocument) {
        document.update(changes, version);
        return document;
      }
      else {
        throw new Error('TextDocument.update: document must be created by TextDocument.create');
      }
    }
    TextDocument.update = update;
    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort(edits.map(getWellformedEdit), function (a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = text.length;
      for (var i = sortedEdits.length - 1; i >= 0; i--) {
        var e = sortedEdits[i];
        var startOffset = document.offsetAt(e.range.start);
        var endOffset = document.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        }
        else {
          throw new Error('Overlapping edit');
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument.applyEdits = applyEdits;
  })(TextDocument = exports.TextDocument || (exports.TextDocument = {}));

  function mergeSort(data, compare) {
    if (data.length <= 1) {
      // sorted
      return data;
    }
    var p = (data.length / 2) | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        // smaller_equal -> take left to preserve order
        data[i++] = left[leftIdx++];
      }
      else {
        // greater -> take right
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }

  function computeLineOffsets(text, isAtLineStart, textOffset) {
    if (textOffset === void 0) {
      textOffset = 0;
    }
    var result = isAtLineStart ? [textOffset] : [];
    for (var i = 0; i < text.length; i++) {
      var ch = text.charCodeAt(i);
      if (ch === 13 /* CarriageReturn */ || ch === 10 /* LineFeed */) {
        if (ch === 13 /* CarriageReturn */ && i + 1 < text.length && text.charCodeAt(i + 1) === 10 /* LineFeed */) {
          i++;
        }
        result.push(textOffset + i + 1);
      }
    }
    return result;
  }
  function getWellformedRange(range) {
    var start = range.start;
    var end = range.end;
    if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
      return {
        start: end,
        end: start
      };
    }
    return range;
  }
  function getWellformedEdit(textEdit) {
    var range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
      return { newText: textEdit.newText, range: range };
    }
    return textEdit;
  }
});

define(
  'vscode-languageserver-textdocument',
  [
    'vscode-languageserver-textdocument/lib/umd/main'
  ],
  function (main) { return main; }
);

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/jsonLanguageTypes',
      [
        "require",
        "exports",
        "vscode-languageserver-types",
        "vscode-languageserver-textdocument",
        "vscode-languageserver-types"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
  Object.defineProperty(exports, "__esModule", { value: true });
  var vscode_languageserver_types_1 = require("vscode-languageserver-types");
  var vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
  exports.TextDocument = vscode_languageserver_textdocument_1.TextDocument;
  __export(require("vscode-languageserver-types"));

  /**
   * Error codes used by diagnostics
   */
  var ErrorCode;
  (function (ErrorCode) {
    ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
    ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
    ErrorCode[ErrorCode["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
    ErrorCode[ErrorCode["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
    ErrorCode[ErrorCode["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
    ErrorCode[ErrorCode["InvalidUnicode"] = 260] = "InvalidUnicode";
    ErrorCode[ErrorCode["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
    ErrorCode[ErrorCode["InvalidCharacter"] = 262] = "InvalidCharacter";
    ErrorCode[ErrorCode["PropertyExpected"] = 513] = "PropertyExpected";
    ErrorCode[ErrorCode["CommaExpected"] = 514] = "CommaExpected";
    ErrorCode[ErrorCode["ColonExpected"] = 515] = "ColonExpected";
    ErrorCode[ErrorCode["ValueExpected"] = 516] = "ValueExpected";
    ErrorCode[ErrorCode["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
    ErrorCode[ErrorCode["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
    ErrorCode[ErrorCode["TrailingComma"] = 519] = "TrailingComma";
    ErrorCode[ErrorCode["DuplicateKey"] = 520] = "DuplicateKey";
    ErrorCode[ErrorCode["CommentNotPermitted"] = 521] = "CommentNotPermitted";
    ErrorCode[ErrorCode["SchemaResolveError"] = 768] = "SchemaResolveError";
  })(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

  var ClientCapabilities;
  (function (ClientCapabilities) {
    ClientCapabilities.LATEST = {
      textDocument: {
        completion: {
          completionItem: {
            documentationFormat: [vscode_languageserver_types_1.MarkupKind.Markdown, vscode_languageserver_types_1.MarkupKind.PlainText],
            commitCharactersSupport: true
          }
        }
      }
    };
  })(ClientCapabilities = exports.ClientCapabilities || (exports.ClientCapabilities = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-nls/vscode-nls',
      [
        "require",
        "exports"
      ], 
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });

  function format(message, args) {
    var result;
    if (args.length === 0) {
      result = message;
    }
    else {
      result = message.replace(/\{(\d+)\}/g, function (match, rest) {
        var index = rest[0];
        return typeof args[index] !== 'undefined' ? args[index] : match;
      });
    }
    return result;
  }

  function localize(key, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return format(message, args);
  }

  function loadMessageBundle(file) {
    return localize;
  }
  exports.loadMessageBundle = loadMessageBundle;

  function config(opt) {
    return loadMessageBundle;
  }
  exports.config = config;
});

define(
  'vscode-nls',
  [
    'vscode-nls/vscode-nls'
  ],
  function (main) { return main; }
);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/parser/jsonParser',
      [
        "require",
        "exports",
        "jsonc-parser",
        "../utils/objects",
        "../jsonLanguageTypes",
        "vscode-nls"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });

  var Json = require("jsonc-parser");
  var objects_1 = require("../utils/objects");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");
  var nls = require("vscode-nls");

  var localize = nls.loadMessageBundle();
  var formats = {
    'color-hex': {
      errorMessage: localize('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
      pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
    },
    'date-time': {
      errorMessage: localize('dateTimeFormatWarning', 'String is not a RFC3339 date-time.'),
      pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
    },
    'date': {
      errorMessage: localize('dateFormatWarning', 'String is not a RFC3339 date.'),
      pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
    },
    'time': {
      errorMessage: localize('timeFormatWarning', 'String is not a RFC3339 time.'),
      pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
    },
    'email': {
      errorMessage: localize('emailFormatWarning', 'String is not an e-mail address.'),
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    }
  };

  var ASTNodeImpl = /** @class */ (function () {
    function ASTNodeImpl(parent, offset, length) {
      this.offset = offset;
      this.length = length;
      this.parent = parent;
    }

    Object.defineProperty(ASTNodeImpl.prototype, "children", {
      get: function () {
        return [];
      },
      enumerable: true,
      configurable: true
    });

    ASTNodeImpl.prototype.toString = function () {
      return 'type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' + (this.parent ? ' parent: {' + this.parent.toString() + '}' : '');
    };
    return ASTNodeImpl;
  }());

  exports.ASTNodeImpl = ASTNodeImpl;

  var NullASTNodeImpl = /** @class */ (function (_super) {
    __extends(NullASTNodeImpl, _super);
    function NullASTNodeImpl(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'null';
      _this.value = null;
      return _this;
    }
    return NullASTNodeImpl;
  }(ASTNodeImpl));

  exports.NullASTNodeImpl = NullASTNodeImpl;

  var BooleanASTNodeImpl = /** @class */ (function (_super) {
    __extends(BooleanASTNodeImpl, _super);
    function BooleanASTNodeImpl(parent, boolValue, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'boolean';
      _this.value = boolValue;
      return _this;
    }
    return BooleanASTNodeImpl;
  }(ASTNodeImpl));

  exports.BooleanASTNodeImpl = BooleanASTNodeImpl;

  var ArrayASTNodeImpl = /** @class */ (function (_super) {
    __extends(ArrayASTNodeImpl, _super);
    function ArrayASTNodeImpl(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'array';
      _this.items = [];
      return _this;
    }
    Object.defineProperty(ArrayASTNodeImpl.prototype, "children", {
      get: function () {
        return this.items;
      },
      enumerable: true,
      configurable: true
    });
    return ArrayASTNodeImpl;
  }(ASTNodeImpl));

  exports.ArrayASTNodeImpl = ArrayASTNodeImpl;

  var NumberASTNodeImpl = /** @class */ (function (_super) {
    __extends(NumberASTNodeImpl, _super);
    function NumberASTNodeImpl(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'number';
      _this.isInteger = true;
      _this.value = Number.NaN;
      return _this;
    }
    return NumberASTNodeImpl;
  }(ASTNodeImpl));

  exports.NumberASTNodeImpl = NumberASTNodeImpl;

  var StringASTNodeImpl = /** @class */ (function (_super) {
    __extends(StringASTNodeImpl, _super);
    function StringASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'string';
      _this.value = '';
      return _this;
    }
    return StringASTNodeImpl;
  }(ASTNodeImpl));

  exports.StringASTNodeImpl = StringASTNodeImpl;

  var PropertyASTNodeImpl = /** @class */ (function (_super) {
    __extends(PropertyASTNodeImpl, _super);
    function PropertyASTNodeImpl(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'property';
      _this.colonOffset = -1;
      return _this;
    }
    Object.defineProperty(PropertyASTNodeImpl.prototype, "children", {
      get: function () {
        return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
      },
      enumerable: true,
      configurable: true
    });
    return PropertyASTNodeImpl;
  }(ASTNodeImpl));

  exports.PropertyASTNodeImpl = PropertyASTNodeImpl;

  var ObjectASTNodeImpl = /** @class */ (function (_super) {
    __extends(ObjectASTNodeImpl, _super);
    function ObjectASTNodeImpl(parent, offset) {
      var _this = _super.call(this, parent, offset) || this;
      _this.type = 'object';
      _this.properties = [];
      return _this;
    }
    Object.defineProperty(ObjectASTNodeImpl.prototype, "children", {
      get: function () {
        return this.properties;
      },
      enumerable: true,
      configurable: true
    });
    return ObjectASTNodeImpl;
  }(ASTNodeImpl));

  exports.ObjectASTNodeImpl = ObjectASTNodeImpl;

  function asSchema(schema) {
    if (objects_1.isBoolean(schema)) {
      return schema ? {} : { "not": {} };
    }
    return schema;
  }

  exports.asSchema = asSchema;

  var EnumMatch;
  (function (EnumMatch) {
    EnumMatch[EnumMatch["Key"] = 0] = "Key";
    EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
  })(EnumMatch = exports.EnumMatch || (exports.EnumMatch = {}));

  var SchemaCollector = /** @class */ (function () {
    function SchemaCollector(focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      this.focusOffset = focusOffset;
      this.exclude = exclude;
      this.schemas = [];
    }

    SchemaCollector.prototype.add = function (schema) {
      this.schemas.push(schema);
    };

    SchemaCollector.prototype.merge = function (other) {
      var _a;
      (_a = this.schemas).push.apply(_a, other.schemas);
    };

    SchemaCollector.prototype.include = function (node) {
      return (this.focusOffset === -1 || contains(node, this.focusOffset)) && (node !== this.exclude);
    };

    SchemaCollector.prototype.newSub = function () {
      return new SchemaCollector(-1, this.exclude);
    };

    return SchemaCollector;
  }());

  var NoOpSchemaCollector = /** @class */ (function () {
    function NoOpSchemaCollector() {}
    Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
      get: function () { return []; },
      enumerable: true,
      configurable: true
    });

    NoOpSchemaCollector.prototype.add = function (schema) { };
    NoOpSchemaCollector.prototype.merge = function (other) { };
    NoOpSchemaCollector.prototype.include = function (node) { return true; };
    NoOpSchemaCollector.prototype.newSub = function () { return this; };
    NoOpSchemaCollector.instance = new NoOpSchemaCollector();

    return NoOpSchemaCollector;
  }());

  var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
      this.problems = [];
      this.propertiesMatches = 0;
      this.propertiesValueMatches = 0;
      this.primaryValueMatches = 0;
      this.enumValueMatch = false;
      this.enumValues = null;
    }

    ValidationResult.prototype.hasProblems = function () {
      return !!this.problems.length;
    };

    ValidationResult.prototype.mergeAll = function (validationResults) {
      for (var _i = 0, validationResults_1 = validationResults; _i < validationResults_1.length; _i++) {
        var validationResult = validationResults_1[_i];
        this.merge(validationResult);
      }
    };

    ValidationResult.prototype.merge = function (validationResult) {
      this.problems = this.problems.concat(validationResult.problems);
    };

    ValidationResult.prototype.mergeEnumValues = function (validationResult) {
      if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
        this.enumValues = this.enumValues.concat(validationResult.enumValues);
        for (var _i = 0, _a = this.problems; _i < _a.length; _i++) {
          var error = _a[_i];
          if (error.code === jsonLanguageTypes_1.ErrorCode.EnumValueMismatch) {
            error.message = localize('enumWarning', 'Value is not accepted. Valid values: {0}.', this.enumValues.map(function (v) { return JSON.stringify(v); }).join(', '));
          }
        }
      }
    };

    ValidationResult.prototype.mergePropertyMatch = function (propertyValidationResult) {
      this.merge(propertyValidationResult);
      this.propertiesMatches++;
      if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
        this.propertiesValueMatches++;
      }
      if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
        this.primaryValueMatches++;
      }
    };

    ValidationResult.prototype.compare = function (other) {
      var hasProblems = this.hasProblems();
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };
    return ValidationResult;
  }());

  exports.ValidationResult = ValidationResult;

  function newJSONDocument(root, diagnostics) {
    if (diagnostics === void 0) {
      diagnostics = [];
    }
    return new JSONDocument(root, diagnostics, []);
  }
  exports.newJSONDocument = newJSONDocument;

  function getNodeValue(node) {
    return Json.getNodeValue(node);
  }
  exports.getNodeValue = getNodeValue;

  function getNodePath(node) {
    return Json.getNodePath(node);
  }
  exports.getNodePath = getNodePath;

  function contains(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    return offset >= node.offset && offset < (node.offset + node.length) || includeRightBound && offset === (node.offset + node.length);
  }
  exports.contains = contains;

  var JSONDocument = /** @class */ (function () {
    function JSONDocument(root, syntaxErrors, comments) {
      if (syntaxErrors === void 0) {
        syntaxErrors = [];
      }
      if (comments === void 0) {
        comments = [];
      }
      this.root = root;
      this.syntaxErrors = syntaxErrors;
      this.comments = comments;
    }

    JSONDocument.prototype.getNodeFromOffset = function (offset, includeRightBound) {
      if (includeRightBound === void 0) {
        includeRightBound = false;
      }
      if (this.root) {
        return Json.findNodeAtOffset(this.root, offset, includeRightBound);
      }
      return void 0;
    };

    JSONDocument.prototype.visit = function (visitor) {
      if (this.root) {
        var doVisit_1 = function (node) {
          var ctn = visitor(node);
          var children = node.children;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length && ctn; i++) {
              ctn = doVisit_1(children[i]);
            }
          }
          return ctn;
        };
        doVisit_1(this.root);
      }
    };

    JSONDocument.prototype.validate = function (textDocument, schema) {
      if (this.root && schema) {
        var validationResult = new ValidationResult();
        validate(this.root, schema, validationResult, NoOpSchemaCollector.instance);
        return validationResult.problems.map(function (p) {
          var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
          return jsonLanguageTypes_1.Diagnostic.create(range, p.message, p.severity, p.code);
        });
      }
      return null;
    };

    JSONDocument.prototype.getMatchingSchemas = function (schema, focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      var matchingSchemas = new SchemaCollector(focusOffset, exclude);
      if (this.root && schema) {
        validate(this.root, schema, new ValidationResult(), matchingSchemas);
      }
      return matchingSchemas.schemas;
    };
    return JSONDocument;
  }());

  exports.JSONDocument = JSONDocument;

  function validate(node, schema, validationResult, matchingSchemas) {
    if (!node || !matchingSchemas.include(node)) {
      return;
    }
    switch (node.type) {
      case 'object':
        _validateObjectNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'array':
        _validateArrayNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'string':
        _validateStringNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'number':
        _validateNumberNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'property':
        return validate(node.valueNode, schema, validationResult, matchingSchemas);
    }

    _validateNode();
    matchingSchemas.add({ node: node, schema: schema });

    function _validateNode() {
      function matchesType(type) {
        return node.type === type || (type === 'integer' && node.type === 'number' && node.isInteger);
      }
      if (Array.isArray(schema.type)) {
        if (!schema.type.some(matchesType)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage || localize('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', schema.type.join(', '))
          });
        }
      }
      else if (schema.type) {
        if (!matchesType(schema.type)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage || localize('typeMismatchWarning', 'Incorrect type. Expected "{0}".', schema.type)
          });
        }
      }

      if (Array.isArray(schema.allOf)) {
        for (var _i = 0, _a = schema.allOf; _i < _a.length; _i++) {
          var subSchemaRef = _a[_i];
          validate(node, asSchema(subSchemaRef), validationResult, matchingSchemas);
        }
      }

      var notSchema = asSchema(schema.not);
      if (notSchema) {
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, notSchema, subValidationResult, subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('notSchemaWarning', "Matches a schema that is not allowed.")
          });
        }

        for (var _b = 0, _c = subMatchingSchemas.schemas; _b < _c.length; _b++) {
          var ms = _c[_b];
          ms.inverted = !ms.inverted;
          matchingSchemas.add(ms);
        }
      }

      var testAlternatives = function (alternatives, maxOneMatch) {
        var matches = [];
        // remember the best match that is used for error messages
        var bestMatch = null;
        for (var _i = 0, alternatives_1 = alternatives; _i < alternatives_1.length; _i++) {
          var subSchemaRef = alternatives_1[_i];
          var subSchema = asSchema(subSchemaRef);
          var subValidationResult = new ValidationResult();
          var subMatchingSchemas = matchingSchemas.newSub();
          validate(node, subSchema, subValidationResult, subMatchingSchemas);
          if (!subValidationResult.hasProblems()) {
            matches.push(subSchema);
          }
          if (!bestMatch) {
            bestMatch = {
              schema: subSchema,
              validationResult: subValidationResult,
              matchingSchemas: subMatchingSchemas
            };
          }
          else {
            if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
              // no errors, both are equally good matches
              bestMatch.matchingSchemas.merge(subMatchingSchemas);
              bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
              bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
            }
            else {
              var compareResult = subValidationResult.compare(bestMatch.validationResult);
              if (compareResult > 0) {
                // our node is the best matching so far
                bestMatch = {
                  schema: subSchema,
                  validationResult: subValidationResult,
                  matchingSchemas: subMatchingSchemas
                };
              }
              else if (compareResult === 0) {
                // there's already a best matching but we are as good
                bestMatch.matchingSchemas.merge(subMatchingSchemas);
                bestMatch.validationResult.mergeEnumValues(subValidationResult);
              }
            }
          }
        }
        if (matches.length > 1 && maxOneMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: 1 },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('oneOfWarning', "Matches multiple schemas when only one must validate.")
          });
        }
        if (bestMatch !== null) {
          validationResult.merge(bestMatch.validationResult);
          validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
          validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
          matchingSchemas.merge(bestMatch.matchingSchemas);
        }
        return matches.length;
      };

      if (Array.isArray(schema.anyOf)) {
        testAlternatives(schema.anyOf, false);
      }

      if (Array.isArray(schema.oneOf)) {
        testAlternatives(schema.oneOf, true);
      }
      var testBranch = function (schema) {
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, asSchema(schema), subValidationResult, subMatchingSchemas);
        validationResult.merge(subValidationResult);
        validationResult.propertiesMatches += subValidationResult.propertiesMatches;
        validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
        matchingSchemas.merge(subMatchingSchemas);
      };
      var testCondition = function (ifSchema, thenSchema, elseSchema) {
        var subSchema = asSchema(ifSchema);
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, subSchema, subValidationResult, subMatchingSchemas);
        matchingSchemas.merge(subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          if (thenSchema) {
            testBranch(thenSchema);
          }
        }
        else if (elseSchema) {
          testBranch(elseSchema);
        }
      };

      var ifSchema = asSchema(schema.if);
      if (ifSchema) {
        testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
      }

      if (Array.isArray(schema.enum)) {
        var val = getNodeValue(node);
        var enumValueMatch = false;
        for (var _d = 0, _e = schema.enum; _d < _e.length; _d++) {
          var e = _e[_d];
          if (objects_1.equals(val, e)) {
            enumValueMatch = true;
            break;
          }
        }
        validationResult.enumValues = schema.enum;
        validationResult.enumValueMatch = enumValueMatch;
        if (!enumValueMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            code: jsonLanguageTypes_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || localize('enumWarning', 'Value is not accepted. Valid values: {0}.', schema.enum.map(function (v) { return JSON.stringify(v); }).join(', '))
          });
        }
      }

      if (objects_1.isDefined(schema.const)) {
        var val = getNodeValue(node);
        if (!objects_1.equals(val, schema.const)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            code: jsonLanguageTypes_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage || localize('constWarning', 'Value must be {0}.', JSON.stringify(schema.const))
          });
          validationResult.enumValueMatch = false;
        }
        else {
          validationResult.enumValueMatch = true;
        }
        validationResult.enumValues = [schema.const];
      }

      if (schema.deprecationMessage && node.parent) {
        validationResult.problems.push({
          location: { offset: node.parent.offset, length: node.parent.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: schema.deprecationMessage
        });
      }
    }

    function _validateNumberNode(node, schema, validationResult, matchingSchemas) {
      var val = node.value;
      if (objects_1.isNumber(schema.multipleOf)) {
        if (val % schema.multipleOf !== 0) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('multipleOfWarning', 'Value is not divisible by {0}.', schema.multipleOf)
          });
        }
      }

      function getExclusiveLimit(limit, exclusive) {
        if (objects_1.isNumber(exclusive)) {
          return exclusive;
        }
        if (objects_1.isBoolean(exclusive) && exclusive) {
          return limit;
        }
        return void 0;
      }

      function getLimit(limit, exclusive) {
        if (!objects_1.isBoolean(exclusive) || !exclusive) {
          return limit;
        }
        return void 0;
      }

      var exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
      if (objects_1.isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', exclusiveMinimum)
        });
      }

      var exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
      if (objects_1.isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', exclusiveMaximum)
        });
      }

      var minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
      if (objects_1.isNumber(minimum) && val < minimum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('minimumWarning', 'Value is below the minimum of {0}.', minimum)
        });
      }
      var maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
      if (objects_1.isNumber(maximum) && val > maximum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('maximumWarning', 'Value is above the maximum of {0}.', maximum)
        });
      }
    }
    function _validateStringNode(node, schema, validationResult, matchingSchemas) {
      if (objects_1.isNumber(schema.minLength) && node.value.length < schema.minLength) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('minLengthWarning', 'String is shorter than the minimum length of {0}.', schema.minLength)
        });
      }

      if (objects_1.isNumber(schema.maxLength) && node.value.length > schema.maxLength) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('maxLengthWarning', 'String is longer than the maximum length of {0}.', schema.maxLength)
        });
      }
      if (objects_1.isString(schema.pattern)) {
        var regex = new RegExp(schema.pattern);
        if (!regex.test(node.value)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: schema.patternErrorMessage || schema.errorMessage || localize('patternWarning', 'String does not match the pattern of "{0}".', schema.pattern)
          });
        }
      }
      if (schema.format) {
        switch (schema.format) {
          case 'uri':
          case 'uri-reference':
            {
              var errorMessage = void 0;
              if (!node.value) {
                errorMessage = localize('uriEmpty', 'URI expected.');
              }
              else {
                var match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node.value);
                if (!match) {
                  errorMessage = localize('uriMissing', 'URI is expected.');
                }
                else if (!match[2] && schema.format === 'uri') {
                  errorMessage = localize('uriSchemeMissing', 'URI with a scheme is expected.');
                }
              }

              if (errorMessage) {
                validationResult.problems.push({
                  location: { offset: node.offset, length: node.length },
                  severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  message: schema.patternErrorMessage || schema.errorMessage || localize('uriFormatWarning', 'String is not a URI: {0}', errorMessage)
                });
              }
            }
            break;

          case 'color-hex':
          case 'date-time':
          case 'date':
          case 'time':
          case 'email':
            var format = formats[schema.format];
            if (!node.value || !format.pattern.exec(node.value)) {
              validationResult.problems.push({
                location: { offset: node.offset, length: node.length },
                severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                message: schema.patternErrorMessage || schema.errorMessage || format.errorMessage
              });
            }
          default:
        }
      }
    }
    function _validateArrayNode(node, schema, validationResult, matchingSchemas) {
      if (Array.isArray(schema.items)) {
        var subSchemas = schema.items;
        for (var index = 0; index < subSchemas.length; index++) {
          var subSchemaRef = subSchemas[index];
          var subSchema = asSchema(subSchemaRef);
          var itemValidationResult = new ValidationResult();
          var item = node.items[index];
          if (item) {
            validate(item, subSchema, itemValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(itemValidationResult);
          }
          else if (node.items.length >= subSchemas.length) {
            validationResult.propertiesValueMatches++;
          }
        }
        if (node.items.length > subSchemas.length) {
          if (typeof schema.additionalItems === 'object') {
            for (var i = subSchemas.length; i < node.items.length; i++) {
              var itemValidationResult = new ValidationResult();
              validate(node.items[i], schema.additionalItems, itemValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(itemValidationResult);
            }
          }
          else if (schema.additionalItems === false) {
            validationResult.problems.push({
              location: { offset: node.offset, length: node.length },
              severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
              message: localize('additionalItemsWarning', 'Array has too many items according to schema. Expected {0} or fewer.', subSchemas.length)
            });
          }
        }
      }
      else {
        var itemSchema = asSchema(schema.items);
        if (itemSchema) {
          for (var _i = 0, _a = node.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var itemValidationResult = new ValidationResult();
            validate(item, itemSchema, itemValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(itemValidationResult);
          }
        }
      }

      var containsSchema = asSchema(schema.contains);
      if (containsSchema) {
        var doesContain = node.items.some(function (item) {
          var itemValidationResult = new ValidationResult();
          validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance);
          return !itemValidationResult.hasProblems();
        });

        if (!doesContain) {
          validationResult.problems.push({
              location: { offset: node.offset, length: node.length },
              severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
              message: schema.errorMessage || localize('requiredItemMissingWarning', 'Array does not contain required item.')
          });
        }
      }

      if (objects_1.isNumber(schema.minItems) && node.items.length < schema.minItems) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('minItemsWarning', 'Array has too few items. Expected {0} or more.', schema.minItems)
        });
      }

      if (objects_1.isNumber(schema.maxItems) && node.items.length > schema.maxItems) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
          message: localize('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', schema.maxItems)
        });
      }

      if (schema.uniqueItems === true) {
        var values_1 = getNodeValue(node);
        var duplicates = values_1.some(function (value, index) {
          return index !== values_1.lastIndexOf(value);
        });
        if (duplicates) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('uniqueItemsWarning', 'Array has duplicate items.')
          });
        }
      }
    }
    function _validateObjectNode(node, schema, validationResult, matchingSchemas) {
      var seenKeys = Object.create(null);
      var unprocessedProperties = [];
      for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
        var propertyNode = _a[_i];
        var key = propertyNode.keyNode.value;
        seenKeys[key] = propertyNode.valueNode;
        unprocessedProperties.push(key);
      }
      if (Array.isArray(schema.required)) {
        for (var _b = 0, _c = schema.required; _b < _c.length; _b++) {
          var propertyName = _c[_b];
          if (!seenKeys[propertyName]) {
            var keyNode = node.parent && node.parent.type === 'property' && node.parent.keyNode;
            var location = keyNode ? { offset: keyNode.offset, length: keyNode.length } : { offset: node.offset, length: 1 };
            validationResult.problems.push({
              location: location,
              severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
              message: localize('MissingRequiredPropWarning', 'Missing property "{0}".', propertyName)
            });
          }
        }
      }
      var propertyProcessed = function (prop) {
        var index = unprocessedProperties.indexOf(prop);
        while (index >= 0) {
          unprocessedProperties.splice(index, 1);
          index = unprocessedProperties.indexOf(prop);
        }
      };
      if (schema.properties) {
        for (var _d = 0, _e = Object.keys(schema.properties); _d < _e.length; _d++) {
          var propertyName = _e[_d];
          propertyProcessed(propertyName);
          var propertySchema = schema.properties[propertyName];
          var child = seenKeys[propertyName];
          if (child) {
            if (objects_1.isBoolean(propertySchema)) {
              if (!propertySchema) {
                var propertyNode = child.parent;
                validationResult.problems.push({
                  location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                  severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
                });
              }
              else {
                validationResult.propertiesMatches++;
                validationResult.propertiesValueMatches++;
              }
            }
            else {
              var propertyValidationResult = new ValidationResult();
              validate(child, propertySchema, propertyValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          }
        }
      }
      if (schema.patternProperties) {
        for (var _f = 0, _g = Object.keys(schema.patternProperties); _f < _g.length; _f++) {
          var propertyPattern = _g[_f];
          var regex = new RegExp(propertyPattern);
          for (var _h = 0, _j = unprocessedProperties.slice(0); _h < _j.length; _h++) {
            var propertyName = _j[_h];
            if (regex.test(propertyName)) {
              propertyProcessed(propertyName);
              var child = seenKeys[propertyName];
              if (child) {
                var propertySchema = schema.patternProperties[propertyPattern];
                if (objects_1.isBoolean(propertySchema)) {
                  if (!propertySchema) {
                    var propertyNode = child.parent;
                    validationResult.problems.push({
                      location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                      severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                      message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
                    });
                  }
                  else {
                    validationResult.propertiesMatches++;
                    validationResult.propertiesValueMatches++;
                  }
                }
                else {
                  var propertyValidationResult = new ValidationResult();
                  validate(child, propertySchema, propertyValidationResult, matchingSchemas);
                  validationResult.mergePropertyMatch(propertyValidationResult);
                }
              }
            }
          }
        }
      }
      if (typeof schema.additionalProperties === 'object') {
        for (var _k = 0, unprocessedProperties_1 = unprocessedProperties; _k < unprocessedProperties_1.length; _k++) {
          var propertyName = unprocessedProperties_1[_k];
          var child = seenKeys[propertyName];
          if (child) {
            var propertyValidationResult = new ValidationResult();
            validate(child, schema.additionalProperties, propertyValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(propertyValidationResult);
          }
        }
      }
      else if (schema.additionalProperties === false) {
        if (unprocessedProperties.length > 0) {
          for (var _l = 0, unprocessedProperties_2 = unprocessedProperties; _l < unprocessedProperties_2.length; _l++) {
            var propertyName = unprocessedProperties_2[_l];
            var child = seenKeys[propertyName];
            if (child) {
              var propertyNode = child.parent;
              validationResult.problems.push({
                location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
                severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
              });
            }
          }
        }
      }

      if (objects_1.isNumber(schema.maxProperties)) {
        if (node.properties.length > schema.maxProperties) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('MaxPropWarning', 'Object has more properties than limit of {0}.', schema.maxProperties)
          });
        }
      }

      if (objects_1.isNumber(schema.minProperties)) {
        if (node.properties.length < schema.minProperties) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
            message: localize('MinPropWarning', 'Object has fewer properties than the required number of {0}', schema.minProperties)
          });
        }
      }

      if (schema.dependencies) {
        for (var _m = 0, _o = Object.keys(schema.dependencies); _m < _o.length; _m++) {
          var key = _o[_m];
          var prop = seenKeys[key];
          if (prop) {
            var propertyDep = schema.dependencies[key];
            if (Array.isArray(propertyDep)) {
              for (var _p = 0, propertyDep_1 = propertyDep; _p < propertyDep_1.length; _p++) {
                var requiredProp = propertyDep_1[_p];
                if (!seenKeys[requiredProp]) {
                  validationResult.problems.push({
                    location: { offset: node.offset, length: node.length },
                    severity: jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                    message: localize('RequiredDependentPropWarning', 'Object is missing property {0} required by property {1}.', requiredProp, key)
                  });
                }
                else {
                  validationResult.propertiesValueMatches++;
                }
              }
            }
            else {
              var propertySchema = asSchema(propertyDep);
              if (propertySchema) {
                var propertyValidationResult = new ValidationResult();
                validate(node, propertySchema, propertyValidationResult, matchingSchemas);
                validationResult.mergePropertyMatch(propertyValidationResult);
              }
            }
          }
        }
      }

      var propertyNames = asSchema(schema.propertyNames);
      if (propertyNames) {
        for (var _q = 0, _r = node.properties; _q < _r.length; _q++) {
          var f = _r[_q];
          var key = f.keyNode;
          if (key) {
            validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance);
          }
        }
      }
    }
  }

  function parse(textDocument, config) {
    var problems = [];
    var lastProblemOffset = -1;
    var text = textDocument.getText();
    var scanner = Json.createScanner(text, false);
    var commentRanges = config && config.collectComments ? [] : void 0;
    function _scanNext() {
      while (true) {
        var token_1 = scanner.scan();
        _checkScanError();
        switch (token_1) {
          case 12 /* LineCommentTrivia */:
          case 13 /* BlockCommentTrivia */:
            if (Array.isArray(commentRanges)) {
                commentRanges.push(
                  jsonLanguageTypes_1.Range.create(textDocument.positionAt(scanner.getTokenOffset()),
                  textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()))
                );
            }
            break;

          case 15 /* Trivia */:
          case 14 /* LineBreakTrivia */:
              break;

          default:
              return token_1;
        }
      }
    }
    
    function _accept(token) {
      if (scanner.getToken() === token) {
          _scanNext();
          return true;
      }
      return false;
    }

    function _errorAtRange(message, code, startOffset, endOffset, severity) {
      if (severity === void 0) {
        severity = jsonLanguageTypes_1.DiagnosticSeverity.Error;
      }

      if (problems.length === 0 || startOffset !== lastProblemOffset) {
        var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
        problems.push(jsonLanguageTypes_1.Diagnostic.create(range, message, severity, code, textDocument.languageId));
        lastProblemOffset = startOffset;
      }
    }

    function _error(message, code, node, skipUntilAfter, skipUntil) {
      if (node === void 0) {
        node = null;
      }
      if (skipUntilAfter === void 0) {
        skipUntilAfter = [];
      }
      if (skipUntil === void 0) {
        skipUntil = [];
      }
      var start = scanner.getTokenOffset();
      var end = scanner.getTokenOffset() + scanner.getTokenLength();
      if (start === end && start > 0) {
        start--;
        while (start > 0 && /\s/.test(text.charAt(start))) {
          start--;
        }
        end = start + 1;
      }
      _errorAtRange(message, code, start, end);
      if (node) {
        _finalize(node, false);
      }
      if (skipUntilAfter.length + skipUntil.length > 0) {
        var token_2 = scanner.getToken();
        while (token_2 !== 17 /* EOF */) {
          if (skipUntilAfter.indexOf(token_2) !== -1) {
            _scanNext();
            break;
          }
          else if (skipUntil.indexOf(token_2) !== -1) {
            break;
          }
          token_2 = _scanNext();
        }
      }
      return node;
    }

    function _checkScanError() {
      switch (scanner.getTokenError()) {
        case 4 /* InvalidUnicode */:
          _error(localize('InvalidUnicode', 'Invalid unicode sequence in string.'), jsonLanguageTypes_1.ErrorCode.InvalidUnicode);
          return true;

        case 5 /* InvalidEscapeCharacter */:
          _error(localize('InvalidEscapeCharacter', 'Invalid escape character in string.'), jsonLanguageTypes_1.ErrorCode.InvalidEscapeCharacter);
          return true;

        case 3 /* UnexpectedEndOfNumber */:
          _error(localize('UnexpectedEndOfNumber', 'Unexpected end of number.'), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfNumber);
          return true;

        case 1 /* UnexpectedEndOfComment */:
          _error(localize('UnexpectedEndOfComment', 'Unexpected end of comment.'), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfComment);
          return true;

        case 2 /* UnexpectedEndOfString */:
          _error(localize('UnexpectedEndOfString', 'Unexpected end of string.'), jsonLanguageTypes_1.ErrorCode.UnexpectedEndOfString);
          return true;

        case 6 /* InvalidCharacter */:
          _error(localize('InvalidCharacter', 'Invalid characters in string. Control characters must be escaped.'), jsonLanguageTypes_1.ErrorCode.InvalidCharacter);
          return true;
      }
            
      return false;
    }

    function _finalize(node, scanNext) {
      node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
      if (scanNext) {
        _scanNext();
      }
      return node;
    }

    function _parseArray(parent) {
      if (scanner.getToken() !== 3 /* OpenBracketToken */) {
        return null;
      }

      var node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
      _scanNext(); // consume OpenBracketToken
      var count = 0;
      var needsComma = false;
      while (scanner.getToken() !== 4 /* CloseBracketToken */ && scanner.getToken() !== 17 /* EOF */) {
        if (scanner.getToken() === 5 /* CommaToken */) {
          if (!needsComma) {
            _error(localize('ValueExpected', 'Value expected'), jsonLanguageTypes_1.ErrorCode.ValueExpected);
          }
          var commaOffset = scanner.getTokenOffset();
          _scanNext(); // consume comma
          if (scanner.getToken() === 4 /* CloseBracketToken */) {
            if (needsComma) {
              _errorAtRange(localize('TrailingComma', 'Trailing comma'), jsonLanguageTypes_1.ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
            }
            continue;
          }
        }
        else if (needsComma) {
          _error(localize('ExpectedComma', 'Expected comma'), jsonLanguageTypes_1.ErrorCode.CommaExpected);
        }

        var item = _parseValue(node, count++);
        if (!item) {
          _error(localize('PropertyExpected', 'Value expected'), jsonLanguageTypes_1.ErrorCode.ValueExpected, null, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
        }
        else {
          node.items.push(item);
        }
        needsComma = true;
      }

      if (scanner.getToken() !== 4 /* CloseBracketToken */) {
        return _error(localize('ExpectedCloseBracket', 'Expected comma or closing bracket'), jsonLanguageTypes_1.ErrorCode.CommaOrCloseBacketExpected, node);
      }

      return _finalize(node, true);
    }

    function _parseProperty(parent, keysSeen) {
      var node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset());
      var key = _parseString(node);
      if (!key) {
        if (scanner.getToken() === 16 /* Unknown */) {
          // give a more helpful error message
          _error(localize('DoubleQuotesExpected', 'Property keys must be doublequoted'), jsonLanguageTypes_1.ErrorCode.Undefined);
          var keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
          keyNode.value = scanner.getTokenValue();
          key = keyNode;
          _scanNext(); // consume Unknown
        }
        else {
          return null;
        }
      }
      node.keyNode = key;
      var seen = keysSeen[key.value];
      if (seen) {
        _errorAtRange(localize('DuplicateKeyWarning', "Duplicate object key"), jsonLanguageTypes_1.ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, jsonLanguageTypes_1.DiagnosticSeverity.Warning);
        if (typeof seen === 'object') {
          _errorAtRange(
            localize('DuplicateKeyWarning', "Duplicate object key"),
            jsonLanguageTypes_1.ErrorCode.DuplicateKey,
            seen.keyNode.offset,
            seen.keyNode.offset + seen.keyNode.length,
            jsonLanguageTypes_1.DiagnosticSeverity.Warning
          );
        }
        keysSeen[key.value] = true; // if the same key is duplicate again, avoid duplicate error reporting
      }
      else {
        keysSeen[key.value] = node;
      }

      if (scanner.getToken() === 6 /* ColonToken */) {
        node.colonOffset = scanner.getTokenOffset();
        _scanNext(); // consume ColonToken
      }
      else {
        _error(localize('ColonExpected', 'Colon expected'), jsonLanguageTypes_1.ErrorCode.ColonExpected);
        if (scanner.getToken() === 10 /* StringLiteral */ && textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
          node.length = key.length;
          return node;
        }
      }
      var value = _parseValue(node, key.value);
      if (!value) {
        return _error(localize('ValueExpected', 'Value expected'), jsonLanguageTypes_1.ErrorCode.ValueExpected, node, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
      }
      node.valueNode = value;
      node.length = value.offset + value.length - node.offset;
      return node;
    }

    function _parseObject(parent) {
      if (scanner.getToken() !== 1 /* OpenBraceToken */) {
        return null;
      }
      var node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
      var keysSeen = Object.create(null);
      _scanNext(); // consume OpenBraceToken
      var needsComma = false;
      while (scanner.getToken() !== 2 /* CloseBraceToken */ && scanner.getToken() !== 17 /* EOF */) {
        if (scanner.getToken() === 5 /* CommaToken */) {
          if (!needsComma) {
            _error(localize('PropertyExpected', 'Property expected'), jsonLanguageTypes_1.ErrorCode.PropertyExpected);
          }
          var commaOffset = scanner.getTokenOffset();
          _scanNext(); // consume comma
          if (scanner.getToken() === 2 /* CloseBraceToken */) {
            if (needsComma) {
                _errorAtRange(
                  localize('TrailingComma', 'Trailing comma'),
                  jsonLanguageTypes_1.ErrorCode.TrailingComma,
                  commaOffset,
                  commaOffset + 1);
            }
            continue;
          }
        }
        else if (needsComma) {
          _error(localize('ExpectedComma', 'Expected comma'), jsonLanguageTypes_1.ErrorCode.CommaExpected);
        }
        var property = _parseProperty(node, keysSeen);
        if (!property) {
          _error(localize('PropertyExpected', 'Property expected'), jsonLanguageTypes_1.ErrorCode.PropertyExpected, null, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
        else {
          node.properties.push(property);
        }
        needsComma = true;
      }
      if (scanner.getToken() !== 2 /* CloseBraceToken */) {
        return _error(localize('ExpectedCloseBrace', 'Expected comma or closing brace'), jsonLanguageTypes_1.ErrorCode.CommaOrCloseBraceExpected, node);
      }
      return _finalize(node, true);
    }

    function _parseString(parent) {
      if (scanner.getToken() !== 10 /* StringLiteral */) {
        return null;
      }
      var node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
      node.value = scanner.getTokenValue();
      return _finalize(node, true);
    }

    function _parseNumber(parent) {
      if (scanner.getToken() !== 11 /* NumericLiteral */) {
        return null;
      }

      var node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
      if (scanner.getTokenError() === 0 /* None */) {
        var tokenValue = scanner.getTokenValue();
        try {
          var numberValue = JSON.parse(tokenValue);
          if (!objects_1.isNumber(numberValue)) {
              return _error(localize('InvalidNumberFormat', 'Invalid number format.'), jsonLanguageTypes_1.ErrorCode.Undefined, node);
          }
          node.value = numberValue;
        }
        catch (e) {
          return _error(localize('InvalidNumberFormat', 'Invalid number format.'), jsonLanguageTypes_1.ErrorCode.Undefined, node);
        }

        node.isInteger = tokenValue.indexOf('.') === -1;
      }

      return _finalize(node, true);
    }

    function _parseLiteral(parent) {
      var node;
      switch (scanner.getToken()) {
        case 7 /* NullKeyword */:
          return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);

        case 8 /* TrueKeyword */:
          return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);

        case 9 /* FalseKeyword */:
          return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);

        default:
          return null;
      }
    }

    function _parseValue(parent, name) {
      return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
    }

    var _root = null;
    var token = _scanNext();
    if (token !== 17 /* EOF */) {
      _root = _parseValue(null, null);
      if (!_root) {
        _error(localize('Invalid symbol', 'Expected a JSON object, array or literal.'), jsonLanguageTypes_1.ErrorCode.Undefined);
      }
      else if (scanner.getToken() !== 17 /* EOF */) {
        _error(localize('End of file expected', 'End of file expected.'), jsonLanguageTypes_1.ErrorCode.Undefined);
      }
    }
    return new JSONDocument(_root, problems, commentRanges);
  }
  exports.parse = parse;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonSchemaService',
      [
        "require",
        "exports",
        "jsonc-parser",
        "vscode-uri",
        "../utils/strings",
        "../parser/jsonParser",
        "vscode-nls"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var Json = require("jsonc-parser");
  var vscode_uri_1 = require("vscode-uri");
  var Strings = require("../utils/strings");
  var Parser = require("../parser/jsonParser");
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();
  var FilePatternAssociation = /** @class */ (function () {
    function FilePatternAssociation(pattern) {
      try {
        this.patternRegExp = new RegExp(Strings.convertSimple2RegExpPattern(pattern) + '$');
      }
      catch (e) {
        // invalid pattern
        this.patternRegExp = null;
      }
      this.schemas = [];
    }

    FilePatternAssociation.prototype.addSchema = function (id) {
      this.schemas.push(id);
    };

    FilePatternAssociation.prototype.matchesPattern = function (fileName) {
      return this.patternRegExp && this.patternRegExp.test(fileName);
    };

    FilePatternAssociation.prototype.getSchemas = function () {
      return this.schemas;
    };

    return FilePatternAssociation;
  }());

  var SchemaHandle = /** @class */ (function () {
    function SchemaHandle(service, url, unresolvedSchemaContent) {
      this.service = service;
      this.url = url;
      this.dependencies = {};
      if (unresolvedSchemaContent) {
        this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
      }
    }

    SchemaHandle.prototype.getUnresolvedSchema = function () {
      if (!this.unresolvedSchema) {
        this.unresolvedSchema = this.service.loadSchema(this.url);
      }
      return this.unresolvedSchema;
    };

    SchemaHandle.prototype.getResolvedSchema = function () {
      var _this = this;
      if (!this.resolvedSchema) {
        this.resolvedSchema = this.getUnresolvedSchema().then(function (unresolved) {
          return _this.service.resolveSchemaContent(unresolved, _this.url, _this.dependencies);
        });
      }
      return this.resolvedSchema;
    };

    SchemaHandle.prototype.clearSchema = function () {
      this.resolvedSchema = null;
      this.unresolvedSchema = null;
      this.dependencies = {};
    };

    return SchemaHandle;
  }());

  var UnresolvedSchema = /** @class */ (function () {
    function UnresolvedSchema(schema, errors) {
      if (errors === void 0) {
        errors = [];
      }
      this.schema = schema;
      this.errors = errors;
    }
    return UnresolvedSchema;
  }());

  exports.UnresolvedSchema = UnresolvedSchema;

  var ResolvedSchema = /** @class */ (function () {
    function ResolvedSchema(schema, errors) {
      if (errors === void 0) {
        errors = [];
      }
      this.schema = schema;
      this.errors = errors;
    }

    ResolvedSchema.prototype.getSection = function (path) {
      return Parser.asSchema(this.getSectionRecursive(path, this.schema));
    };

    ResolvedSchema.prototype.getSectionRecursive = function (path, schema) {
      if (!schema || typeof schema === 'boolean' || path.length === 0) {
        return schema;
      }

      var next = path.shift();
      if (schema.properties && typeof schema.properties[next]) {
        return this.getSectionRecursive(path, schema.properties[next]);
      }
      else if (schema.patternProperties) {
        for (var _i = 0, _a = Object.keys(schema.patternProperties); _i < _a.length; _i++) {
          var pattern = _a[_i];
          var regex = new RegExp(pattern);
          if (regex.test(next)) {
            return this.getSectionRecursive(path, schema.patternProperties[pattern]);
          }
        }
      }
      else if (typeof schema.additionalProperties === 'object') {
        return this.getSectionRecursive(path, schema.additionalProperties);
      }
      else if (next.match('[0-9]+')) {
        if (Array.isArray(schema.items)) {
          var index = parseInt(next, 10);
          if (!isNaN(index) && schema.items[index]) {
            return this.getSectionRecursive(path, schema.items[index]);
          }
        }
        else if (schema.items) {
          return this.getSectionRecursive(path, schema.items);
        }
      }
      return null;
    };
    return ResolvedSchema;
  }());

  exports.ResolvedSchema = ResolvedSchema;

  var JSONSchemaService = /** @class */ (function () {
    function JSONSchemaService(requestService, contextService, promiseConstructor) {
      this.contextService = contextService;
      this.requestService = requestService;
      this.promiseConstructor = promiseConstructor || Promise;
      this.callOnDispose = [];
      this.contributionSchemas = {};
      this.contributionAssociations = {};
      this.schemasById = {};
      this.filePatternAssociations = [];
      this.filePatternAssociationById = {};
      this.registeredSchemasIds = {};
    }

    JSONSchemaService.prototype.getRegisteredSchemaIds = function (filter) {
      return Object.keys(this.registeredSchemasIds).filter(function (id) {
        var scheme = vscode_uri_1.URI.parse(id).scheme;
        return scheme !== 'schemaservice' && (!filter || filter(scheme));
      });
    };

    Object.defineProperty(JSONSchemaService.prototype, "promise", {
      get: function () {
          return this.promiseConstructor;
      },
      enumerable: true,
      configurable: true
    });

    JSONSchemaService.prototype.dispose = function () {
      while (this.callOnDispose.length > 0) {
        this.callOnDispose.pop()();
      }
    };

    JSONSchemaService.prototype.onResourceChange = function (uri) {
      var _this = this;
      var hasChanges = false;
      uri = this.normalizeId(uri);
      var toWalk = [uri];
      var all = Object.keys(this.schemasById).map(function (key) { return _this.schemasById[key]; });
      while (toWalk.length) {
        var curr = toWalk.pop();
        for (var i = 0; i < all.length; i++) {
          var handle = all[i];
          if (handle && (handle.url === curr || handle.dependencies[curr])) {
            if (handle.url !== curr) {
              toWalk.push(handle.url);
            }
            handle.clearSchema();
            all[i] = undefined;
            hasChanges = true;
          }
        }
      }
      return hasChanges;
    };

    JSONSchemaService.prototype.normalizeId = function (id) {
      // remove trailing '#', normalize drive capitalization
      try {
        return vscode_uri_1.URI.parse(id).toString();
      }
      catch (e) {
        return id;
      }
    };

    JSONSchemaService.prototype.setSchemaContributions = function (schemaContributions) {
      if (schemaContributions.schemas) {
        var schemas = schemaContributions.schemas;
        for (var id in schemas) {
          var normalizedId = this.normalizeId(id);
          this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
        }
      }
      if (schemaContributions.schemaAssociations) {
        var schemaAssociations = schemaContributions.schemaAssociations;
        for (var pattern in schemaAssociations) {
          var associations = schemaAssociations[pattern];
          this.contributionAssociations[pattern] = associations;
          var fpa = this.getOrAddFilePatternAssociation(pattern);
          for (var _i = 0, associations_1 = associations; _i < associations_1.length; _i++) {
            var schemaId = associations_1[_i];
            var id = this.normalizeId(schemaId);
            fpa.addSchema(id);
          }
        }
      }
    };

    JSONSchemaService.prototype.addSchemaHandle = function (id, unresolvedSchemaContent) {
      var schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
      this.schemasById[id] = schemaHandle;
      return schemaHandle;
    };

    JSONSchemaService.prototype.getOrAddSchemaHandle = function (id, unresolvedSchemaContent) {
      return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
    };

    JSONSchemaService.prototype.getOrAddFilePatternAssociation = function (pattern) {
      var fpa = this.filePatternAssociationById[pattern];
      if (!fpa) {
        fpa = new FilePatternAssociation(pattern);
        this.filePatternAssociationById[pattern] = fpa;
        this.filePatternAssociations.push(fpa);
      }
      return fpa;
    };

    JSONSchemaService.prototype.registerExternalSchema = function (uri, filePatterns, unresolvedSchemaContent) {
      if (filePatterns === void 0) {
        filePatterns = null;
      }
      var id = this.normalizeId(uri);
      this.registeredSchemasIds[id] = true;
      if (filePatterns) {
        for (var _i = 0, filePatterns_1 = filePatterns; _i < filePatterns_1.length; _i++) {
          var pattern = filePatterns_1[_i];
          this.getOrAddFilePatternAssociation(pattern).addSchema(id);
        }
      }
      return unresolvedSchemaContent ? this.addSchemaHandle(id, unresolvedSchemaContent) : this.getOrAddSchemaHandle(id);
    };

    JSONSchemaService.prototype.clearExternalSchemas = function () {
      this.schemasById = {};
      this.filePatternAssociations = [];
      this.filePatternAssociationById = {};
      this.registeredSchemasIds = {};
      for (var id in this.contributionSchemas) {
        this.schemasById[id] = this.contributionSchemas[id];
        this.registeredSchemasIds[id] = true;
      }
      for (var pattern in this.contributionAssociations) {
        var fpa = this.getOrAddFilePatternAssociation(pattern);
        for (var _i = 0, _a = this.contributionAssociations[pattern]; _i < _a.length; _i++) {
          var schemaId = _a[_i];
          var id = this.normalizeId(schemaId);
          fpa.addSchema(id);
        }
      }
    };

    JSONSchemaService.prototype.getResolvedSchema = function (schemaId) {
      var id = this.normalizeId(schemaId);
      var schemaHandle = this.schemasById[id];
      if (schemaHandle) {
        return schemaHandle.getResolvedSchema();
      }
      return this.promise.resolve(null);
    };

    JSONSchemaService.prototype.loadSchema = function (url) {
      if (!this.requestService) {
        var errorMessage = localize('json.schema.norequestservice', 'Unable to load schema from \'{0}\'. No schema request service available', toDisplayString(url));
        return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
      }
      return this.requestService(url).then(function (content) {
        if (!content) {
            var errorMessage = localize('json.schema.nocontent', 'Unable to load schema from \'{0}\': No content.', toDisplayString(url));
            return new UnresolvedSchema({}, [errorMessage]);
        }
        var schemaContent = {};
        var jsonErrors = [];
        schemaContent = Json.parse(content, jsonErrors);
        var errors = jsonErrors.length ? [localize('json.schema.invalidFormat', 'Unable to parse content from \'{0}\': Parse error at offset {1}.', toDisplayString(url), jsonErrors[0].offset)] : [];
        return new UnresolvedSchema(schemaContent, errors);
      }, function (error) {
        var errorMessage = error.toString();
        var errorSplit = error.toString().split('Error: ');
        if (errorSplit.length > 1) {
          // more concise error message, URL and context are attached by caller anyways
          errorMessage = errorSplit[1];
        }
        if (Strings.endsWith(errorMessage, '.')) {
          errorMessage = errorMessage.substr(0, errorMessage.length - 1);
        }
        return new UnresolvedSchema({}, [localize('json.schema.nocontent', 'Unable to load schema from \'{0}\': {1}.', toDisplayString(url), errorMessage)]);
      });
    };

    JSONSchemaService.prototype.resolveSchemaContent = function (schemaToResolve, schemaURL, dependencies) {
      var _this = this;
      var resolveErrors = schemaToResolve.errors.slice(0);
      var schema = schemaToResolve.schema;
      if (schema.$schema) {
        var id = this.normalizeId(schema.$schema);
        if (id === 'http://json-schema.org/draft-03/schema') {
          return this.promise.resolve(new ResolvedSchema({}, [localize('json.schema.draft03.notsupported', "Draft-03 schemas are not supported.")]));
        }
        if (id === 'https://json-schema.org/draft/2019-09/schema') {
          schemaToResolve.errors.push(localize('json.schema.draft201909.notsupported', "Draft 2019-09 schemas are not yet fully supported."));
        }
      }

      var contextService = this.contextService;
      var findSection = function (schema, path) {
        if (!path) {
          return schema;
        }
        var current = schema;
        if (path[0] === '/') {
          path = path.substr(1);
        }
        path.split('/').some(function (part) {
          current = current[part];
          return !current;
        });
        return current;
      };

      var merge = function (target, sourceRoot, sourceURI, path) {
        var section = findSection(sourceRoot, path);
        if (section) {
          for (var key in section) {
            if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
              target[key] = section[key];
            }
          }
        }
        else {
          resolveErrors.push(localize('json.schema.invalidref', '$ref \'{0}\' in \'{1}\' can not be resolved.', path, sourceURI));
        }
      };

      var resolveExternalLink = function (node, uri, linkPath, parentSchemaURL, parentSchemaDependencies) {
        if (contextService && !/^\w+:\/\/.*/.test(uri)) {
          uri = contextService.resolveRelativePath(uri, parentSchemaURL);
        }
        uri = _this.normalizeId(uri);
        var referencedHandle = _this.getOrAddSchemaHandle(uri);
        return referencedHandle.getUnresolvedSchema().then(function (unresolvedSchema) {
          parentSchemaDependencies[uri] = true;
          if (unresolvedSchema.errors.length) {
            var loc = linkPath ? uri + '#' + linkPath : uri;
            resolveErrors.push(localize('json.schema.problemloadingref', 'Problems loading reference \'{0}\': {1}', loc, unresolvedSchema.errors[0]));
          }
          merge(node, unresolvedSchema.schema, uri, linkPath);
          return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
        });
      };

      var resolveRefs = function (node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
        if (!node || typeof node !== 'object') {
          return Promise.resolve(null);
        }
        var toWalk = [node];
        var seen = [];
        var openPromises = [];
        var collectEntries = function () {
          var entries = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
          }
          for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
            var entry = entries_1[_a];
            if (typeof entry === 'object') {
              toWalk.push(entry);
            }
          }
        };

        var collectMapEntries = function () {
          var maps = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
          }
          for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
            var map = maps_1[_a];
            if (typeof map === 'object') {
              for (var key in map) {
                var entry = map[key];
                if (typeof entry === 'object') {
                  toWalk.push(entry);
                }
              }
            }
          }
        };

        var collectArrayEntries = function () {
          var arrays = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
          }
          for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
            var array = arrays_1[_a];
            if (Array.isArray(array)) {
              for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
                var entry = array_1[_b];
                if (typeof entry === 'object') {
                  toWalk.push(entry);
                }
              }
            }
          }
        };

        var handleRef = function (next) {
          var seenRefs = [];
          while (next.$ref) {
            var ref = next.$ref;
            var segments = ref.split('#', 2);
            delete next.$ref;
            if (segments[0].length > 0) {
              openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
              return;
            }
            else {
              if (seenRefs.indexOf(ref) === -1) {
                  merge(next, parentSchema, parentSchemaURL, segments[1]); // can set next.$ref again, use seenRefs to avoid circle
                  seenRefs.push(ref);
              }
            }
          }
          collectEntries(next.items, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else);
          collectMapEntries(next.definitions, next.properties, next.patternProperties, next.dependencies);
          collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.items);
        };
        while (toWalk.length) {
          var next = toWalk.pop();
          if (seen.indexOf(next) >= 0) {
            continue;
          }
          seen.push(next);
          handleRef(next);
        }
        return _this.promise.all(openPromises);
      };

      return resolveRefs(schema, schema, schemaURL, dependencies).then(function (_) { return new ResolvedSchema(schema, resolveErrors); });
    };

    JSONSchemaService.prototype.getSchemaForResource = function (resource, document) {
      // first use $schema if present
      if (document && document.root && document.root.type === 'object') {
        var schemaProperties = document.root.properties.filter(function (p) { return (p.keyNode.value === '$schema') && p.valueNode && p.valueNode.type === 'string'; });
        if (schemaProperties.length > 0) {
          var schemeId = Parser.getNodeValue(schemaProperties[0].valueNode);
          if (schemeId && Strings.startsWith(schemeId, '.') && this.contextService) {
            schemeId = this.contextService.resolveRelativePath(schemeId, resource);
          }
          if (schemeId) {
            var id = this.normalizeId(schemeId);
            return this.getOrAddSchemaHandle(id).getResolvedSchema();
          }
        }
      }

      var seen = Object.create(null);
      var schemas = [];
      for (var _i = 0, _a = this.filePatternAssociations; _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry.matchesPattern(resource)) {
          for (var _b = 0, _c = entry.getSchemas(); _b < _c.length; _b++) {
            var schemaId = _c[_b];
            if (!seen[schemaId]) {
              schemas.push(schemaId);
              seen[schemaId] = true;
            }
          }
        }
      }

      if (schemas.length > 0) {
        return this.createCombinedSchema(resource, schemas).getResolvedSchema();
      }

      return this.promise.resolve(null);
    };

    JSONSchemaService.prototype.createCombinedSchema = function (resource, schemaIds) {
      if (schemaIds.length === 1) {
        return this.getOrAddSchemaHandle(schemaIds[0]);
      }
      else {
        var combinedSchemaId = 'schemaservice://combinedSchema/' + encodeURIComponent(resource);
        var combinedSchema = {
          allOf: schemaIds.map(function (schemaId) { return ({ $ref: schemaId }); })
        };
        return this.addSchemaHandle(combinedSchemaId, combinedSchema);
      }
    };
    return JSONSchemaService;
  }());

  exports.JSONSchemaService = JSONSchemaService;
  function toDisplayString(url) {
    try {
      var uri = vscode_uri_1.URI.parse(url);
      if (uri.scheme === 'file') {
        return uri.fsPath;
      }
    }
    catch (e) {
      // ignore
    }
    return url;
  }
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/utils/strings',
      [
        "require", "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
      return false;
    }

    for (var i = 0; i < needle.length; i++) {
      if (haystack[i] !== needle[i]) {
        return false;
      }
    }
    return true;
  }

  exports.startsWith = startsWith;

  /**
   * Determines if haystack ends with needle.
   */
  function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
      return haystack.lastIndexOf(needle) === diff;
    }
    else if (diff === 0) {
      return haystack === needle;
    }
    else {
      return false;
    }
  }

  exports.endsWith = endsWith;

  function convertSimple2RegExp(pattern) {
    var match = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
    return match
      ? convertRegexString2RegExp(match[1], match[2])
      : convertGlobalPattern2RegExp(pattern);
  }

  exports.convertSimple2RegExp = convertSimple2RegExp;

  function convertGlobalPattern2RegExp(pattern) {
    return new RegExp(pattern
      .replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&')
      .replace(/[\*]/g, '.*') + '$');
  }

  function convertRegexString2RegExp(pattern, flag) {
    return new RegExp(pattern, flag);
  }

  function convertSimple2RegExpPattern(pattern) {
    return pattern
        .replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&')
        .replace(/[\*]/g, '.*');
  }
  exports.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
});

var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);

  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/services/yamlSchemaService',
      [
        "require",
        "exports",
        "vscode-json-languageservice/lib/umd/services/jsonSchemaService",
        "vscode-nls",
        "../utils/strings"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonSchemaService_1 = require("vscode-json-languageservice/lib/umd/services/jsonSchemaService");
  var nls = require("vscode-nls");
  var strings_1 = require("../utils/strings");
  var localize = nls.loadMessageBundle();

  var FilePatternAssociation = /** @class */ (function () {
    function FilePatternAssociation(pattern) {
      try {
        this.patternRegExp = new RegExp(strings_1.convertSimple2RegExpPattern(pattern) + '$');
      }
      catch (e) {
        // invalid pattern
        this.patternRegExp = null;
      }
      this.schemas = [];
    }

    FilePatternAssociation.prototype.addSchema = function (id) {
      this.schemas.push(id);
    };

    FilePatternAssociation.prototype.matchesPattern = function (fileName) {
      return this.patternRegExp && this.patternRegExp.test(fileName);
    };

    FilePatternAssociation.prototype.getSchemas = function () {
      return this.schemas;
    };

    return FilePatternAssociation;
  }());

  exports.FilePatternAssociation = FilePatternAssociation;

  var YAMLSchemaService = /** @class */ (function (_super) {
    __extends(YAMLSchemaService, _super);
    function YAMLSchemaService(requestService, contextService, promiseConstructor) {
      var _this = _super.call(this, requestService, contextService, promiseConstructor) || this;
      _this.customSchemaProvider = undefined;
      return _this;
    }

    YAMLSchemaService.prototype.registerCustomSchemaProvider = function (customSchemaProvider) {
      this.customSchemaProvider = customSchemaProvider;
    };

    //tslint:disable
    YAMLSchemaService.prototype.resolveSchemaContent = function (schemaToResolve, schemaURL, dependencies) {
      var _this = this;
      var resolveErrors = schemaToResolve.errors.slice(0);
      var schema = schemaToResolve.schema;
      var contextService = this.contextService;
      var findSection = function (schema, path) {
        if (!path) {
          return schema;
        }
        var current = schema;
        if (path[0] === '/') {
          path = path.substr(1);
        }
        path.split('/').some(function (part) {
          current = current[part];
          return !current;
        });
        return current;
      };

      var merge = function (target, sourceRoot, sourceURI, path) {
        var section = findSection(sourceRoot, path);
        if (section) {
          for (var key in section) {
            if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
              target[key] = section[key];
            }
          }
        }
        else {
          resolveErrors.push(localize('json.schema.invalidref', "$ref '{0}' in '{1}' can not be resolved.", path, sourceURI));
        }
      };

      var resolveExternalLink = function (node, uri, linkPath, parentSchemaURL, parentSchemaDependencies) {
        if (contextService && !/^\w+:\/\/.*/.test(uri)) {
          uri = contextService.resolveRelativePath(uri, parentSchemaURL);
        }
        uri = _this.normalizeId(uri);
        var referencedHandle = _this.getOrAddSchemaHandle(uri);
        return referencedHandle.getUnresolvedSchema().then(function (unresolvedSchema) {
          parentSchemaDependencies[uri] = true;
          if (unresolvedSchema.errors.length) {
            var loc = linkPath ? uri + '#' + linkPath : uri;
            resolveErrors.push(localize('json.schema.problemloadingref', "Problems loading reference '{0}': {1}", loc, unresolvedSchema.errors[0]));
          }
          merge(node, unresolvedSchema.schema, uri, linkPath);
          return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
        });
      };

      var resolveRefs = function (node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
        if (!node || typeof node !== 'object') {
          return Promise.resolve(null);
        }

        var toWalk = [node];
        var seen = [];
        var openPromises = [];
        var collectEntries = function () {
          var e_1, _a;
          var entries = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
          }
          try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
              var entry = entries_1_1.value;
              if (typeof entry === 'object') {
                toWalk.push(entry);
              }
            }
          }
          catch (e_1_1) {
            e_1 = { error: e_1_1 };
          }
          finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return))
                _a.call(entries_1);
            }
            finally {
              if (e_1)
                throw e_1.error;
            }
          }
        };
        var collectMapEntries = function () {
          var e_2, _a;
          var maps = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
          }
          try {
            for (var maps_1 = __values(maps), maps_1_1 = maps_1.next(); !maps_1_1.done; maps_1_1 = maps_1.next()) {
              var map = maps_1_1.value;
              if (typeof map === 'object') {
                for (var key in map) {
                  var entry = map[key];
                  if (typeof entry === 'object') {
                    toWalk.push(entry);
                  }
                }
              }
            }
          }
          catch (e_2_1) {
            e_2 = { error: e_2_1 };
          }
          finally {
            try {
              if (maps_1_1 && !maps_1_1.done && (_a = maps_1.return))
                _a.call(maps_1);
            }
            finally {
              if (e_2)
                throw e_2.error;
            }
          }
        };
        var collectArrayEntries = function () {
          var e_3, _a, e_4, _b;
          var arrays = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
          }
          try {
            for (var arrays_1 = __values(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
              var array = arrays_1_1.value;
              if (Array.isArray(array)) {
                try {
                  for (var array_1 = (e_4 = void 0, __values(array)), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                    var entry = array_1_1.value;
                    if (typeof entry === 'object') {
                      toWalk.push(entry);
                    }
                  }
                }
                catch (e_4_1) {
                  e_4 = { error: e_4_1 };
                }
                finally {
                  try {
                    if (array_1_1 && !array_1_1.done && (_b = array_1.return))
                      _b.call(array_1);
                  }
                  finally {
                    if (e_4)
                      throw e_4.error;
                  }
                }
              }
            }
          }
          catch (e_3_1) {
            e_3 = { error: e_3_1 };
          }
          finally {
            try {
              if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return))
                _a.call(arrays_1);
            }
            finally {
              if (e_3)
                throw e_3.error;
            }
          }
        };
        var handleRef = function (next) {
          var seenRefs = [];
          while (next.$ref) {
            var ref = next.$ref;
            var segments = ref.split('#', 2);
            delete next.$ref;
            if (segments[0].length > 0) {
              openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
              return;
            }
            else {
              if (seenRefs.indexOf(ref) === -1) {
                merge(next, parentSchema, parentSchemaURL, segments[1]); // can set next.$ref again, use seenRefs to avoid circle
                seenRefs.push(ref);
              }
            }
          }
          collectEntries(next.items, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else);
          collectMapEntries(next.definitions, next.properties, next.patternProperties, next.dependencies);
          collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.items, next.schemaSequence);
        };

        while (toWalk.length) {
          var next = toWalk.pop();
          if (seen.indexOf(next) >= 0) {
            continue;
          }
          seen.push(next);
          handleRef(next);
        }
        return Promise.all(openPromises);
      };

      return resolveRefs(schema, schema, schemaURL, dependencies).then(function (_) { return new jsonSchemaService_1.ResolvedSchema(schema, resolveErrors); });
    };

    //tslint:enable
    YAMLSchemaService.prototype.getSchemaForResource = function (resource, doc) {
      var _this = this;
      if (doc === void 0) { doc = undefined; }
      var resolveSchema = function () {
        var e_5, _a, e_6, _b;
        var seen = Object.create(null);
        var schemas = [];
        try {
          for (var _c = __values(_this.filePatternAssociations), _d = _c.next(); !_d.done; _d = _c.next()) {
            var entry = _d.value;
            if (entry.matchesPattern(resource)) {
              try {
                for (var _e = (e_6 = void 0, __values(entry.getSchemas())), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var schemaId = _f.value;
                  if (!seen[schemaId]) {
                    schemas.push(schemaId);
                    seen[schemaId] = true;
                  }
                }
              }
              catch (e_6_1) {
                e_6 = { error: e_6_1 };
              }
              finally {
                try {
                  if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
                }
                finally {
                  if (e_6)
                    throw e_6.error;
                }
              }
            }
          }
        }
        catch (e_5_1) {
          e_5 = { error: e_5_1 };
        }
        finally {
          try {
            if (_d && !_d.done && (_a = _c.return))
              _a.call(_c);
          }
          finally {
            if (e_5)
              throw e_5.error;
          }
        }

        if (schemas.length > 0) {
          return _super.prototype.createCombinedSchema.call(_this, resource, schemas)
            .getResolvedSchema()
            .then(function (schema) {
            if (schema.schema &&
              schema.schema.schemaSequence &&
              schema.schema.schemaSequence[doc.currentDocIndex]) {
              return new jsonSchemaService_1.ResolvedSchema(schema.schema.schemaSequence[doc.currentDocIndex]);
            }
            return schema;
          });
        }
        return Promise.resolve(null);
      };

      if (this.customSchemaProvider) {
        return this.customSchemaProvider(resource)
          .then(function (schemaUri) {
          if (!schemaUri) {
            return resolveSchema();
          }
          return _this.loadSchema(schemaUri).then(function (unsolvedSchema) {
            return _this.resolveSchemaContent(unsolvedSchema, schemaUri, []).then(function (schema) {
              if (schema.schema &&
                schema.schema.schemaSequence &&
                schema.schema.schemaSequence[doc.currentDocIndex]) {
                return new jsonSchemaService_1.ResolvedSchema(schema.schema.schemaSequence[doc.currentDocIndex]);
              }
              return schema;
            });
          });
        })
            .then(function (schema) { return schema; }, function (err) { return resolveSchema(); });
      }
      else {
        return resolveSchema();
      }
    };

    /**
     * Everything below here is needed because we're importing from vscode-json-languageservice umd and we need
     * to provide a wrapper around the javascript methods we are calling since they have no type
     */
    YAMLSchemaService.prototype.normalizeId = function (id) {
      return _super.prototype.normalizeId.call(this, id);
    };

    YAMLSchemaService.prototype.getOrAddSchemaHandle = function (id, unresolvedSchemaContent) {
      return _super.prototype.getOrAddSchemaHandle.call(this, id, unresolvedSchemaContent);
    };

    // tslint:disable-next-line: no-any
    YAMLSchemaService.prototype.loadSchema = function (schemaUri) {
      return _super.prototype.loadSchema.call(this, schemaUri);
    };

    YAMLSchemaService.prototype.registerExternalSchema = function (uri, filePatterns, unresolvedSchema) {
      return _super.prototype.registerExternalSchema.call(this, uri, filePatterns, unresolvedSchema);
    };

    YAMLSchemaService.prototype.clearExternalSchemas = function () {
      _super.prototype.clearExternalSchemas.call(this);
    };

    YAMLSchemaService.prototype.setSchemaContributions = function (schemaContributions) {
      _super.prototype.setSchemaContributions.call(this, schemaContributions);
    };

    YAMLSchemaService.prototype.getRegisteredSchemaIds = function (filter) {
      return _super.prototype.getRegisteredSchemaIds.call(this, filter);
    };

    YAMLSchemaService.prototype.getResolvedSchema = function (schemaId) {
      return _super.prototype.getResolvedSchema.call(this, schemaId);
    };

    YAMLSchemaService.prototype.onResourceChange = function (uri) {
      return _super.prototype.onResourceChange.call(this, uri);
    };

    return YAMLSchemaService;
  }(jsonSchemaService_1.JSONSchemaService));

  exports.YAMLSchemaService = YAMLSchemaService;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vs/language/yaml/languageservice/utils/objects',["require", "exports"], factory);
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  // tslint:disable-next-line: no-any
  function equals(one, other) {
    if (one === other) {
      return true;
    }
    if (one === null ||
      one === undefined ||
      other === null ||
      other === undefined) {
      return false;
    }

    if (typeof one !== typeof other) {
      return false;
    }

    if (typeof one !== 'object') {
      return false;
    }

    if (Array.isArray(one) !== Array.isArray(other)) {
      return false;
    }

    var i, key;
    if (Array.isArray(one)) {
      if (one.length !== other.length) {
        return false;
      }
      for (i = 0; i < one.length; i++) {
        if (!equals(one[i], other[i])) {
          return false;
        }
      }
    }
    else {
      var oneKeys = [];
      for (key in one) {
        oneKeys.push(key);
      }
      oneKeys.sort();
      var otherKeys = [];
      for (key in other) {
        otherKeys.push(key);
      }
      otherKeys.sort();
      if (!equals(oneKeys, otherKeys)) {
        return false;
      }
      for (i = 0; i < oneKeys.length; i++) {
        if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
          return false;
        }
      }
    }
    return true;
  }
  exports.equals = equals;

  // tslint:disable-next-line: no-any
  function isNumber(val) {
    return typeof val === 'number';
  }
  exports.isNumber = isNumber;

  // tslint:disable-next-line: no-any
  function isDefined(val) {
    return typeof val !== 'undefined';
  }
  exports.isDefined = isDefined;

  // tslint:disable-next-line: no-any
  function isBoolean(val) {
    return typeof val === 'boolean';
  }
  exports.isBoolean = isBoolean;

  // tslint:disable-next-line: no-any
  function isString(val) {
    return typeof val === 'string';
  }
  exports.isString = isString;
});

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vscode-json-languageservice/lib/umd/utils/json',["require", "exports"], factory);
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  function stringifyObject(obj, indent, stringifyLiteral) {
    if (obj !== null && typeof obj === 'object') {
      var newIndent = indent + '\t';

      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return '[]';
        }

        var result = '[\n';
        for (var i = 0; i < obj.length; i++) {
          result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
          if (i < obj.length - 1) {
            result += ',';
          }
          result += '\n';
        }
        result += indent + ']';
        return result;
      }
      else {
        var keys = Object.keys(obj);
        if (keys.length === 0) {
          return '{}';
        }
        var result = '{\n';
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          result += newIndent + JSON.stringify(key) + ': ' + stringifyObject(obj[key], newIndent, stringifyLiteral);
          if (i < keys.length - 1) {
            result += ',';
          }
          result += '\n';
        }
        result += indent + '}';
        return result;
      }
    }
    return stringifyLiteral(obj);
  }

  exports.stringifyObject = stringifyObject;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonCompletion',
      [
        "require",
        "exports",
        "../parser/jsonParser",
        "jsonc-parser",
        "../utils/json",
        "../utils/strings",
        "../utils/objects",
        "../jsonLanguageTypes",
        "vscode-nls"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Parser = require("../parser/jsonParser");
  var Json = require("jsonc-parser");
  var json_1 = require("../utils/json");
  var strings_1 = require("../utils/strings");
  var objects_1 = require("../utils/objects");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();
  var valueCommitCharacters = [',', '}', ']'];
  var propertyCommitCharacters = [':'];

  var JSONCompletion = /** @class */ (function () {
    function JSONCompletion(schemaService, contributions, promiseConstructor, clientCapabilities) {
      if (contributions === void 0) {
        contributions = [];
      }
      if (promiseConstructor === void 0) {
        promiseConstructor = Promise;
      }
      if (clientCapabilities === void 0) {
        clientCapabilities = {};
      }
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promiseConstructor = promiseConstructor;
      this.clientCapabilities = clientCapabilities;
      this.templateVarIdCounter = 0;
    }

    JSONCompletion.prototype.doResolve = function (item) {
      for (var i = this.contributions.length - 1; i >= 0; i--) {
        if (this.contributions[i].resolveCompletion) {
          var resolver = this.contributions[i].resolveCompletion(item);
          if (resolver) {
            return resolver;
          }
        }
      }
      return this.promiseConstructor.resolve(item);
    };

    JSONCompletion.prototype.doComplete = function (document, position, doc) {
      var _this = this;
      var result = {
        items: [],
        isIncomplete: false
      };
      var text = document.getText();
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset, true);
      if (this.isInComment(document, node ? node.offset : 0, offset)) {
        return Promise.resolve(result);
      }

      if (node && (offset === node.offset + node.length) && offset > 0) {
        var ch = text[offset - 1];
        if (node.type === 'object' && ch === '}' || node.type === 'array' && ch === ']') {
          // after ] or }
          node = node.parent;
        }
      }

      var currentWord = this.getCurrentWord(document, offset);
      var overwriteRange = null;
      if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
        overwriteRange = jsonLanguageTypes_1.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
      }
      else {
        var overwriteStart = offset - currentWord.length;
        if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
          overwriteStart--;
        }
        overwriteRange = jsonLanguageTypes_1.Range.create(document.positionAt(overwriteStart), position);
      }

      var supportsCommitCharacters = false; //this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544
      var proposed = {};
      var collector = {
        add: function (suggestion) {
          var label = suggestion.label;
          var existing = proposed[label];
          if (!existing) {
            label = label.replace(/[\n]/g, '↵');
            if (label.length > 60) {
              var shortendedLabel = label.substr(0, 57).trim() + '...';
              if (!proposed[shortendedLabel]) {
                  label = shortendedLabel;
              }
            }
            if (overwriteRange) {
              suggestion.textEdit = jsonLanguageTypes_1.TextEdit.replace(overwriteRange, suggestion.insertText);
            }
            if (supportsCommitCharacters) {
              suggestion.commitCharacters = suggestion.kind === jsonLanguageTypes_1.CompletionItemKind.Property ? propertyCommitCharacters : valueCommitCharacters;
            }
            suggestion.label = label;
            proposed[label] = suggestion;
            result.items.push(suggestion);
          }
          else if (!existing.documentation) {
              existing.documentation = suggestion.documentation;
          }
        },
        setAsIncomplete: function () {
            result.isIncomplete = true;
        },
        error: function (message) {
            console.error(message);
        },
        log: function (message) {
            console.log(message);
        },
        getNumberOfProposals: function () {
            return result.items.length;
        }
      };
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
        var collectionPromises = [];
        var addValue = true;
        var currentKey = '';
        var currentProperty = null;
        if (node) {
          if (node.type === 'string') {
            var parent = node.parent;
            if (parent && parent.type === 'property' && parent.keyNode === node) {
              addValue = !parent.valueNode;
              currentProperty = parent;
              currentKey = text.substr(node.offset + 1, node.length - 2);
              if (parent) {
                node = parent.parent;
              }
            }
          }
        }
        // proposals for properties
        if (node && node.type === 'object') {
          // don't suggest keys when the cursor is just before the opening curly brace
          if (node.offset === offset) {
            return result;
          }

          // don't suggest properties that are already present
          var properties = node.properties;
          properties.forEach(function (p) {
            if (!currentProperty || currentProperty !== p) {
              proposed[p.keyNode.value] = jsonLanguageTypes_1.CompletionItem.create('__');
            }
          });

          var separatorAfter_1 = '';
          if (addValue) {
            separatorAfter_1 = _this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
          }

          if (schema) {
            // property proposals with schema
            _this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter_1, collector);
          }
          else {
            // property proposals without schema
            _this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
          }

          var location_1 = Parser.getNodePath(node);
          _this.contributions.forEach(function (contribution) {
            var collectPromise = contribution.collectPropertyCompletions(document.uri, location_1, currentWord, addValue, separatorAfter_1 === '', collector);
            if (collectPromise) {
              collectionPromises.push(collectPromise);
            }
          });

          if ((!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"')) {
            collector.add({
              kind: jsonLanguageTypes_1.CompletionItemKind.Property,
              label: _this.getLabelForValue(currentWord),
              insertText: _this.getInsertTextForProperty(currentWord, null, false, separatorAfter_1),
              insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet, documentation: '',
            });
            collector.setAsIncomplete();
          }
        }
        // proposals for values
        var types = {};
        if (schema) {
          // value proposals with schema
          _this.getValueCompletions(schema, doc, node, offset, document, collector, types);
        }
        else {
          // value proposals without schema
          _this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
        }

        if (_this.contributions.length > 0) {
          _this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
        }

        return _this.promiseConstructor.all(collectionPromises).then(function () {
          if (collector.getNumberOfProposals() === 0) {
            var offsetForSeparator = offset;
            if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
              offsetForSeparator = node.offset + node.length;
            }
            var separatorAfter = _this.evaluateSeparatorAfter(document, offsetForSeparator);
            _this.addFillerValueCompletions(types, separatorAfter, collector);
          }
          return result;
        });
      });
    };

    JSONCompletion.prototype.getPropertyCompletions = function (schema, doc, node, addValue, separatorAfter, collector) {
      var _this = this;
      var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
      matchingSchemas.forEach(function (s) {
        if (s.node === node && !s.inverted) {
          var schemaProperties_1 = s.schema.properties;
          if (schemaProperties_1) {
            Object.keys(schemaProperties_1).forEach(function (key) {
              var propertySchema = schemaProperties_1[key];
              if (typeof propertySchema === 'object' && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
                var proposal = {
                  kind: jsonLanguageTypes_1.CompletionItemKind.Property,
                  label: key,
                  insertText: _this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
                  insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
                  filterText: _this.getFilterTextForValue(key),
                  documentation: _this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || '',
                };
                if (strings_1.endsWith(proposal.insertText, "$1" + separatorAfter)) {
                  proposal.command = {
                    title: 'Suggest',
                    command: 'editor.action.triggerSuggest'
                  };
                }
                collector.add(proposal);
              }
            });
          }
        }
      });
    };

    JSONCompletion.prototype.getSchemaLessPropertyCompletions = function (doc, node, currentKey, collector) {
      var _this = this;
      var collectCompletionsForSimilarObject = function (obj) {
        obj.properties.forEach(function (p) {
          var key = p.keyNode.value;
          collector.add({
            kind: jsonLanguageTypes_1.CompletionItemKind.Property,
            label: key,
            insertText: _this.getInsertTextForValue(key, ''),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            filterText: _this.getFilterTextForValue(key),
            documentation: ''
          });
        });
      };
      if (node.parent) {
        if (node.parent.type === 'property') {
          // if the object is a property value, check the tree for other objects that hang under a property of the same name
          var parentKey_1 = node.parent.keyNode.value;
          doc.visit(function (n) {
            if (n.type === 'property' && n !== node.parent && n.keyNode.value === parentKey_1 && n.valueNode && n.valueNode.type === 'object') {
              collectCompletionsForSimilarObject(n.valueNode);
            }
            return true;
          });
        }
        else if (node.parent.type === 'array') {
          // if the object is in an array, use all other array elements as similar objects
          node.parent.items.forEach(function (n) {
            if (n.type === 'object' && n !== node) {
              collectCompletionsForSimilarObject(n);
            }
          });
        }
      }
      else if (node.type === 'object') {
        collector.add({
          kind: jsonLanguageTypes_1.CompletionItemKind.Property,
          label: '$schema',
          insertText: this.getInsertTextForProperty('$schema', null, true, ''),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet, documentation: '',
          filterText: this.getFilterTextForValue("$schema")
        });
      }
    };

    JSONCompletion.prototype.getSchemaLessValueCompletions = function (doc, node, offset, document, collector) {
      var _this = this;
      var offsetForSeparator = offset;

      if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
        offsetForSeparator = node.offset + node.length;
        node = node.parent;
      }

      if (!node) {
        collector.add({
          kind: this.getSuggestionKind('object'),
          label: 'Empty object',
          insertText: this.getInsertTextForValue({}, ''),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: ''
        });

        collector.add({
          kind: this.getSuggestionKind('array'),
          label: 'Empty array',
          insertText: this.getInsertTextForValue([], ''),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: ''
        });
        return;
      }

      var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
      var collectSuggestionsForValues = function (value) {
        if (!Parser.contains(value.parent, offset, true)) {
          collector.add({
            kind: _this.getSuggestionKind(value.type),
            label: _this.getLabelTextForMatchingNode(value, document),
            insertText: _this.getInsertTextForMatchingNode(value, document, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet, documentation: ''
          });
        }

        if (value.type === 'boolean') {
          _this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
        }
      };

      if (node.type === 'property') {
        if (offset > node.colonOffset) {
          var valueNode = node.valueNode;
          if (valueNode && (offset > (valueNode.offset + valueNode.length) || valueNode.type === 'object' || valueNode.type === 'array')) {
            return;
          }

          // suggest values at the same key
          var parentKey_2 = node.keyNode.value;
          doc.visit(function (n) {
            if (n.type === 'property' && n.keyNode.value === parentKey_2 && n.valueNode) {
              collectSuggestionsForValues(n.valueNode);
            }
            return true;
          });

          if (parentKey_2 === '$schema' && node.parent && !node.parent.parent) {
            this.addDollarSchemaCompletions(separatorAfter, collector);
          }
        }
      }
      if (node.type === 'array') {
        if (node.parent && node.parent.type === 'property') {
          // suggest items of an array at the same key
          var parentKey_3 = node.parent.keyNode.value;
          doc.visit(function (n) {
            if (n.type === 'property' && n.keyNode.value === parentKey_3 && n.valueNode && n.valueNode.type === 'array') {
              n.valueNode.items.forEach(collectSuggestionsForValues);
            }
            return true;
          });
        }
        else {
          // suggest items in the same array
          node.items.forEach(collectSuggestionsForValues);
        }
      }
    };

    JSONCompletion.prototype.getValueCompletions = function (schema, doc, node, offset, document, collector, types) {
      var _this = this;
      var offsetForSeparator = offset;
      var parentKey = null;
      var valueNode = null;
      if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
        offsetForSeparator = node.offset + node.length;
        valueNode = node;
        node = node.parent;
      }

      if (!node) {
        this.addSchemaValueCompletions(schema.schema, '', collector, types);
        return;
      }

      if ((node.type === 'property') && offset > node.colonOffset) {
        var valueNode_1 = node.valueNode;
        if (valueNode_1 && offset > (valueNode_1.offset + valueNode_1.length)) {
          return; // we are past the value node
        }
        parentKey = node.keyNode.value;
        node = node.parent;
      }

      if (node && (parentKey !== null || node.type === 'array')) {
        var separatorAfter_2 = this.evaluateSeparatorAfter(document, offsetForSeparator);
        var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
        matchingSchemas.forEach(function (s) {
          if (s.node === node && !s.inverted && s.schema) {
            if (node.type === 'array' && s.schema.items) {
              if (Array.isArray(s.schema.items)) {
                var index = _this.findItemAtOffset(node, document, offset);
                if (index < s.schema.items.length) {
                  _this.addSchemaValueCompletions(s.schema.items[index], separatorAfter_2, collector, types);
                }
              }
              else {
                _this.addSchemaValueCompletions(s.schema.items, separatorAfter_2, collector, types);
              }
            }
            if (s.schema.properties) {
              var propertySchema = s.schema.properties[parentKey];
              if (propertySchema) {
                _this.addSchemaValueCompletions(propertySchema, separatorAfter_2, collector, types);
              }
            }
          }
        });

        if (parentKey === '$schema' && !node.parent) {
          this.addDollarSchemaCompletions(separatorAfter_2, collector);
        }

        if (types['boolean']) {
          this.addBooleanValueCompletion(true, separatorAfter_2, collector);
          this.addBooleanValueCompletion(false, separatorAfter_2, collector);
        }

        if (types['null']) {
          this.addNullValueCompletion(separatorAfter_2, collector);
        }
      }
    };

    JSONCompletion.prototype.getContributedValueCompletions = function (doc, node, offset, document, collector, collectionPromises) {
      if (!node) {
        this.contributions.forEach(function (contribution) {
          var collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
          if (collectPromise) {
            collectionPromises.push(collectPromise);
          }
        });
      }
      else {
        if (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null') {
          node = node.parent;
        }
        if ((node.type === 'property') && offset > node.colonOffset) {
          var parentKey_4 = node.keyNode.value;
          var valueNode = node.valueNode;
          if (!valueNode || offset <= (valueNode.offset + valueNode.length)) {
            var location_2 = Parser.getNodePath(node.parent);
            this.contributions.forEach(function (contribution) {
              var collectPromise = contribution.collectValueCompletions(document.uri, location_2, parentKey_4, collector);
              if (collectPromise) {
                collectionPromises.push(collectPromise);
              }
            });
          }
        }
      }
    };

    JSONCompletion.prototype.addSchemaValueCompletions = function (schema, separatorAfter, collector, types) {
      var _this = this;
      if (typeof schema === 'object') {
        this.addEnumValueCompletions(schema, separatorAfter, collector);
        this.addDefaultValueCompletions(schema, separatorAfter, collector);
        this.collectTypes(schema, types);
        if (Array.isArray(schema.allOf)) {
          schema.allOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
        }
        if (Array.isArray(schema.anyOf)) {
          schema.anyOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
        }
        if (Array.isArray(schema.oneOf)) {
          schema.oneOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
        }
      }
    };

    JSONCompletion.prototype.addDefaultValueCompletions = function (schema, separatorAfter, collector, arrayDepth) {
      var _this = this;
      if (arrayDepth === void 0) {
        arrayDepth = 0;
      }
      var hasProposals = false;
      if (objects_1.isDefined(schema.default)) {
        var type = schema.type;
        var value = schema.default;
        for (var i = arrayDepth; i > 0; i--) {
          value = [value];
          type = 'array';
        }

        collector.add({
            kind: this.getSuggestionKind(type),
            label: this.getLabelForValue(value),
            insertText: this.getInsertTextForValue(value, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            detail: localize('json.suggest.default', 'Default value')
        });
        hasProposals = true;
      }

      if (Array.isArray(schema.examples)) {
        schema.examples.forEach(function (example) {
          var type = schema.type;
          var value = example;
          for (var i = arrayDepth; i > 0; i--) {
            value = [value];
            type = 'array';
          }
          collector.add({
            kind: _this.getSuggestionKind(type),
            label: _this.getLabelForValue(value),
            insertText: _this.getInsertTextForValue(value, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet
          });
          hasProposals = true;
        });
      }

      if (Array.isArray(schema.defaultSnippets)) {
        schema.defaultSnippets.forEach(function (s) {
          var type = schema.type;
          var value = s.body;
          var label = s.label;
          var insertText;
          var filterText;
          if (objects_1.isDefined(value)) {
            var type_1 = schema.type;
            for (var i = arrayDepth; i > 0; i--) {
              value = [value];
              type_1 = 'array';
            }
            insertText = _this.getInsertTextForSnippetValue(value, separatorAfter);
            filterText = _this.getFilterTextForSnippetValue(value);
            label = label || _this.getLabelForSnippetValue(value);
          }
          else if (typeof s.bodyText === 'string') {
            var prefix = '', suffix = '', indent = '';
            for (var i = arrayDepth; i > 0; i--) {
              prefix = prefix + indent + '[\n';
              suffix = suffix + '\n' + indent + ']';
              indent += '\t';
              type = 'array';
            }
            insertText = prefix + indent + s.bodyText.split('\n').join('\n' + indent) + suffix + separatorAfter;
            label = label || insertText,
                filterText = insertText.replace(/[\n]/g, ''); // remove new lines
          }
          collector.add({
            kind: _this.getSuggestionKind(type),
            label: label,
            documentation: _this.fromMarkup(s.markdownDescription) || s.description,
            insertText: insertText,
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            filterText: filterText
          });
          hasProposals = true;
        });
      }
      if (!hasProposals && typeof schema.items === 'object' && !Array.isArray(schema.items)) {
        this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
      }
    };

    JSONCompletion.prototype.addEnumValueCompletions = function (schema, separatorAfter, collector) {
      if (objects_1.isDefined(schema.const)) {
        collector.add({
          kind: this.getSuggestionKind(schema.type),
          label: this.getLabelForValue(schema.const),
          insertText: this.getInsertTextForValue(schema.const, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          documentation: this.fromMarkup(schema.markdownDescription) || schema.description
        });
      }
      if (Array.isArray(schema.enum)) {
        for (var i = 0, length = schema.enum.length; i < length; i++) {
          var enm = schema.enum[i];
          var documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
          if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
            documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
          }
          else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
            documentation = schema.enumDescriptions[i];
          }

          collector.add({
            kind: this.getSuggestionKind(schema.type),
            label: this.getLabelForValue(enm),
            insertText: this.getInsertTextForValue(enm, separatorAfter),
            insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
            documentation: documentation
          });
        }
      }
    };

    JSONCompletion.prototype.collectTypes = function (schema, types) {
      if (Array.isArray(schema.enum) || objects_1.isDefined(schema.const)) {
        return;
      }
      var type = schema.type;
      if (Array.isArray(type)) {
        type.forEach(function (t) { return types[t] = true; });
      }
      else {
        types[type] = true;
      }
    };

    JSONCompletion.prototype.addFillerValueCompletions = function (types, separatorAfter, collector) {
      if (types['object']) {
        collector.add({
          kind: this.getSuggestionKind('object'),
          label: '{}',
          insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          detail: localize('defaults.object', 'New object'),
          documentation: ''
        });
      }

      if (types['array']) {
        collector.add({
          kind: this.getSuggestionKind('array'),
          label: '[]',
          insertText: this.getInsertTextForGuessedValue([], separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
          detail: localize('defaults.array', 'New array'),
          documentation: ''
        });
      }
    };

    JSONCompletion.prototype.addBooleanValueCompletion = function (value, separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind('boolean'),
        label: value ? 'true' : 'false',
        insertText: this.getInsertTextForValue(value, separatorAfter),
        insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
        documentation: ''
      });
    };

    JSONCompletion.prototype.addNullValueCompletion = function (separatorAfter, collector) {
      collector.add({
        kind: this.getSuggestionKind('null'),
        label: 'null',
        insertText: 'null' + separatorAfter,
        insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet,
        documentation: ''
      });
    };
    JSONCompletion.prototype.addDollarSchemaCompletions = function (separatorAfter, collector) {
      var _this = this;
      var schemaIds = this.schemaService.getRegisteredSchemaIds(function (schema) { return schema === 'http' || schema === 'https'; });
      schemaIds.forEach(function (schemaId) {
        return collector.add({
          kind: jsonLanguageTypes_1.CompletionItemKind.Module,
          label: _this.getLabelForValue(schemaId),
          filterText: _this.getFilterTextForValue(schemaId),
          insertText: _this.getInsertTextForValue(schemaId, separatorAfter),
          insertTextFormat: jsonLanguageTypes_1.InsertTextFormat.Snippet, documentation: ''
        });
      });
    };

    JSONCompletion.prototype.getLabelForValue = function (value) {
      return JSON.stringify(value);
    };

    JSONCompletion.prototype.getFilterTextForValue = function (value) {
      return JSON.stringify(value);
    };

    JSONCompletion.prototype.getFilterTextForSnippetValue = function (value) {
      return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
    };

    JSONCompletion.prototype.getLabelForSnippetValue = function (value) {
      var label = JSON.stringify(value);
      return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
    };

    JSONCompletion.prototype.getInsertTextForPlainText = function (text) {
      return text.replace(/[\\\$\}]/g, '\\$&'); // escape $, \ and } 
    };

    JSONCompletion.prototype.getInsertTextForValue = function (value, separatorAfter) {
      var text = JSON.stringify(value, null, '\t');
      if (text === '{}') {
        return '{$1}' + separatorAfter;
      }
      else if (text === '[]') {
        return '[$1]' + separatorAfter;
      }
      return this.getInsertTextForPlainText(text + separatorAfter);
    };

    JSONCompletion.prototype.getInsertTextForSnippetValue = function (value, separatorAfter) {
      var replacer = function (value) {
        if (typeof value === 'string') {
          if (value[0] === '^') {
            return value.substr(1);
          }
        }
        return JSON.stringify(value);
      };
      return json_1.stringifyObject(value, '', replacer) + separatorAfter;
    };

    JSONCompletion.prototype.getInsertTextForGuessedValue = function (value, separatorAfter) {
      switch (typeof value) {
        case 'object':
          if (value === null) {
            return '${1:null}' + separatorAfter;
          }
          return this.getInsertTextForValue(value, separatorAfter);

        case 'string':
          var snippetValue = JSON.stringify(value);
          snippetValue = snippetValue.substr(1, snippetValue.length - 2); // remove quotes
          snippetValue = this.getInsertTextForPlainText(snippetValue); // escape \ and }
          return '"${1:' + snippetValue + '}"' + separatorAfter;

        case 'number':
        case 'boolean':
          return '${1:' + JSON.stringify(value) + '}' + separatorAfter;
      }

      return this.getInsertTextForValue(value, separatorAfter);
    };

    JSONCompletion.prototype.getSuggestionKind = function (type) {
      if (Array.isArray(type)) {
        var array = type;
        type = array.length > 0 ? array[0] : null;
      }

      if (!type) {
        return jsonLanguageTypes_1.CompletionItemKind.Value;
      }

      switch (type) {
        case 'string':
          return jsonLanguageTypes_1.CompletionItemKind.Value;

        case 'object':
          return jsonLanguageTypes_1.CompletionItemKind.Module;

        case 'property':
          return jsonLanguageTypes_1.CompletionItemKind.Property;

        default:
          return jsonLanguageTypes_1.CompletionItemKind.Value;
      }
    };
        
    JSONCompletion.prototype.getLabelTextForMatchingNode = function (node, document) {
      switch (node.type) {
        case 'array':
          return '[]';

        case 'object':
          return '{}';
        default:
          var content = document.getText().substr(node.offset, node.length);
          return content;
      }
    };

    JSONCompletion.prototype.getInsertTextForMatchingNode = function (node, document, separatorAfter) {
      switch (node.type) {
        case 'array':
          return this.getInsertTextForValue([], separatorAfter);

        case 'object':
          return this.getInsertTextForValue({}, separatorAfter);

        default:
          var content = document.getText().substr(node.offset, node.length) + separatorAfter;
          return this.getInsertTextForPlainText(content);
      }
    };

    JSONCompletion.prototype.getInsertTextForProperty = function (key, propertySchema, addValue, separatorAfter) {
      var propertyText = this.getInsertTextForValue(key, '');
      if (!addValue) {
        return propertyText;
      }

      var resultText = propertyText + ': ';
      var value;
      var nValueProposals = 0;
      if (propertySchema) {
        if (Array.isArray(propertySchema.defaultSnippets)) {
          if (propertySchema.defaultSnippets.length === 1) {
            var body = propertySchema.defaultSnippets[0].body;
            if (objects_1.isDefined(body)) {
              value = this.getInsertTextForSnippetValue(body, '');
            }
          }
          nValueProposals += propertySchema.defaultSnippets.length;
        }

        if (propertySchema.enum) {
          if (!value && propertySchema.enum.length === 1) {
            value = this.getInsertTextForGuessedValue(propertySchema.enum[0], '');
          }
          nValueProposals += propertySchema.enum.length;
        }

        if (objects_1.isDefined(propertySchema.default)) {
            if (!value) {
                value = this.getInsertTextForGuessedValue(propertySchema.default, '');
            }
            nValueProposals++;
        }

        if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
          if (!value) {
            value = this.getInsertTextForGuessedValue(propertySchema.examples[0], '');
          }
          nValueProposals += propertySchema.examples.length;
        }
        if (nValueProposals === 0) {
          var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
          if (!type) {
            if (propertySchema.properties) {
              type = 'object';
            }
            else if (propertySchema.items) {
              type = 'array';
            }
          }
          switch (type) {
            case 'boolean':
              value = '$1';
              break;
            case 'string':
              value = '"$1"';
              break;
            case 'object':
              value = '{$1}';
              break;
            case 'array':
              value = '[$1]';
              break;
            case 'number':
            case 'integer':
              value = '${1:0}';
              break;
            case 'null':
              value = '${1:null}';
              break;
            default:
              return propertyText;
          }
        }
      }

      if (!value || nValueProposals > 1) {
          value = '$1';
      }
      return resultText + value + separatorAfter;
    };

    JSONCompletion.prototype.getCurrentWord = function (document, offset) {
      var i = offset - 1;
      var text = document.getText();
      while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
        i--;
      }
      return text.substring(i + 1, offset);
    };

    JSONCompletion.prototype.evaluateSeparatorAfter = function (document, offset) {
      var scanner = Json.createScanner(document.getText(), true);
      scanner.setPosition(offset);
      var token = scanner.scan();
      switch (token) {
        case 5 /* CommaToken */:
        case 2 /* CloseBraceToken */:
        case 4 /* CloseBracketToken */:
        case 17 /* EOF */:
            return '';
        default:
            return ',';
      }
    };

    JSONCompletion.prototype.findItemAtOffset = function (node, document, offset) {
      var scanner = Json.createScanner(document.getText(), true);
      var children = node.items;
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (offset > child.offset + child.length) {
          scanner.setPosition(child.offset + child.length);
          var token = scanner.scan();
          if (token === 5 /* CommaToken */ && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
            return i + 1;
          }
          return i;
        }
        else if (offset >= child.offset) {
          return i;
        }
      }
      return 0;
    };

    JSONCompletion.prototype.isInComment = function (document, start, offset) {
      var scanner = Json.createScanner(document.getText(), false);
      scanner.setPosition(start);
      var token = scanner.scan();
      while (token !== 17 /* EOF */ && (scanner.getTokenOffset() + scanner.getTokenLength() < offset)) {
        token = scanner.scan();
      }
      return (token === 12 /* LineCommentTrivia */ || token === 13 /* BlockCommentTrivia */) && scanner.getTokenOffset() <= offset;
    };

    JSONCompletion.prototype.fromMarkup = function (markupString) {
      if (markupString && this.doesSupportMarkdown()) {
        return {
          kind: jsonLanguageTypes_1.MarkupKind.Markdown,
          value: markupString
        };
      }
      return undefined;
    };

    JSONCompletion.prototype.doesSupportMarkdown = function () {
      if (!objects_1.isDefined(this.supportsMarkdown)) {
        var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
        this.supportsMarkdown = completion && completion.completionItem && Array.isArray(completion.completionItem.documentationFormat) && completion.completionItem.documentationFormat.indexOf(jsonLanguageTypes_1.MarkupKind.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    };

    JSONCompletion.prototype.doesSupportsCommitCharacters = function () {
      if (!objects_1.isDefined(this.supportsCommitCharacters)) {
        var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
        this.supportsCommitCharacters = completion && completion.completionItem && !!completion.completionItem.commitCharactersSupport;
      }
      return this.supportsCommitCharacters;
    };

    return JSONCompletion;
  }());
  exports.JSONCompletion = JSONCompletion;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonHover',
      [
        "require",
        "exports",
        "../parser/jsonParser",
        "../jsonLanguageTypes"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Parser = require("../parser/jsonParser");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");

  var JSONHover = /** @class */ (function () {
    function JSONHover(schemaService, contributions, promiseConstructor) {
      if (contributions === void 0) {
        contributions = [];
      }
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promise = promiseConstructor || Promise;
    }

    JSONHover.prototype.doHover = function (document, position, doc) {
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset);
      if (!node || (node.type === 'object' || node.type === 'array') && offset > node.offset + 1 && offset < node.offset + node.length - 1) {
        return this.promise.resolve(null);
      }

      var hoverRangeNode = node;
      // use the property description when hovering over an object key
      if (node.type === 'string') {
        var parent = node.parent;
        if (parent && parent.type === 'property' && parent.keyNode === node) {
          node = parent.valueNode;
          if (!node) {
              return this.promise.resolve(null);
          }
        }
      }

      var hoverRange = jsonLanguageTypes_1.Range.create(
        document.positionAt(hoverRangeNode.offset),
        document.positionAt(hoverRangeNode.offset + hoverRangeNode.length)
      );
      var createHover = function (contents) {
        var result = {
          contents: contents,
          range: hoverRange
        };
        return result;
      };

      var location = Parser.getNodePath(node);

      for (var i = this.contributions.length - 1; i >= 0; i--) {
        var contribution = this.contributions[i];
        var promise = contribution.getInfoContribution(document.uri, location);
        if (promise) {
          return promise.then(function (htmlContent) { return createHover(htmlContent); });
        }
      }
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
        if (schema) {
          var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
          var title_1 = null;
          var markdownDescription_1 = null;
          var markdownEnumValueDescription_1 = null, enumValue_1 = null;
          matchingSchemas.every(function (s) {
            if (s.node === node && !s.inverted && s.schema) {
              title_1 = title_1 || s.schema.title;
              markdownDescription_1 = markdownDescription_1 || s.schema.markdownDescription || toMarkdown(s.schema.description);
              if (s.schema.enum) {
                var idx = s.schema.enum.indexOf(Parser.getNodeValue(node));
                if (s.schema.markdownEnumDescriptions) {
                  markdownEnumValueDescription_1 = s.schema.markdownEnumDescriptions[idx];
                }
                else if (s.schema.enumDescriptions) {
                  markdownEnumValueDescription_1 = toMarkdown(s.schema.enumDescriptions[idx]);
                }
                if (markdownEnumValueDescription_1) {
                  enumValue_1 = s.schema.enum[idx];
                  if (typeof enumValue_1 !== 'string') {
                    enumValue_1 = JSON.stringify(enumValue_1);
                  }
                }
              }
            }
            return true;
          });

          var result = '';
          if (title_1) {
            result = toMarkdown(title_1);
          }
          if (markdownDescription_1) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += markdownDescription_1;
          }

          if (markdownEnumValueDescription_1) {
            if (result.length > 0) {
              result += "\n\n";
            }
            result += "`" + toMarkdownCodeBlock(enumValue_1) + "`: " + markdownEnumValueDescription_1;
          }
          return createHover([result]);
        }
        return null;
      });
    };
    return JSONHover;
  }());

  exports.JSONHover = JSONHover;
  function toMarkdown(plain) {
    if (plain) {
      var res = plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, '$1\n\n$3'); // single new lines to \n\n (Markdown paragraph)
      return res.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    return void 0;
  }

  function toMarkdownCodeBlock(content) {
    // see https://daringfireball.net/projects/markdown/syntax#precode
    if (content.indexOf('`') !== -1) {
      return '`` ' + content + ' ``';
    }
    return content;
  }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonValidation',
      [
        "require",
        "exports",
        "./jsonSchemaService",
        "../jsonLanguageTypes",
        "vscode-nls",
        "../utils/objects"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonSchemaService_1 = require("./jsonSchemaService");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");
  var nls = require("vscode-nls");
  var objects_1 = require("../utils/objects");
  var localize = nls.loadMessageBundle();

  var JSONValidation = /** @class */ (function () {
    function JSONValidation(jsonSchemaService, promiseConstructor) {
        this.jsonSchemaService = jsonSchemaService;
        this.promise = promiseConstructor;
        this.validationEnabled = true;
    }

    JSONValidation.prototype.configure = function (raw) {
      if (raw) {
        this.validationEnabled = raw.validate;
        this.commentSeverity = raw.allowComments ? void 0 : jsonLanguageTypes_1.DiagnosticSeverity.Error;
      }
    };

    JSONValidation.prototype.doValidation = function (textDocument, jsonDocument, documentSettings, schema) {
      var _this = this;
      if (!this.validationEnabled) {
        return this.promise.resolve([]);
      }
      var diagnostics = [];
      var added = {};
      var addProblem = function (problem) {
        // remove duplicated messages
        var signature = problem.range.start.line + ' ' + problem.range.start.character + ' ' + problem.message;
        if (!added[signature]) {
          added[signature] = true;
          diagnostics.push(problem);
        }
      };
      var getDiagnostics = function (schema) {
        var trailingCommaSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.trailingCommas) : jsonLanguageTypes_1.DiagnosticSeverity.Error;
        var commentSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.comments) : _this.commentSeverity;

        if (schema) {
          if (schema.errors.length && jsonDocument.root) {
            var astRoot = jsonDocument.root;
            var property = astRoot.type === 'object' ? astRoot.properties[0] : null;
            if (property && property.keyNode.value === '$schema') {
              var node = property.valueNode || property;
              var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
              addProblem(
                jsonLanguageTypes_1.Diagnostic.create(range, schema.errors[0],
                jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  jsonLanguageTypes_1.ErrorCode.SchemaResolveError)
              );
            }
            else {
              var range = jsonLanguageTypes_1.Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
              addProblem(
                jsonLanguageTypes_1.Diagnostic.create(range, schema.errors[0],
                  jsonLanguageTypes_1.DiagnosticSeverity.Warning,
                  jsonLanguageTypes_1.ErrorCode.SchemaResolveError)
              );
            }
          }
          else {
            var semanticErrors = jsonDocument.validate(textDocument, schema.schema);
            if (semanticErrors) {
                semanticErrors.forEach(addProblem);
            }
          }

          if (schemaAllowsComments(schema.schema)) {
            commentSeverity = void 0;
          }

          if (schemaAllowsTrailingCommas(schema.schema)) {
            trailingCommaSeverity = void 0;
          }
        }

        for (var _i = 0, _a = jsonDocument.syntaxErrors; _i < _a.length; _i++) {
          var p = _a[_i];
          if (p.code === jsonLanguageTypes_1.ErrorCode.TrailingComma) {
            if (typeof trailingCommaSeverity !== 'number') {
              continue;
            }
            p.severity = trailingCommaSeverity;
          }
          addProblem(p);
        }

        if (typeof commentSeverity === 'number') {
          var message_1 = localize('InvalidCommentToken', 'Comments are not permitted in JSON.');
          jsonDocument.comments.forEach(function (c) {
              addProblem(jsonLanguageTypes_1.Diagnostic.create(c, message_1, commentSeverity, jsonLanguageTypes_1.ErrorCode.CommentNotPermitted));
          });
        }
        return diagnostics;
      };

      if (schema) {
        var id = schema.id || ('schemaservice://untitled/' + idCounter++);
        return this.jsonSchemaService.resolveSchemaContent(new jsonSchemaService_1.UnresolvedSchema(schema), id, {}).then(function (resolvedSchema) {
          return getDiagnostics(resolvedSchema);
        });
      }

      return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(function (schema) {
        return getDiagnostics(schema);
      });
    };

    return JSONValidation;
  }());

  exports.JSONValidation = JSONValidation;

  var idCounter = 0;
  function schemaAllowsComments(schemaRef) {
    if (schemaRef && typeof schemaRef === 'object') {
      if (objects_1.isBoolean(schemaRef.allowComments)) {
        return schemaRef.allowComments;
      }
      if (schemaRef.allOf) {
        for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
          var schema = _a[_i];
          var allow = schemaAllowsComments(schema);
          if (objects_1.isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return undefined;
  }

  function schemaAllowsTrailingCommas(schemaRef) {
    if (schemaRef && typeof schemaRef === 'object') {
      if (objects_1.isBoolean(schemaRef.allowTrailingCommas)) {
        return schemaRef.allowTrailingCommas;
      }

      if (objects_1.isBoolean(schemaRef['allowsTrailingCommas'])) { // deprecated
        return schemaRef['allowsTrailingCommas'];
      }

      if (schemaRef.allOf) {
        for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
          var schema = _a[_i];
          var allow = schemaAllowsTrailingCommas(schema);
          if (objects_1.isBoolean(allow)) {
            return allow;
          }
        }
      }
    }
    return undefined;
  }

  function toDiagnosticSeverity(severityLevel) {
    switch (severityLevel) {
      case 'error':
        return jsonLanguageTypes_1.DiagnosticSeverity.Error;

      case 'warning':
        return jsonLanguageTypes_1.DiagnosticSeverity.Warning;

      case 'ignore':
        return void 0;
    }
    return void 0;
  }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/utils/colors',
      [
        "require",
        "exports"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Digit0 = 48;
  var Digit9 = 57;
  var A = 65;
  var a = 97;
  var f = 102;

  function hexDigit(charCode) {
    if (charCode < Digit0) {
      return 0;
    }
    if (charCode <= Digit9) {
      return charCode - Digit0;
    }
    if (charCode < a) {
      charCode += (a - A);
    }
    if (charCode >= a && charCode <= f) {
      return charCode - a + 10;
    }
    return 0;
  }

  exports.hexDigit = hexDigit;

  function colorFromHex(text) {
    if (text[0] !== '#') {
      return null;
    }

    switch (text.length) {
      case 4:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
          green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
          blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
          alpha: 1
        };

      case 5:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
          green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
          blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
          alpha: (hexDigit(text.charCodeAt(4)) * 0x11) / 255.0,
        };

      case 7:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
          green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
          blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
          alpha: 1
        };

      case 9:
        return {
          red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
          green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
          blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
          alpha: (hexDigit(text.charCodeAt(7)) * 0x10 + hexDigit(text.charCodeAt(8))) / 255.0
        };
    }
    return null;
  }

  exports.colorFromHex = colorFromHex;

  function colorFrom256RGB(red, green, blue, alpha) {
    if (alpha === void 0) {
      alpha = 1.0;
    }
    return {
      red: red / 255.0,
      green: green / 255.0,
      blue: blue / 255.0,
      alpha: alpha
    };
  }
  exports.colorFrom256RGB = colorFrom256RGB;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonDocumentSymbols',
      [
        "require",
        "exports",
        "../parser/jsonParser",
        "../utils/strings",
        "../utils/colors",
        "../jsonLanguageTypes"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Parser = require("../parser/jsonParser");
  var Strings = require("../utils/strings");
  var colors_1 = require("../utils/colors");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");

  var JSONDocumentSymbols = /** @class */ (function () {
    function JSONDocumentSymbols(schemaService) {
      this.schemaService = schemaService;
    }

    JSONDocumentSymbols.prototype.findDocumentSymbols = function (document, doc, context) {
      var _this = this;
      if (context === void 0) {
        context = { resultLimit: Number.MAX_VALUE };
      }
      var root = doc.root;
      if (!root) {
        return null;
      }

      var limit = context.resultLimit;
      // special handling for key bindings
      var resourceString = document.uri;
      if ((resourceString === 'vscode://defaultsettings/keybindings.json') || Strings.endsWith(resourceString.toLowerCase(), '/user/keybindings.json')) {
        if (root.type === 'array') {
          var result_1 = [];
          for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === 'object') {
              for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
                var property = _c[_b];
                if (property.keyNode.value === 'key' && property.valueNode) {
                  var location = jsonLanguageTypes_1.Location.create(document.uri, getRange(document, item));
                  result_1.push({ name: Parser.getNodeValue(property.valueNode), kind: jsonLanguageTypes_1.SymbolKind.Function, location: location });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result_1;
                  }
                }
              }
            }
          }
          return result_1;
        }
      }

      var toVisit = [
        { node: root, containerName: '' }
      ];
      var nextToVisit = 0;
      var limitExceeded = false;
      var result = [];
      var collectOutlineEntries = function (node, containerName) {
        if (node.type === 'array') {
          node.items.forEach(function (node) {
            if (node) {
              toVisit.push({ node: node, containerName: containerName });
            }
          });
        }
        else if (node.type === 'object') {
          node.properties.forEach(function (property) {
            var valueNode = property.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                var location = jsonLanguageTypes_1.Location.create(document.uri, getRange(document, property));
                var childContainerName = containerName ? containerName + '.' + property.keyNode.value : property.keyNode.value;
                result.push({ name: _this.getKeyLabel(property), kind: _this.getSymbolKind(valueNode.type), location: location, containerName: containerName });
                toVisit.push({ node: valueNode, containerName: childContainerName });
              }
              else {
                limitExceeded = true;
              }
            }
          });
        }
      };

      // breath first traversal
      while (nextToVisit < toVisit.length) {
        var next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.containerName);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    };

    JSONDocumentSymbols.prototype.findDocumentSymbols2 = function (document, doc, context) {
      var _this = this;
      if (context === void 0) {
        context = { resultLimit: Number.MAX_VALUE };
      }
      var root = doc.root;
      if (!root) {
        return null;
      }

      var limit = context.resultLimit;
      // special handling for key bindings
      var resourceString = document.uri;
      if ((resourceString === 'vscode://defaultsettings/keybindings.json') || Strings.endsWith(resourceString.toLowerCase(), '/user/keybindings.json')) {
        if (root.type === 'array') {
          var result_2 = [];
          for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === 'object') {
              for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
                var property = _c[_b];
                if (property.keyNode.value === 'key' && property.valueNode) {
                  var range = getRange(document, item);
                  var selectionRange = getRange(document, property.keyNode);
                  result_2.push({ name: Parser.getNodeValue(property.valueNode), kind: jsonLanguageTypes_1.SymbolKind.Function, range: range, selectionRange: selectionRange });
                  limit--;
                  if (limit <= 0) {
                    if (context && context.onResultLimitExceeded) {
                      context.onResultLimitExceeded(resourceString);
                    }
                    return result_2;
                  }
                }
              }
            }
          }
          return result_2;
        }
      }

      var result = [];
      var toVisit = [
        { node: root, result: result }
      ];
      var nextToVisit = 0;
      var limitExceeded = false;
      var collectOutlineEntries = function (node, result) {

        if (node.type === 'array') {
          node.items.forEach(function (node, index) {
            if (node) {
              if (limit > 0) {
                limit--;
                var range = getRange(document, node);
                var selectionRange = range;
                var name = String(index);
                var symbol = { name: name, kind: _this.getSymbolKind(node.type), range: range, selectionRange: selectionRange, children: [] };
                result.push(symbol);
                toVisit.push({ result: symbol.children, node: node });
              }
              else {
                limitExceeded = true;
              }
            }
          });
        }
        else if (node.type === 'object') {
          node.properties.forEach(function (property) {
            var valueNode = property.valueNode;
            if (valueNode) {
              if (limit > 0) {
                limit--;
                var range = getRange(document, property);
                var selectionRange = getRange(document, property.keyNode);
                var symbol = { name: _this.getKeyLabel(property), kind: _this.getSymbolKind(valueNode.type), range: range, selectionRange: selectionRange, children: [] };
                result.push(symbol);
                toVisit.push({ result: symbol.children, node: valueNode });
              }
              else {
                limitExceeded = true;
              }
            }
          });
        }
      };

      // breath first traversal
      while (nextToVisit < toVisit.length) {
        var next = toVisit[nextToVisit++];
        collectOutlineEntries(next.node, next.result);
      }
      if (limitExceeded && context && context.onResultLimitExceeded) {
        context.onResultLimitExceeded(resourceString);
      }
      return result;
    };

    JSONDocumentSymbols.prototype.getSymbolKind = function (nodeType) {
      switch (nodeType) {
        case 'object':
          return jsonLanguageTypes_1.SymbolKind.Module;

        case 'string':
          return jsonLanguageTypes_1.SymbolKind.String;

        case 'number':
          return jsonLanguageTypes_1.SymbolKind.Number;

        case 'array':
          return jsonLanguageTypes_1.SymbolKind.Array;

        case 'boolean':
          return jsonLanguageTypes_1.SymbolKind.Boolean;

        default: // 'null'
          return jsonLanguageTypes_1.SymbolKind.Variable;
      }
    };

    JSONDocumentSymbols.prototype.getKeyLabel = function (property) {
      var name = property.keyNode.value;
      if (name) {
        name = name.replace(/[\n]/g, '↵');
      }
      if (name && name.trim()) {
        return name;
      }
      return "\"" + name + "\"";
    };

    JSONDocumentSymbols.prototype.findDocumentColors = function (document, doc, context) {
      return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
        var result = [];
        if (schema) {
          var limit = context && typeof context.resultLimit === 'number' ? context.resultLimit : Number.MAX_VALUE;
          var matchingSchemas = doc.getMatchingSchemas(schema.schema);
          var visitedNode = {};
          for (var _i = 0, matchingSchemas_1 = matchingSchemas; _i < matchingSchemas_1.length; _i++) {
            var s = matchingSchemas_1[_i];
            if (!s.inverted && s.schema && (s.schema.format === 'color' || s.schema.format === 'color-hex') && s.node && s.node.type === 'string') {
              var nodeId = String(s.node.offset);
              if (!visitedNode[nodeId]) {
                var color = colors_1.colorFromHex(Parser.getNodeValue(s.node));
                if (color) {
                  var range = getRange(document, s.node);
                  result.push({ color: color, range: range });
                }
                visitedNode[nodeId] = true;
                limit--;
                if (limit <= 0) {
                  if (context && context.onResultLimitExceeded) {
                    context.onResultLimitExceeded(document.uri);
                  }
                  return result;
                }
              }
            }
          }
        }
        return result;
      });
    };
    
    JSONDocumentSymbols.prototype.getColorPresentations = function (document, doc, color, range) {
      var result = [];
      var red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
      function toTwoDigitHex(n) {
        var r = n.toString(16);
        return r.length !== 2 ? '0' + r : r;
      }
      var label;
      if (color.alpha === 1) {
        label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256);
      }
      else {
        label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256) + toTwoDigitHex(Math.round(color.alpha * 255));
      }
      result.push({ label: label, textEdit: jsonLanguageTypes_1.TextEdit.replace(range, JSON.stringify(label)) });
      return result;
    };
    return JSONDocumentSymbols;
  }());

  exports.JSONDocumentSymbols = JSONDocumentSymbols;

  function getRange(document, node) {
    return jsonLanguageTypes_1.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
  }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/configuration',
      [
        "require",
        "exports",
        "vscode-nls"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();
  exports.schemaContributions = {
    schemaAssociations: {},
    schemas: {
      // bundle the schema-schema to include (localized) descriptions
      'http://json-schema.org/draft-04/schema#': {
        'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
        '$schema': 'http://json-schema.org/draft-04/schema#',
        'definitions': {
          'schemaArray': {
            'type': 'array',
            'minItems': 1,
            'items': {
              '$ref': '#'
            }
          },
          'positiveInteger': {
            'type': 'integer',
            'minimum': 0
          },
          'positiveIntegerDefault0': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveInteger'
              },
              {
                'default': 0
              }
            ]
          },
          'simpleTypes': {
            'type': 'string',
            'enum': [
              'array',
              'boolean',
              'integer',
              'null',
              'number',
              'object',
              'string'
            ]
          },
          'stringArray': {
            'type': 'array',
            'items': {
              'type': 'string'
            },
            'minItems': 1,
            'uniqueItems': true
          }
        },
        'type': 'object',
        'properties': {
          'id': {
            'type': 'string',
            'format': 'uri'
          },
          '$schema': {
            'type': 'string',
            'format': 'uri'
          },
          'title': {
            'type': 'string'
          },
          'description': {
            'type': 'string'
          },
          'default': {},
          'multipleOf': {
            'type': 'number',
            'minimum': 0,
            'exclusiveMinimum': true
          },
          'maximum': {
            'type': 'number'
          },
          'exclusiveMaximum': {
            'type': 'boolean',
            'default': false
          },
          'minimum': {
            'type': 'number'
          },
          'exclusiveMinimum': {
            'type': 'boolean',
            'default': false
          },
          'maxLength': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveInteger'
              }
            ]
          },
          'minLength': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveIntegerDefault0'
              }
            ]
          },
          'pattern': {
            'type': 'string',
            'format': 'regex'
          },
          'additionalItems': {
            'anyOf': [
              {
                'type': 'boolean'
              },
              {
                '$ref': '#'
              }
            ],
            'default': {}
          },
          'items': {
            'anyOf': [
              {
                '$ref': '#'
              },
              {
                '$ref': '#/definitions/schemaArray'
              }
            ],
            'default': {}
          },
          'maxItems': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveInteger'
              }
            ]
          },
          'minItems': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveIntegerDefault0'
              }
            ]
          },
          'uniqueItems': {
            'type': 'boolean',
            'default': false
          },
          'maxProperties': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveInteger'
              }
            ]
          },
          'minProperties': {
            'allOf': [
              {
                '$ref': '#/definitions/positiveIntegerDefault0'
              }
            ]
          },
          'required': {
            'allOf': [
              {
                '$ref': '#/definitions/stringArray'
              }
            ]
          },
          'additionalProperties': {
            'anyOf': [
              {
                'type': 'boolean'
              },
              {
                '$ref': '#'
              }
            ],
            'default': {}
          },
          'definitions': {
            'type': 'object',
            'additionalProperties': {
              '$ref': '#'
            },
            'default': {}
          },
          'properties': {
            'type': 'object',
            'additionalProperties': {
              '$ref': '#'
            },
            'default': {}
          },
          'patternProperties': {
            'type': 'object',
            'additionalProperties': {
              '$ref': '#'
            },
            'default': {}
          },
          'dependencies': {
            'type': 'object',
            'additionalProperties': {
              'anyOf': [
                {
                  '$ref': '#'
                },
                {
                  '$ref': '#/definitions/stringArray'
                }
              ]
            }
          },
          'enum': {
            'type': 'array',
            'minItems': 1,
            'uniqueItems': true
          },
          'type': {
            'anyOf': [
              {
                '$ref': '#/definitions/simpleTypes'
              },
              {
                'type': 'array',
                'items': {
                  '$ref': '#/definitions/simpleTypes'
                },
                'minItems': 1,
                'uniqueItems': true
              }
            ]
          },
          'format': {
            'anyOf': [
              {
                'type': 'string',
                'enum': [
                  'date-time',
                  'uri',
                  'email',
                  'hostname',
                  'ipv4',
                  'ipv6',
                  'regex'
                ]
              },
              {
                'type': 'string'
              }
            ]
          },
          'allOf': {
            'allOf': [
              {
                '$ref': '#/definitions/schemaArray'
              }
            ]
          },
          'anyOf': {
            'allOf': [
              {
                '$ref': '#/definitions/schemaArray'
              }
            ]
          },
          'oneOf': {
            'allOf': [
              {
                '$ref': '#/definitions/schemaArray'
              }
            ]
          },
          'not': {
            'allOf': [
              {
                '$ref': '#'
              }
            ]
          }
        },
        'dependencies': {
          'exclusiveMaximum': [
            'maximum'
          ],
          'exclusiveMinimum': [
            'minimum'
          ]
        },
        'default': {}
      },
      'http://json-schema.org/draft-07/schema#': {
        'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
        'definitions': {
          'schemaArray': {
            'type': 'array',
            'minItems': 1,
            'items': { '$ref': '#' }
          },
          'nonNegativeInteger': {
            'type': 'integer',
            'minimum': 0
          },
          'nonNegativeIntegerDefault0': {
            'allOf': [
                { '$ref': '#/definitions/nonNegativeInteger' },
                { 'default': 0 }
            ]
          },
          'simpleTypes': {
            'enum': [
              'array',
              'boolean',
              'integer',
              'null',
              'number',
              'object',
              'string'
            ]
          },
          'stringArray': {
            'type': 'array',
            'items': { 'type': 'string' },
            'uniqueItems': true,
            'default': []
          }
        },
        'type': ['object', 'boolean'],
        'properties': {
          '$id': {
            'type': 'string',
            'format': 'uri-reference'
          },
          '$schema': {
            'type': 'string',
            'format': 'uri'
          },
          '$ref': {
            'type': 'string',
            'format': 'uri-reference'
          },
          '$comment': {
            'type': 'string'
          },
          'title': {
            'type': 'string'
          },
          'description': {
            'type': 'string'
          },
          'default': true,
          'readOnly': {
            'type': 'boolean',
            'default': false
          },
          'examples': {
            'type': 'array',
            'items': true
          },
          'multipleOf': {
            'type': 'number',
            'exclusiveMinimum': 0
          },
            'maximum': {
              'type': 'number'
            },
            'exclusiveMaximum': {
              'type': 'number'
            },
            'minimum': {
              'type': 'number'
            },
            'exclusiveMinimum': {
              'type': 'number'
            },
            'maxLength': { '$ref': '#/definitions/nonNegativeInteger' },
            'minLength': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
            'pattern': {
              'type': 'string',
              'format': 'regex'
            },
            'additionalItems': { '$ref': '#' },
            'items': {
              'anyOf': [
                { '$ref': '#' },
                { '$ref': '#/definitions/schemaArray' }
              ],
              'default': true
            },
            'maxItems': { '$ref': '#/definitions/nonNegativeInteger' },
            'minItems': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
            'uniqueItems': {
              'type': 'boolean',
              'default': false
            },
            'contains': { '$ref': '#' },
            'maxProperties': { '$ref': '#/definitions/nonNegativeInteger' },
            'minProperties': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
            'required': { '$ref': '#/definitions/stringArray' },
            'additionalProperties': { '$ref': '#' },
            'definitions': {
              'type': 'object',
              'additionalProperties': { '$ref': '#' },
              'default': {}
            },
            'properties': {
              'type': 'object',
              'additionalProperties': { '$ref': '#' },
              'default': {}
            },
            'patternProperties': {
              'type': 'object',
              'additionalProperties': { '$ref': '#' },
              'propertyNames': { 'format': 'regex' },
              'default': {}
            },
            'dependencies': {
              'type': 'object',
              'additionalProperties': {
                'anyOf': [
                  { '$ref': '#' },
                  { '$ref': '#/definitions/stringArray' }
                ]
              }
            },
            'propertyNames': { '$ref': '#' },
            'const': true,
            'enum': {
              'type': 'array',
              'items': true,
              'minItems': 1,
              'uniqueItems': true
            },
            'type': {
              'anyOf': [
                { '$ref': '#/definitions/simpleTypes' },
                {
                  'type': 'array',
                  'items': { '$ref': '#/definitions/simpleTypes' },
                  'minItems': 1,
                  'uniqueItems': true
                }
              ]
            },
            'format': { 'type': 'string' },
            'contentMediaType': { 'type': 'string' },
            'contentEncoding': { 'type': 'string' },
            'if': { '$ref': '#' },
            'then': { '$ref': '#' },
            'else': { '$ref': '#' },
            'allOf': { '$ref': '#/definitions/schemaArray' },
            'anyOf': { '$ref': '#/definitions/schemaArray' },
            'oneOf': { '$ref': '#/definitions/schemaArray' },
            'not': { '$ref': '#' }
          },
          'default': true
        }
      }
    };
    var descriptions = {
      id: localize('schema.json.id', "A unique identifier for the schema."),
      $schema: localize('schema.json.$schema', "The schema to verify this document against."),
      title: localize('schema.json.title', "A descriptive title of the element."),
      description: localize('schema.json.description', "A long description of the element. Used in hover menus and suggestions."),
      default: localize('schema.json.default', "A default value. Used by suggestions."),
      multipleOf: localize('schema.json.multipleOf', "A number that should cleanly divide the current value (i.e. have no remainder)."),
      maximum: localize('schema.json.maximum', "The maximum numerical value, inclusive by default."),
      exclusiveMaximum: localize('schema.json.exclusiveMaximum', "Makes the maximum property exclusive."),
      minimum: localize('schema.json.minimum', "The minimum numerical value, inclusive by default."),
      exclusiveMinimum: localize('schema.json.exclusiveMininum', "Makes the minimum property exclusive."),
      maxLength: localize('schema.json.maxLength', "The maximum length of a string."),
      minLength: localize('schema.json.minLength', "The minimum length of a string."),
      pattern: localize('schema.json.pattern', "A regular expression to match the string against. It is not implicitly anchored."),
      additionalItems: localize('schema.json.additionalItems', "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
      items: localize('schema.json.items', "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
      maxItems: localize('schema.json.maxItems', "The maximum number of items that can be inside an array. Inclusive."),
      minItems: localize('schema.json.minItems', "The minimum number of items that can be inside an array. Inclusive."),
      uniqueItems: localize('schema.json.uniqueItems', "If all of the items in the array must be unique. Defaults to false."),
      maxProperties: localize('schema.json.maxProperties', "The maximum number of properties an object can have. Inclusive."),
      minProperties: localize('schema.json.minProperties', "The minimum number of properties an object can have. Inclusive."),
      required: localize('schema.json.required', "An array of strings that lists the names of all properties required on this object."),
      additionalProperties: localize('schema.json.additionalProperties', "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
      definitions: localize('schema.json.definitions', "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
      properties: localize('schema.json.properties', "A map of property names to schemas for each property."),
      patternProperties: localize('schema.json.patternProperties', "A map of regular expressions on property names to schemas for matching properties."),
      dependencies: localize('schema.json.dependencies', "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
      enum: localize('schema.json.enum', "The set of literal values that are valid."),
      type: localize('schema.json.type', "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
      format: localize('schema.json.format', "Describes the format expected for the value."),
      allOf: localize('schema.json.allOf', "An array of schemas, all of which must match."),
      anyOf: localize('schema.json.anyOf', "An array of schemas, where at least one must match."),
      oneOf: localize('schema.json.oneOf', "An array of schemas, exactly one of which must match."),
      not: localize('schema.json.not', "A schema which must not match."),
      $id: localize('schema.json.$id', "A unique identifier for the schema."),
      $ref: localize('schema.json.$ref', "Reference a definition hosted on any location."),
      $comment: localize('schema.json.$comment', "Comments from schema authors to readers or maintainers of the schema."),
      readOnly: localize('schema.json.readOnly', "Indicates that the value of the instance is managed exclusively by the owning authority."),
      examples: localize('schema.json.examples', "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
      contains: localize('schema.json.contains', "An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
      propertyNames: localize('schema.json.propertyNames', "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
      const: localize('schema.json.const', "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
      contentMediaType: localize('schema.json.contentMediaType', "Describes the media type of a string property."),
      contentEncoding: localize('schema.json.contentEncoding', "Describes the content encoding of a string property."),
      if: localize('schema.json.if', "The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
      then: localize('schema.json.then', "The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
      else: localize('schema.json.else', "The \"else\" subschema is used for validation when the \"if\" subschema fails.")
    };

    for (var schemaName in exports.schemaContributions.schemas) {
      var schema = exports.schemaContributions.schemas[schemaName];
      for (var property in schema.properties) {
        var propertyObject = schema.properties[property];
        if (propertyObject === true) {
          propertyObject = schema.properties[property] = {};
        }

        var description = descriptions[property];
        if (description) {
          propertyObject['description'] = description;
        }
        else {
          console.log(property + ": localize('schema.json." + property + "', \"\")");
        }
      }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonFolding',
      [
        "require",
        "exports",
        "jsonc-parser",
        "../jsonLanguageTypes"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonc_parser_1 = require("jsonc-parser");
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");
  function getFoldingRanges(document, context) {
    var ranges = [];
    var nestingLevels = [];
    var stack = [];
    var prevStart = -1;
    var scanner = jsonc_parser_1.createScanner(document.getText(), false);
    var token = scanner.scan();

    function addRange(range) {
      ranges.push(range);
      nestingLevels.push(stack.length);
    }

    while (token !== 17 /* EOF */) {
      switch (token) {
        case 1 /* OpenBraceToken */:
        case 3 /* OpenBracketToken */: {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var range = { startLine: startLine, endLine: startLine, kind: token === 1 /* OpenBraceToken */ ? 'object' : 'array' };
          stack.push(range);
          break;
        }

        case 2 /* CloseBraceToken */:
        case 4 /* CloseBracketToken */: {
          var kind = token === 2 /* CloseBraceToken */ ? 'object' : 'array';
          if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
            var range = stack.pop();
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
              range.endLine = line - 1;
              addRange(range);
              prevStart = range.startLine;
            }
          }
          break;
        }

        case 13 /* BlockCommentTrivia */: {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
          if (scanner.getTokenError() === 1 /* UnexpectedEndOfComment */ && startLine + 1 < document.lineCount) {
            scanner.setPosition(document.offsetAt(jsonLanguageTypes_1.Position.create(startLine + 1, 0)));
          }
          else {
            if (startLine < endLine) {
              addRange({ startLine: startLine, endLine: endLine, kind: jsonLanguageTypes_1.FoldingRangeKind.Comment });
              prevStart = startLine;
            }
          }
          break;
        }

        case 12 /* LineCommentTrivia */: {
          var text = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
          var m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
          if (m) {
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (m[1]) { // start pattern match
              var range = { startLine: line, endLine: line, kind: jsonLanguageTypes_1.FoldingRangeKind.Region };
              stack.push(range);
            }
            else {
              var i = stack.length - 1;
              while (i >= 0 && stack[i].kind !== jsonLanguageTypes_1.FoldingRangeKind.Region) {
                i--;
              }
              if (i >= 0) {
                var range = stack[i];
                stack.length = i;
                if (line > range.startLine && prevStart !== range.startLine) {
                  range.endLine = line;
                  addRange(range);
                  prevStart = range.startLine;
                }
              }
            }
          }
          break;
        }
      }
      token = scanner.scan();
    }

    var rangeLimit = context && context.rangeLimit;
    if (typeof rangeLimit !== 'number' || ranges.length <= rangeLimit) {
        return ranges;
    }

    if (context && context.onRangeLimitExceeded) {
        context.onRangeLimitExceeded(document.uri);
    }

    var counts = [];
    for (var _i = 0, nestingLevels_1 = nestingLevels; _i < nestingLevels_1.length; _i++) {
      var level = nestingLevels_1[_i];
      if (level < 30) {
        counts[level] = (counts[level] || 0) + 1;
      }
    }
    var entries = 0;
    var maxLevel = 0;
    for (var i = 0; i < counts.length; i++) {
      var n = counts[i];
      if (n) {
        if (n + entries > rangeLimit) {
          maxLevel = i;
          break;
        }
        entries += n;
      }
    }

    var result = [];
    for (var i = 0; i < ranges.length; i++) {
      var level = nestingLevels[i];
      if (typeof level === 'number') {
        if (level < maxLevel || (level === maxLevel && entries++ < rangeLimit)) {
          result.push(ranges[i]);
        }
      }
    }
    return result;
  }

  exports.getFoldingRanges = getFoldingRanges;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/services/jsonSelectionRanges',
      [
        "require",
        "exports",
        "../jsonLanguageTypes",
        "jsonc-parser"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonLanguageTypes_1 = require("../jsonLanguageTypes");
  var jsonc_parser_1 = require("jsonc-parser");

  function getSelectionRanges(document, positions, doc) {
    function getSelectionRange(position) {
      var offset = document.offsetAt(position);
      var node = doc.getNodeFromOffset(offset, true);
      var result = [];
      while (node) {
        switch (node.type) {
          case 'string':
          case 'object':
          case 'array':
            // range without ", [ or {
            var cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
            if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
                result.push(newRange(cStart, cEnd));
            }
            result.push(newRange(node.offset, node.offset + node.length));
            break;

          case 'number':
          case 'boolean':
          case 'null':
          case 'property':
            result.push(newRange(node.offset, node.offset + node.length));
            break;
        }

        if (node.type === 'property' || node.parent && node.parent.type === 'array') {
          var afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5 /* CommaToken */);
          if (afterCommaOffset !== -1) {
            result.push(newRange(node.offset, afterCommaOffset));
          }
        }
        node = node.parent;
      }
      var current = undefined;
      for (var index = result.length - 1; index >= 0; index--) {
        current = jsonLanguageTypes_1.SelectionRange.create(result[index], current);
      }

      if (!current) {
        current = jsonLanguageTypes_1.SelectionRange.create(jsonLanguageTypes_1.Range.create(position, position));
      }
      return current;
    }

    function newRange(start, end) {
      return jsonLanguageTypes_1.Range.create(document.positionAt(start), document.positionAt(end));
    }

    var scanner = jsonc_parser_1.createScanner(document.getText(), true);
    function getOffsetAfterNextToken(offset, expectedToken) {
      scanner.setPosition(offset);
      var token = scanner.scan();
      if (token === expectedToken) {
        return scanner.getTokenOffset() + scanner.getTokenLength();
      }
      return -1;
    }
    return positions.map(getSelectionRange);
  }

  exports.getSelectionRanges = getSelectionRanges;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vscode-json-languageservice/lib/umd/jsonLanguageService',
      [
        "require",
        "exports",
        "./services/jsonCompletion",
        "./services/jsonHover",
        "./services/jsonValidation",
        "./services/jsonDocumentSymbols",
        "./parser/jsonParser",
        "./services/configuration",
        "./services/jsonSchemaService",
        "./services/jsonFolding",
        "./services/jsonSelectionRanges",
        "jsonc-parser",
        "./jsonLanguageTypes",
        "./jsonLanguageTypes"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }

  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonCompletion_1 = require("./services/jsonCompletion");
  var jsonHover_1 = require("./services/jsonHover");
  var jsonValidation_1 = require("./services/jsonValidation");
  var jsonDocumentSymbols_1 = require("./services/jsonDocumentSymbols");
  var jsonParser_1 = require("./parser/jsonParser");
  var configuration_1 = require("./services/configuration");
  var jsonSchemaService_1 = require("./services/jsonSchemaService");
  var jsonFolding_1 = require("./services/jsonFolding");
  var jsonSelectionRanges_1 = require("./services/jsonSelectionRanges");
  var jsonc_parser_1 = require("jsonc-parser");
  var jsonLanguageTypes_1 = require("./jsonLanguageTypes");
  __export(require("./jsonLanguageTypes"));

  function getLanguageService(params) {
    var promise = params.promiseConstructor || Promise;
    var jsonSchemaService = new jsonSchemaService_1.JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
    jsonSchemaService.setSchemaContributions(configuration_1.schemaContributions);
    var jsonCompletion = new jsonCompletion_1.JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
    var jsonHover = new jsonHover_1.JSONHover(jsonSchemaService, params.contributions, promise);
    var jsonDocumentSymbols = new jsonDocumentSymbols_1.JSONDocumentSymbols(jsonSchemaService);
    var jsonValidation = new jsonValidation_1.JSONValidation(jsonSchemaService, promise);

    return {
      configure: function (settings) {
        jsonSchemaService.clearExternalSchemas();
        if (settings.schemas) {
          settings.schemas.forEach(function (settings) {
            jsonSchemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
          });
        }
        jsonValidation.configure(settings);
      },

      resetSchema: function (uri) {
        return jsonSchemaService.onResourceChange(uri);
      },
      doValidation: jsonValidation.doValidation.bind(jsonValidation),
      parseJSONDocument: function (document) {
        return jsonParser_1.parse(document, { collectComments: true });
      },
      newJSONDocument: function (root, diagnostics) {
        return jsonParser_1.newJSONDocument(root, diagnostics);
      },
      doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
      doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
      findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
      findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
      findColorSymbols: function (d, s) {
        return jsonDocumentSymbols.findDocumentColors(d, s).then(function (s) {
          return s.map(function (s) {
            return s.range;
          });
        });
      },
      findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
      getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
      doHover: jsonHover.doHover.bind(jsonHover),
      getFoldingRanges: jsonFolding_1.getFoldingRanges,
      getSelectionRanges: jsonSelectionRanges_1.getSelectionRanges,
      format: function (d, r, o) {
        var range = void 0;
        if (r) {
          var offset = d.offsetAt(r.start);
          var length = d.offsetAt(r.end) - offset;
          range = { offset: offset, length: length };
        }

        var options = { tabSize: o ? o.tabSize : 4, insertSpaces: o ? o.insertSpaces : true, eol: '\n' };
        return jsonc_parser_1.format(d.getText(), range, options).map(function (e) {
            return jsonLanguageTypes_1.TextEdit.replace(
              jsonLanguageTypes_1.Range.create(
                d.positionAt(e.offset),
                d.positionAt(e.offset + e.length)
              ),
              e.content
            );
        });
      }
    };
  }

  exports.getLanguageService = getLanguageService;
});

define(
  'vscode-json-languageservice',
  [
    'vscode-json-languageservice/lib/umd/jsonLanguageService'
  ],
  function (main) {
    return main;
  }
);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

var __read = (this && this.__read) || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;

  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  }
  catch (error) {
    e = {
      error: error
    };
  }
  finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    }
    finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};

var __spread = (this && this.__spread) || function () {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
};

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return
  m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/parser/jsonParser07',
      [
        "require",
        "exports",
        "jsonc-parser",
        "../utils/objects",
        "vscode-json-languageservice",
        "vscode-nls",
        "vscode-uri",
        "vscode-languageserver-types"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Json = require("jsonc-parser");
  var objects_1 = require("../utils/objects");
  var vscode_json_languageservice_1 = require("vscode-json-languageservice");
  var nls = require("vscode-nls");
  var vscode_uri_1 = require("vscode-uri");
  var vscode_languageserver_types_1 = require("vscode-languageserver-types");
  var localize = nls.loadMessageBundle();
  var colorHexPattern = /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/;
  var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var ASTNodeImpl = /** @class */ (function () {
    function ASTNodeImpl(parent, offset, length) {
      this.offset = offset;
      this.length = length;
      this.parent = parent;
    }
    Object.defineProperty(ASTNodeImpl.prototype, "children", {
      get: function () {
          return [];
      },
      enumerable: true,
      configurable: true
    });
    ASTNodeImpl.prototype.toString = function () {
      return ('type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' +
          (this.parent ? ' parent: {' + this.parent.toString() + '}' : ''));
    };
    return ASTNodeImpl;
  }());
  exports.ASTNodeImpl = ASTNodeImpl;

  var NullASTNodeImpl = /** @class */ (function (_super) {
    __extends(NullASTNodeImpl, _super);
    function NullASTNodeImpl(parent, offset, length) {
        var _this = _super.call(this, parent, offset, length) || this;
        _this.type = 'null';
        _this.value = null;
        return _this;
    }
    return NullASTNodeImpl;
  }(ASTNodeImpl));

  exports.NullASTNodeImpl = NullASTNodeImpl;

  var BooleanASTNodeImpl = /** @class */ (function (_super) {
    __extends(BooleanASTNodeImpl, _super);
    function BooleanASTNodeImpl(parent, boolValue, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'boolean';
      _this.value = boolValue;
      return _this;
    }
    return BooleanASTNodeImpl;
  }(ASTNodeImpl));

  exports.BooleanASTNodeImpl = BooleanASTNodeImpl;

  var ArrayASTNodeImpl = /** @class */ (function (_super) {
    __extends(ArrayASTNodeImpl, _super);
    function ArrayASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'array';
      _this.items = [];
      return _this;
    }
    Object.defineProperty(ArrayASTNodeImpl.prototype, "children", {
      get: function () {
          return this.items;
      },
      enumerable: true,
      configurable: true
    });
    return ArrayASTNodeImpl;
  }(ASTNodeImpl));

  exports.ArrayASTNodeImpl = ArrayASTNodeImpl;

  var NumberASTNodeImpl = /** @class */ (function (_super) {
    __extends(NumberASTNodeImpl, _super);
    function NumberASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'number';
      _this.isInteger = true;
      _this.value = Number.NaN;
      return _this;
    }
    return NumberASTNodeImpl;
  }(ASTNodeImpl));

  exports.NumberASTNodeImpl = NumberASTNodeImpl;

  var StringASTNodeImpl = /** @class */ (function (_super) {
    __extends(StringASTNodeImpl, _super);
    function StringASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'string';
      _this.value = '';
      return _this;
    }
    return StringASTNodeImpl;
  }(ASTNodeImpl));

  exports.StringASTNodeImpl = StringASTNodeImpl;

  var PropertyASTNodeImpl = /** @class */ (function (_super) {
    __extends(PropertyASTNodeImpl, _super);
    function PropertyASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'property';
      _this.colonOffset = -1;
      return _this;
    }
    Object.defineProperty(PropertyASTNodeImpl.prototype, "children", {
      get: function () {
          return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
      },
      enumerable: true,
      configurable: true
    });
    return PropertyASTNodeImpl;
  }(ASTNodeImpl));

  exports.PropertyASTNodeImpl = PropertyASTNodeImpl;

  var ObjectASTNodeImpl = /** @class */ (function (_super) {
    __extends(ObjectASTNodeImpl, _super);
    function ObjectASTNodeImpl(parent, offset, length) {
      var _this = _super.call(this, parent, offset, length) || this;
      _this.type = 'object';
      _this.properties = [];
      return _this;
    }
    Object.defineProperty(ObjectASTNodeImpl.prototype, "children", {
      get: function () {
          return this.properties;
      },
      enumerable: true,
      configurable: true
    });
    return ObjectASTNodeImpl;
  }(ASTNodeImpl));

  exports.ObjectASTNodeImpl = ObjectASTNodeImpl;

  function asSchema(schema) {
    if (objects_1.isBoolean(schema)) {
      return schema ? {} : { not: {} };
    }
    return schema;
  }

  exports.asSchema = asSchema;

  var EnumMatch;
  (function (EnumMatch) {
    EnumMatch[EnumMatch["Key"] = 0] = "Key";
    EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
  })(EnumMatch = exports.EnumMatch || (exports.EnumMatch = {}));

  var SchemaCollector = /** @class */ (function () {
    function SchemaCollector(focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      this.focusOffset = focusOffset;
      this.exclude = exclude;
      this.schemas = [];
    }

    SchemaCollector.prototype.add = function (schema) {
      this.schemas.push(schema);
    };

    SchemaCollector.prototype.merge = function (other) {
      var _a;
      (_a = this.schemas).push.apply(_a, __spread(other.schemas));
    };

    SchemaCollector.prototype.include = function (node) {
      return ((this.focusOffset === -1 || contains(node, this.focusOffset)) &&
          node !== this.exclude);
    };

    SchemaCollector.prototype.newSub = function () {
      return new SchemaCollector(-1, this.exclude);
    };

    return SchemaCollector;
  }());

  var NoOpSchemaCollector = /** @class */ (function () {
    function NoOpSchemaCollector() {}
    Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
      get: function () {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    NoOpSchemaCollector.prototype.add = function (schema) { };
    NoOpSchemaCollector.prototype.merge = function (other) { };
    NoOpSchemaCollector.prototype.include = function (node) {
      return true;
    };
    NoOpSchemaCollector.prototype.newSub = function () {
      return this;
    };
    NoOpSchemaCollector.instance = new NoOpSchemaCollector();
    return NoOpSchemaCollector;
  }());

  var ValidationResult = /** @class */ (function () {
    function ValidationResult(isKubernetes) {
      this.problems = [];
      this.propertiesMatches = 0;
      this.propertiesValueMatches = 0;
      this.primaryValueMatches = 0;
      this.enumValueMatch = false;
      if (isKubernetes) {
        this.enumValues = [];
      }
      else {
        this.enumValues = null;
      }
    }

    ValidationResult.prototype.hasProblems = function () {
      return !!this.problems.length;
    };

    ValidationResult.prototype.mergeAll = function (validationResults) {
      var e_1, _a;
      try {
        for (var validationResults_1 = __values(validationResults), validationResults_1_1 = validationResults_1.next();
             !validationResults_1_1.done;
             validationResults_1_1 = validationResults_1.next()) {
          var validationResult = validationResults_1_1.value;
          this.merge(validationResult);
        }
      }
      catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      }
      finally {
        try {
          if (validationResults_1_1 && !validationResults_1_1.done && (_a = validationResults_1.return))
            _a.call(validationResults_1);
        }
        finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };

    ValidationResult.prototype.merge = function (validationResult) {
      this.problems = this.problems.concat(validationResult.problems);
    };

    ValidationResult.prototype.mergeEnumValues = function (validationResult) {
      var e_2, _a;
      if (!this.enumValueMatch &&
        !validationResult.enumValueMatch &&
        this.enumValues &&
        validationResult.enumValues) {
        this.enumValues = this.enumValues.concat(validationResult.enumValues);
        try {
          for (var _b = __values(this.problems), _c = _b.next(); !_c.done; _c = _b.next()) {
            var error = _c.value;
            if (error.code === vscode_json_languageservice_1.ErrorCode.EnumValueMismatch) {
              error.message = localize('enumWarning', 'Value is not accepted. Valid values: {0}.',
                __spread(new Set(this.enumValues)).map(function (v) { return JSON.stringify(v); }).join(', '));
            }
          }
        }
        catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        }
        finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          }
          finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
    };

    ValidationResult.prototype.mergePropertyMatch = function (propertyValidationResult) {
      this.merge(propertyValidationResult);
      this.propertiesMatches++;
      if (propertyValidationResult.enumValueMatch || (!propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches)) {
        this.propertiesValueMatches++;
      }
      if (propertyValidationResult.enumValueMatch &&
        propertyValidationResult.enumValues) {
        this.primaryValueMatches++;
      }
    };

    ValidationResult.prototype.compareGeneric = function (other) {
      var hasProblems = this.hasProblems();
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };

    ValidationResult.prototype.compareKubernetes = function (other) {
      var hasProblems = this.hasProblems();
      if (this.propertiesMatches !== other.propertiesMatches) {
        return this.propertiesMatches - other.propertiesMatches;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };
    return ValidationResult;
  }());

  exports.ValidationResult = ValidationResult;

  function newJSONDocument(root, diagnostics) {
    if (diagnostics === void 0) {
      diagnostics = [];
    }
    return new JSONDocument(root, diagnostics, []);
  }
  exports.newJSONDocument = newJSONDocument;

  // tslint:disable-next-line: no-any
  function getNodeValue(node) {
    return Json.getNodeValue(node);
  }
  exports.getNodeValue = getNodeValue;

  function getNodePath(node) {
    return Json.getNodePath(node);
  }
  exports.getNodePath = getNodePath;

  function contains(node, offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    return ((offset >= node.offset && offset < node.offset + node.length) ||
        (includeRightBound && offset === node.offset + node.length));
  }
  exports.contains = contains;

  var JSONDocument = /** @class */ (function () {
    function JSONDocument(root, syntaxErrors, comments) {
      if (syntaxErrors === void 0) {
        syntaxErrors = [];
      }
      if (comments === void 0) {
        comments = [];
      }
      this.root = root;
      this.syntaxErrors = syntaxErrors;
      this.comments = comments;
    }

    JSONDocument.prototype.getNodeFromOffset = function (offset, includeRightBound) {
      if (includeRightBound === void 0) {
        includeRightBound = false;
      }
      if (this.root) {
        return (Json.findNodeAtOffset(this.root, offset, includeRightBound));
      }
      return void 0;
    };

    JSONDocument.prototype.visit = function (visitor) {
      if (this.root) {
        var doVisit_1 = function (node) {
          var ctn = visitor(node);
          var children = node.children;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length && ctn; i++) {
              ctn = doVisit_1(children[i]);
            }
          }
          return ctn;
        };
        doVisit_1(this.root);
      }
    };

    JSONDocument.prototype.validate = function (textDocument, schema) {
      if (this.root && schema) {
        var validationResult = new ValidationResult(this.isKubernetes);
        validate(this.root, schema, validationResult, NoOpSchemaCollector.instance, this.isKubernetes);
        return validationResult.problems.map(function (p) {
          var range = vscode_languageserver_types_1.Range.create(
            textDocument.positionAt(p.location.offset),
            textDocument.positionAt(p.location.offset + p.location.length));
          return vscode_languageserver_types_1.Diagnostic.create(range, p.message, p.severity, p.code);
        });
      }
      return null;
    };

    JSONDocument.prototype.getMatchingSchemas = function (schema, focusOffset, exclude) {
      if (focusOffset === void 0) { focusOffset = -1; }
      if (exclude === void 0) { exclude = null; }
      var matchingSchemas = new SchemaCollector(focusOffset, exclude);
      if (this.root && schema) {
        validate(this.root, schema, new ValidationResult(this.isKubernetes), matchingSchemas, this.isKubernetes);
      }
      return matchingSchemas.schemas;
    };

    return JSONDocument;
  }());

  exports.JSONDocument = JSONDocument;

  function validate(node, schema, validationResult, matchingSchemas, isKubernetes) {
    if (!node || !matchingSchemas.include(node)) {
      return;
    }

    switch (node.type) {
      case 'object':
        _validateObjectNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'array':
        _validateArrayNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'string':
        _validateStringNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'number':
        _validateNumberNode(node, schema, validationResult, matchingSchemas);
        break;

      case 'property':
        return validate(node.valueNode, schema, validationResult, matchingSchemas, isKubernetes);
    }

    _validateNode();
    matchingSchemas.add({ node: node, schema: schema });
    function _validateNode() {
      var e_3, _a, e_4, _b, e_5, _c;
      function matchesType(type) {
        return (node.type === type || (type === 'integer' && node.type === 'number' && node.isInteger));
      }
      if (Array.isArray(schema.type)) {
        if (!schema.type.some(matchesType)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage ||
                localize('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', schema.type.join(', ')),
          });
        }
      }
      else if (schema.type) {
        if (!matchesType(schema.type)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage ||
                localize('typeMismatchWarning', 'Incorrect type. Expected "{0}".', schema.type),
          });
        }
      }

      if (Array.isArray(schema.allOf)) {
        try {
          for (var _d = __values(schema.allOf), _e = _d.next(); !_e.done; _e = _d.next()) {
            var subSchemaRef = _e.value;
            validate(node, asSchema(subSchemaRef), validationResult, matchingSchemas, isKubernetes);
          }
        }
        catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        }
        finally {
          try {
            if (_e && !_e.done && (_a = _d.return))
              _a.call(_d);
          }
          finally {
            if (e_3)
              throw e_3.error;
          }
        }
      }
      var notSchema = asSchema(schema.not);
      if (notSchema) {
        var subValidationResult = new ValidationResult(isKubernetes);
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, notSchema, subValidationResult, subMatchingSchemas, isKubernetes);
        if (!subValidationResult.hasProblems()) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('notSchemaWarning', 'Matches a schema that is not allowed.'),
          });
        }
        try {
          for (var _f = __values(subMatchingSchemas.schemas), _g = _f.next(); !_g.done; _g = _f.next()) {
            var ms = _g.value;
            ms.inverted = !ms.inverted;
            matchingSchemas.add(ms);
          }
        }
        catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        }
        finally {
          try {
            if (_g && !_g.done && (_b = _f.return))
              _b.call(_f);
          }
          finally {
            if (e_4)
              throw e_4.error;
          }
        }
      }

      var testAlternatives = function (alternatives, maxOneMatch) {
        var e_6, _a;
        var matches = [];
        // remember the best match that is used for error messages
        var bestMatch = null;
        try {
          for (var alternatives_1 = __values(alternatives), alternatives_1_1 = alternatives_1.next(); !alternatives_1_1.done; alternatives_1_1 = alternatives_1.next()) {
            var subSchemaRef = alternatives_1_1.value;
            var subSchema = asSchema(subSchemaRef);
            var subValidationResult = new ValidationResult(isKubernetes);
            var subMatchingSchemas = matchingSchemas.newSub();
            validate(node, subSchema, subValidationResult, subMatchingSchemas, isKubernetes);
            if (!subValidationResult.hasProblems()) {
              matches.push(subSchema);
            }
            if (!bestMatch) {
              bestMatch = {
                schema: subSchema,
                validationResult: subValidationResult,
                matchingSchemas: subMatchingSchemas,
              };
            }
            else if (isKubernetes) {
              bestMatch = alternativeComparison(subValidationResult, bestMatch, subSchema, subMatchingSchemas);
            }
            else {
              bestMatch = genericComparison(maxOneMatch, subValidationResult, bestMatch, subSchema, subMatchingSchemas);
            }
          }
        }
        catch (e_6_1) {
          e_6 = { error: e_6_1 };
        }
        finally {
          try {
            if (alternatives_1_1 && !alternatives_1_1.done && (_a = alternatives_1.return))
              _a.call(alternatives_1);
          }
          finally {
            if (e_6)
              throw e_6.error;
          }
        }

        if (matches.length > 1 && maxOneMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: 1 },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('oneOfWarning', 'Matches multiple schemas when only one must validate.'),
          });
        }

        if (bestMatch !== null) {
          validationResult.merge(bestMatch.validationResult);
          validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
          validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
          matchingSchemas.merge(bestMatch.matchingSchemas);
        }
        return matches.length;
      };

      if (Array.isArray(schema.anyOf)) {
        testAlternatives(schema.anyOf, false);
      }

      if (Array.isArray(schema.oneOf)) {
        testAlternatives(schema.oneOf, true);
      }

      var testBranch = function (schema) {
        var subValidationResult = new ValidationResult(isKubernetes);
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, asSchema(schema), subValidationResult, subMatchingSchemas, isKubernetes);
        validationResult.merge(subValidationResult);
        validationResult.propertiesMatches += subValidationResult.propertiesMatches;
        validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
        matchingSchemas.merge(subMatchingSchemas);
      };

      var testCondition = function (ifSchema, thenSchema, elseSchema) {
        var subSchema = asSchema(ifSchema);
        var subValidationResult = new ValidationResult(isKubernetes);
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, subSchema, subValidationResult, subMatchingSchemas, isKubernetes);
        matchingSchemas.merge(subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          if (thenSchema) {
            testBranch(thenSchema);
          }
        }
        else if (elseSchema) {
          testBranch(elseSchema);
        }
      };

      var ifSchema = asSchema(schema.if);
      if (ifSchema) {
        testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
      }
      if (Array.isArray(schema.enum)) {
        var val = getNodeValue(node);
        var enumValueMatch = false;
        try {
          for (var _h = __values(schema.enum), _j = _h.next(); !_j.done; _j = _h.next()) {
            var e = _j.value;
            if (objects_1.equals(val, e)) {
              enumValueMatch = true;
              break;
            }
          }
        }
        catch (e_5_1) {
          e_5 = {
            error: e_5_1
          };
        }
        finally {
          try {
            if (_j && !_j.done && (_c = _h.return))
              _c.call(_h);
          }
          finally {
            if (e_5)
              throw e_5.error;
          }
        }

        validationResult.enumValues = schema.enum;
        validationResult.enumValueMatch = enumValueMatch;

        if (!enumValueMatch) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            code: vscode_json_languageservice_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage ||
                localize('enumWarning', 'Value is not accepted. Valid values: {0}.', schema.enum.map(function (v) { return JSON.stringify(v); }).join(', ')),
          });
        }
      }
      if (objects_1.isDefined(schema.const)) {
        var val = getNodeValue(node);
        if (!objects_1.equals(val, schema.const)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            code: vscode_json_languageservice_1.ErrorCode.EnumValueMismatch,
            message: schema.errorMessage ||
                localize('constWarning', 'Value must be {0}.', JSON.stringify(schema.const)),
          });
          validationResult.enumValueMatch = false;
        }
        else {
          validationResult.enumValueMatch = true;
        }
        validationResult.enumValues = [schema.const];
      }
      if (schema.deprecationMessage && node.parent) {
        validationResult.problems.push({
          location: { offset: node.parent.offset, length: node.parent.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: schema.deprecationMessage,
        });
      }
    }

    function _validateNumberNode(node, schema, validationResult, matchingSchemas) {
      var val = node.value;
      if (objects_1.isNumber(schema.multipleOf)) {
        if (val % schema.multipleOf !== 0) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('multipleOfWarning', 'Value is not divisible by {0}.', schema.multipleOf),
          });
        }
      }

      function getExclusiveLimit(limit, exclusive) {
        if (objects_1.isNumber(exclusive)) {
          return exclusive;
        }
        if (objects_1.isBoolean(exclusive) && exclusive) {
          return limit;
        }
        return void 0;
      }

      function getLimit(limit, exclusive) {
        if (!objects_1.isBoolean(exclusive) || !exclusive) {
          return limit;
        }
        return void 0;
      }

      var exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
      if (objects_1.isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', exclusiveMinimum),
        });
      }

      var exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
      if (objects_1.isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', exclusiveMaximum),
        });
      }

      var minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
      if (objects_1.isNumber(minimum) && val < minimum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('minimumWarning', 'Value is below the minimum of {0}.', minimum),
        });
      }

      var maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
      if (objects_1.isNumber(maximum) && val > maximum) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('maximumWarning', 'Value is above the maximum of {0}.', maximum),
        });
      }
    }

    function _validateStringNode(node, schema, validationResult, matchingSchemas) {
      if (objects_1.isNumber(schema.minLength) && node.value.length < schema.minLength) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('minLengthWarning', 'String is shorter than the minimum length of {0}.', schema.minLength),
        });
      }
      if (objects_1.isNumber(schema.maxLength) && node.value.length > schema.maxLength) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('maxLengthWarning', 'String is longer than the maximum length of {0}.', schema.maxLength),
        });
      }
      if (objects_1.isString(schema.pattern)) {
        var regex = new RegExp(schema.pattern);
        if (!regex.test(node.value)) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: schema.patternErrorMessage ||
                schema.errorMessage ||
                localize('patternWarning', 'String does not match the pattern of "{0}".', schema.pattern),
          });
        }
      }

      if (schema.format) {
        switch (schema.format) {
          case 'uri':
          case 'uri-reference':
            {
              var errorMessage = void 0;
              if (!node.value) {
                errorMessage = localize('uriEmpty', 'URI expected.');
              }
              else {
                try {
                  var uri = vscode_uri_1.URI.parse(node.value);
                  if (!uri.scheme && schema.format === 'uri') {
                    errorMessage = localize('uriSchemeMissing', 'URI with a scheme is expected.');
                  }
                }
                catch (e) {
                  errorMessage = e.message;
                }
              }
              if (errorMessage) {
                validationResult.problems.push({
                  location: { offset: node.offset, length: node.length },
                  severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                  message: schema.patternErrorMessage ||
                      schema.errorMessage ||
                      localize('uriFormatWarning', 'String is not a URI: {0}', errorMessage),
                });
              }
            }
            break;

          case 'email':
            {
              if (!node.value.match(emailPattern)) {
                validationResult.problems.push({
                  location: { offset: node.offset, length: node.length },
                  severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                  message: schema.patternErrorMessage ||
                      schema.errorMessage ||
                      localize('emailFormatWarning', 'String is not an e-mail address.'),
                });
              }
            }
            break;

          case 'color-hex':
            {
              if (!node.value.match(colorHexPattern)) {
                validationResult.problems.push({
                  location: { offset: node.offset, length: node.length },
                  severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                  // tslint:disable-next-line: max-line-length
                  message: schema.patternErrorMessage ||
                      schema.errorMessage ||
                      localize('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
                });
              }
            }
            break;
        
          default:
        }
      }
    }

    function _validateArrayNode(node, schema, validationResult, matchingSchemas) {
      var e_7, _a;
      if (Array.isArray(schema.items)) {
        var subSchemas = schema.items;
        for (var index = 0; index < subSchemas.length; index++) {
          var subSchemaRef = subSchemas[index];
          var subSchema = asSchema(subSchemaRef);
          var itemValidationResult = new ValidationResult(isKubernetes);
          var item = node.items[index];
          if (item) {
            validate(item, subSchema, itemValidationResult, matchingSchemas, isKubernetes);
            validationResult.mergePropertyMatch(itemValidationResult);
            validationResult.mergeEnumValues(itemValidationResult);
          }
          else if (node.items.length >= subSchemas.length) {
            validationResult.propertiesValueMatches++;
          }
        }

        if (node.items.length > subSchemas.length) {
          if (typeof schema.additionalItems === 'object') {
            for (var i = subSchemas.length; i < node.items.length; i++) {
              var itemValidationResult = new ValidationResult(isKubernetes);
              // tslint:disable-next-line: no-any
              validate(node.items[i], schema.additionalItems, itemValidationResult, matchingSchemas, isKubernetes);
              validationResult.mergePropertyMatch(itemValidationResult);
              validationResult.mergeEnumValues(itemValidationResult);
            }
          }
          else if (schema.additionalItems === false) {
            validationResult.problems.push({
              location: { offset: node.offset, length: node.length },
              severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
              message: localize('additionalItemsWarning', 'Array has too many items according to schema. Expected {0} or fewer.', subSchemas.length),
            });
          }
        }
      }
      else {
        var itemSchema = asSchema(schema.items);
        if (itemSchema) {
          try {
            for (var _b = __values(node.items), _c = _b.next(); !_c.done; _c = _b.next()) {
              var item = _c.value;
              var itemValidationResult = new ValidationResult(isKubernetes);
              validate(item, itemSchema, itemValidationResult, matchingSchemas, isKubernetes);
              validationResult.mergePropertyMatch(itemValidationResult);
              validationResult.mergeEnumValues(itemValidationResult);
            }
          }
          catch (e_7_1) {
            e_7 = {
              error: e_7_1
            };
          }
          finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            }
            finally {
              if (e_7)
                throw e_7.error;
            }
          }
        }
      }

      var containsSchema = asSchema(schema.contains);
      if (containsSchema) {
        var doesContain = node.items.some(function (item) {
          var itemValidationResult = new ValidationResult(isKubernetes);
          validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance, isKubernetes);
          return !itemValidationResult.hasProblems();
        });

        if (!doesContain) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: schema.errorMessage ||
                localize('requiredItemMissingWarning', 'Array does not contain required item.'),
          });
        }
      }

      if (objects_1.isNumber(schema.minItems) && node.items.length < schema.minItems) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('minItemsWarning', 'Array has too few items. Expected {0} or more.', schema.minItems),
        });
      }

      if (objects_1.isNumber(schema.maxItems) && node.items.length > schema.maxItems) {
        validationResult.problems.push({
          location: { offset: node.offset, length: node.length },
          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
          message: localize('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', schema.maxItems),
        });
      }

      if (schema.uniqueItems === true) {
        var values_1 = getNodeValue(node);
        var duplicates = values_1.some(function (value, index) { return index !== values_1.lastIndexOf(value); });
        if (duplicates) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('uniqueItemsWarning', 'Array has duplicate items.'),
          });
        }
      }
    }

    function _validateObjectNode(node, schema, validationResult, matchingSchemas) {
      var e_8, _a, e_9, _b, e_10, _c, e_11, _d, e_12, _e, e_13, _f, e_14, _g, e_15, _h, e_16, _j, e_17, _k;
      var seenKeys = Object.create(null);
      var unprocessedProperties = [];
      try {
        for (var _l = __values(node.properties), _m = _l.next(); !_m.done; _m = _l.next()) {
          var propertyNode = _m.value;
          var key = propertyNode.keyNode.value;
          seenKeys[key] = propertyNode.valueNode;
          unprocessedProperties.push(key);
        }
      }
      catch (e_8_1) {
        e_8 = {
          error: e_8_1
        };
      }
      finally {
        try {
          if (_m && !_m.done && (_a = _l.return))
            _a.call(_l);
        }
        finally {
          if (e_8)
            throw e_8.error;
        }
      }

      if (Array.isArray(schema.required)) {
        try {
          for (var _o = __values(schema.required), _p = _o.next(); !_p.done; _p = _o.next()) {
            var propertyName = _p.value;
            if (!seenKeys[propertyName]) {
              var keyNode = node.parent && node.parent.type === 'property' && node.parent.keyNode;
              var location_1 = keyNode
                  ? { offset: keyNode.offset, length: keyNode.length }
                  : { offset: node.offset, length: 1 };
              validationResult.problems.push({
                location: location_1,
                severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                message: localize('MissingRequiredPropWarning', 'Missing property "{0}".', propertyName),
              });
            }
          }
        }
        catch (e_9_1) {
          e_9 = {
            error: e_9_1
          };
        }
        finally {
          try {
            if (_p && !_p.done && (_b = _o.return))
              _b.call(_o);
          }
          finally {
            if (e_9) throw e_9.error;
          }
        }
      }
      var propertyProcessed = function (prop) {
        var index = unprocessedProperties.indexOf(prop);
        while (index >= 0) {
          unprocessedProperties.splice(index, 1);
          index = unprocessedProperties.indexOf(prop);
        }
      };
      if (schema.properties) {
        try {
          for (var _q = __values(Object.keys(schema.properties)), _r = _q.next(); !_r.done; _r = _q.next()) {
            var propertyName = _r.value;
            propertyProcessed(propertyName);
            var propertySchema = schema.properties[propertyName];
            var child = seenKeys[propertyName];
            if (child) {
              if (objects_1.isBoolean(propertySchema)) {
                if (!propertySchema) {
                  var propertyNode = child.parent;
                  validationResult.problems.push({
                    location: {
                        offset: propertyNode.keyNode.offset,
                        length: propertyNode.keyNode.length,
                    },
                    severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                    message: schema.errorMessage ||
                        localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName),
                  });
                }
                else {
                  validationResult.propertiesMatches++;
                  validationResult.propertiesValueMatches++;
                }
              }
              else {
                var propertyValidationResult = new ValidationResult(isKubernetes);
                validate(child, propertySchema, propertyValidationResult, matchingSchemas, isKubernetes);
                validationResult.mergePropertyMatch(propertyValidationResult);
                validationResult.mergeEnumValues(propertyValidationResult);
              }
            }
          }
        }
        catch (e_10_1) {
          e_10 = { error: e_10_1 };
        }
        finally {
          try {
            if (_r && !_r.done && (_c = _q.return))
              _c.call(_q);
          }
          finally {
            if (e_10)
              throw e_10.error;
          }
        }
      }

      if (schema.patternProperties) {
        try {
          for (var _s = __values(Object.keys(schema.patternProperties)), _t = _s.next(); !_t.done; _t = _s.next()) {
            var propertyPattern = _t.value;
            var regex = new RegExp(propertyPattern);
            try {
              for (var _u = (e_12 = void 0, __values(unprocessedProperties.slice(0))), _v = _u.next(); !_v.done; _v = _u.next()) {
                var propertyName = _v.value;
                if (regex.test(propertyName)) {
                  propertyProcessed(propertyName);
                  var child = seenKeys[propertyName];
                  if (child) {
                    var propertySchema = schema.patternProperties[propertyPattern];
                    if (objects_1.isBoolean(propertySchema)) {
                      if (!propertySchema) {
                        var propertyNode = child.parent;
                        validationResult.problems.push({
                          location: {
                              offset: propertyNode.keyNode.offset,
                              length: propertyNode.keyNode.length,
                          },
                          severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                          message: schema.errorMessage ||
                              localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName),
                        });
                      }
                      else {
                        validationResult.propertiesMatches++;
                        validationResult.propertiesValueMatches++;
                      }
                    }
                    else {
                      var propertyValidationResult = new ValidationResult(isKubernetes);
                      validate(child, propertySchema, propertyValidationResult, matchingSchemas, isKubernetes);
                      validationResult.mergePropertyMatch(propertyValidationResult);
                      validationResult.mergeEnumValues(propertyValidationResult);
                    }
                  }
                }
              }
            }
            catch (e_12_1) {
              e_12 = { error: e_12_1 };
            }
            finally {
              try {
                if (_v && !_v.done && (_e = _u.return))
                  _e.call(_u);
              }
              finally {
                if (e_12)
                  throw e_12.error;
              }
            }
          }
        }
        catch (e_11_1) {
          e_11 = { error: e_11_1 };
        }
        finally {
          try {
            if (_t && !_t.done && (_d = _s.return))
              _d.call(_s);
          }
          finally {
            if (e_11)
              throw e_11.error;
          }
        }
      }

      if (typeof schema.additionalProperties === 'object') {
        try {
          for (var unprocessedProperties_1 = __values(unprocessedProperties), unprocessedProperties_1_1 = unprocessedProperties_1.next(); !unprocessedProperties_1_1.done; unprocessedProperties_1_1 = unprocessedProperties_1.next()) {
            var propertyName = unprocessedProperties_1_1.value;
            var child = seenKeys[propertyName];
            if (child) {
              var propertyValidationResult = new ValidationResult(isKubernetes);
              // tslint:disable-next-line: no-any
              validate(child, schema.additionalProperties, propertyValidationResult, matchingSchemas, isKubernetes);
              validationResult.mergePropertyMatch(propertyValidationResult);
              validationResult.mergeEnumValues(propertyValidationResult);
            }
          }
        }
        catch (e_13_1) {
          e_13 = { error: e_13_1 };
        }
        finally {
          try {
            if (unprocessedProperties_1_1 && !unprocessedProperties_1_1.done && (_f = unprocessedProperties_1.return))
              _f.call(unprocessedProperties_1);
          }
          finally {
            if (e_13)
              throw e_13.error;
          }
        }
      }
      else if (schema.additionalProperties === false) {
        if (unprocessedProperties.length > 0) {
          try {
            for (var unprocessedProperties_2 = __values(unprocessedProperties), unprocessedProperties_2_1 = unprocessedProperties_2.next(); !unprocessedProperties_2_1.done; unprocessedProperties_2_1 = unprocessedProperties_2.next()) {
              var propertyName = unprocessedProperties_2_1.value;
              var child = seenKeys[propertyName];
              if (child) {
                var propertyNode = null;
                if (child.type !== 'property') {
                  propertyNode = child.parent;
                  if (propertyNode.type === 'object') {
                    propertyNode = propertyNode.properties[0];
                  }
                }
                else {
                  propertyNode = child;
                }

                validationResult.problems.push({
                  location: {
                    offset: propertyNode.keyNode.offset,
                    length: propertyNode.keyNode.length,
                  },
                  severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                  message: schema.errorMessage ||
                      localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName),
                });
              }
            }
          }
          catch (e_14_1) {
            e_14 = { error: e_14_1 };
          }
          finally {
            try {
              if (unprocessedProperties_2_1 && !unprocessedProperties_2_1.done && (_g = unprocessedProperties_2.return))
                _g.call(unprocessedProperties_2);
            }
            finally {
              if (e_14)
                throw e_14.error;
            }
          }
        }
      }

      if (objects_1.isNumber(schema.maxProperties)) {
        if (node.properties.length > schema.maxProperties) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('MaxPropWarning', 'Object has more properties than limit of {0}.', schema.maxProperties),
          });
        }
      }

      if (objects_1.isNumber(schema.minProperties)) {
        if (node.properties.length < schema.minProperties) {
          validationResult.problems.push({
            location: { offset: node.offset, length: node.length },
            severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
            message: localize('MinPropWarning', 'Object has fewer properties than the required number of {0}', schema.minProperties),
          });
        }
      }

      if (schema.dependencies) {
        try {
          for (var _w = __values(Object.keys(schema.dependencies)), _x = _w.next(); !_x.done; _x = _w.next()) {
            var key = _x.value;
            var prop = seenKeys[key];
            if (prop) {
              var propertyDep = schema.dependencies[key];
              if (Array.isArray(propertyDep)) {
                try {
                  for (var propertyDep_1 = (e_16 = void 0, __values(propertyDep)), propertyDep_1_1 = propertyDep_1.next(); !propertyDep_1_1.done; propertyDep_1_1 = propertyDep_1.next()) {
                    var requiredProp = propertyDep_1_1.value;
                    if (!seenKeys[requiredProp]) {
                      validationResult.problems.push({
                        location: { offset: node.offset, length: node.length },
                        severity: vscode_languageserver_types_1.DiagnosticSeverity.Warning,
                        message: localize('RequiredDependentPropWarning', 'Object is missing property {0} required by property {1}.', requiredProp, key),
                      });
                    }
                    else {
                      validationResult.propertiesValueMatches++;
                    }
                  }
                }
                catch (e_16_1) {
                  e_16 = { error: e_16_1 };
                }
                finally {
                  try {
                    if (propertyDep_1_1 && !propertyDep_1_1.done && (_j = propertyDep_1.return))
                      _j.call(propertyDep_1);
                  }
                  finally {
                    if (e_16)
                      throw e_16.error;
                  }
                }
              }
              else {
                var propertySchema = asSchema(propertyDep);
                if (propertySchema) {
                  var propertyValidationResult = new ValidationResult(isKubernetes);
                  validate(node, propertySchema, propertyValidationResult, matchingSchemas, isKubernetes);
                  validationResult.mergePropertyMatch(propertyValidationResult);
                  validationResult.mergeEnumValues(propertyValidationResult);
                }
              }
            }
          }
        }
        catch (e_15_1) {
          e_15 = { error: e_15_1 };
        }
        finally {
          try {
            if (_x && !_x.done && (_h = _w.return))
              _h.call(_w);
          }
          finally {
            if (e_15)
              throw e_15.error;
          }
        }
      }

      var propertyNames = asSchema(schema.propertyNames);
      if (propertyNames) {
        try {
          for (var _y = __values(node.properties), _z = _y.next(); !_z.done; _z = _y.next()) {
            var f = _z.value;
            var key = f.keyNode;
            if (key) {
              validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance, isKubernetes);
            }
          }
        }
        catch (e_17_1) {
          e_17 = { error: e_17_1 };
        }
        finally {
          try {
              if (_z && !_z.done && (_k = _y.return))
              _k.call(_y);
          }
          finally {
            if (e_17)
              throw e_17.error;
          }
        }
      }
    }

    //Alternative comparison is specifically used by the kubernetes/openshift schema but may lead to better results then genericComparison depending on the schema
    function alternativeComparison(subValidationResult, bestMatch, subSchema, subMatchingSchemas) {
      var compareResult = subValidationResult.compareKubernetes(bestMatch.validationResult);
      if (compareResult > 0) {
        // our node is the best matching so far
        bestMatch = {
          schema: subSchema,
          validationResult: subValidationResult,
          matchingSchemas: subMatchingSchemas,
        };
      }
      else if (compareResult === 0) {
        // there's already a best matching but we are as good
        bestMatch.matchingSchemas.merge(subMatchingSchemas);
        bestMatch.validationResult.mergeEnumValues(subValidationResult);
      }
      return bestMatch;
    }

    //genericComparison tries to find the best matching schema using a generic comparison
    function genericComparison(maxOneMatch, subValidationResult, bestMatch, subSchema, subMatchingSchemas) {
      if (!maxOneMatch &&
        !subValidationResult.hasProblems() &&
        !bestMatch.validationResult.hasProblems()) {
        // no errors, both are equally good matches
        bestMatch.matchingSchemas.merge(subMatchingSchemas);
        bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
        bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
      }
      else {
        var compareResult = subValidationResult.compareGeneric(bestMatch.validationResult);
        if (compareResult > 0) {
          // our node is the best matching so far
          bestMatch = {
            schema: subSchema,
            validationResult: subValidationResult,
            matchingSchemas: subMatchingSchemas,
          };
        }
        else if (compareResult === 0) {
          // there's already a best matching but we are as good
          bestMatch.matchingSchemas.merge(subMatchingSchemas);
          bestMatch.validationResult.mergeEnumValues(subValidationResult);
        }
      }
      return bestMatch;
    }
  }
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/yamlAST',
      ["require", "exports"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var Kind;

  (function (Kind) {
    Kind[Kind["SCALAR"] = 0] = "SCALAR";
    Kind[Kind["MAPPING"] = 1] = "MAPPING";
    Kind[Kind["MAP"] = 2] = "MAP";
    Kind[Kind["SEQ"] = 3] = "SEQ";
    Kind[Kind["ANCHOR_REF"] = 4] = "ANCHOR_REF";
    Kind[Kind["INCLUDE_REF"] = 5] = "INCLUDE_REF";
  })(Kind = exports.Kind || (exports.Kind = {}));

  function newMapping(key, value) {
    var end = value ? value.endPosition : key.endPosition + 1;
    //FIXME.workaround, end should be defied by position of ':'
    //console.log('key: ' + key.value + ' ' + key.startPosition + '..' + key.endPosition + ' ' + value + ' end: ' + end);
    var node = {
      key: key,
      value: value,
      startPosition: key.startPosition,
      endPosition: end,
      kind: Kind.MAPPING,
      parent: null,
      errors: [],
    };
    return node;
  }
  exports.newMapping = newMapping;

  function newAnchorRef(key, start, end, value) {
    return {
      errors: [],
      referencesAnchor: key,
      value: value,
      startPosition: start,
      endPosition: end,
      kind: Kind.ANCHOR_REF,
      parent: null,
    };
  }
  exports.newAnchorRef = newAnchorRef;

  function newScalar(v) {
    if (v === void 0) { v = ''; }
    var result = {
      errors: [],
      startPosition: -1,
      endPosition: -1,
      value: '' + v,
      kind: Kind.SCALAR,
      parent: null,
      doubleQuoted: false,
      rawValue: '' + v,
    };
    if (typeof v !== 'string') {
      result.valueObject = v;
    }
    return result;
  }
  exports.newScalar = newScalar;

  function newItems() {
    return {
      errors: [],
      startPosition: -1,
      endPosition: -1,
      items: [],
      kind: Kind.SEQ,
      parent: null,
    };
  }
  exports.newItems = newItems;

  function newSeq() {
    return newItems();
  }
  exports.newSeq = newSeq;

  function newMap(mappings) {
    return {
      errors: [],
      startPosition: -1,
      endPosition: -1,
      mappings: mappings ? mappings : [],
      kind: Kind.MAP,
      parent: null,
    };
  }
  exports.newMap = newMap;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vs/language/yaml/yaml-ast-parser-custom-tags/common',["require", "exports"], factory);
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  function isNothing(subject) {
    return typeof subject === 'undefined' || null === subject;
  }
  exports.isNothing = isNothing;

  function isObject(subject) {
    return typeof subject === 'object' && null !== subject;
  }
  exports.isObject = isObject;

  function toArray(sequence) {
    if (Array.isArray(sequence)) {
      return sequence;
    }
    else if (isNothing(sequence)) {
      return [];
    }
    return [sequence];
  }
  exports.toArray = toArray;

  function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
      sourceKeys = Object.keys(source);
      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }
    return target;
  }
  exports.extend = extend;

  function repeat(string, count) {
    var result = '', cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }
    return result;
  }
  exports.repeat = repeat;

  function isNegativeZero(number) {
    return 0 === number && Number.NEGATIVE_INFINITY === 1 / number;
  }
  exports.isNegativeZero = isNegativeZero;
});

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vs/language/yaml/yaml-ast-parser-custom-tags/exception',["require", "exports"], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });

  var YAMLException = /** @class */ (function () {
    function YAMLException(reason, mark, isWarning) {
      if (mark === void 0) { mark = null; }
      if (isWarning === void 0) { isWarning = false; }
      this.name = 'YAMLException';
      this.reason = reason;
      this.mark = mark;
      this.message = this.toString(false);
      this.isWarning = isWarning;
    }

    YAMLException.isInstance = function (instance) {
      var e_1, _a;
      if (instance != null &&
          instance.getClassIdentifier &&
          typeof instance.getClassIdentifier == 'function') {
          try {
              for (var _b = __values(instance.getClassIdentifier()), _c = _b.next(); !_c.done; _c = _b.next()) {
                  var currentIdentifier = _c.value;
                  if (currentIdentifier == YAMLException.CLASS_IDENTIFIER)
                      return true;
              }
          }
          catch (e_1_1) { e_1 = { error: e_1_1 }; }
          finally {
              try {
                  if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
              }
              finally { if (e_1) throw e_1.error; }
          }
      }
      return false;
    };

    YAMLException.prototype.getClassIdentifier = function () {
      var superIdentifiers = [];
      return superIdentifiers.concat(YAMLException.CLASS_IDENTIFIER);
    };
    YAMLException.prototype.toString = function (compact) {
      if (compact === void 0) { compact = false; }
      var result;
      result = 'JS-YAML: ' + (this.reason || '(unknown reason)');
      if (!compact && this.mark) {
        result += ' ' + this.mark.toString();
      }
      return result;
    };

    YAMLException.CLASS_IDENTIFIER = 'yaml-ast-parser.YAMLException';
    return YAMLException;
  }());

  exports.default = YAMLException;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define('vs/language/yaml/yaml-ast-parser-custom-tags/mark',["require", "exports", "./common"], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var common = require("./common");
  var Mark = /** @class */ (function () {
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }

    Mark.prototype.getSnippet = function (indent, maxLength) {
      if (indent === void 0) { indent = 0; }
      if (maxLength === void 0) { maxLength = 75; }
      var head, start, tail, end, snippet;
      if (!this.buffer) {
        return null;
      }
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = '';
      start = this.position;
      while (start > 0 &&
        -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1))) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = ' ... ';
          start += 5;
          break;
        }
      }
      tail = '';
      end = this.position;
      while (end < this.buffer.length &&
        -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end))) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = ' ... ';
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return (common.repeat(' ', indent) +
        head +
        snippet +
        tail +
        '\n' +
        common.repeat(' ', indent + this.position - start + head.length) +
        '^');
    };

    Mark.prototype.toString = function (compact) {
      if (compact === void 0) { compact = true; }
      var snippet, where = '';
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ':\n' + snippet;
        }
      }
      return where;
    };

    return Mark;
  }());

  exports.default = Mark;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type',
      [
        "require",
        "exports",
        "./exception"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var exception_1 = require("./exception");

  var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'defaultStyle',
    'styleAliases',
  ];

  var YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];

  function compileStyleAliases(map) {
    var result = {};
    if (null !== map) {
      Object.keys(map).forEach(function (style) {
        map[style].forEach(function (alias) {
            result[String(alias)] = style;
        });
      });
    }
    return result;
  }

  var Type = /** @class */ (function () {
    function Type(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function (name) {
        if (-1 === TYPE_CONSTRUCTOR_OPTIONS.indexOf(name)) {
          throw new exception_1.default('Unknown option "' +
              name +
              '" is met in definition of "' +
              tag +
              '" YAML type.');
        }
      });

      // TODO: Add tag format check.
      this.tag = tag;
      this.kind = options['kind'] || null;
      this.resolve = options['resolve'] || function () {return true;};
      this.construct = options['construct'] || function (data) { return data; };
      this.instanceOf = options['instanceOf'] || null;
      this.predicate = options['predicate'] || null;
      this.represent = options['represent'] || null;
      this.defaultStyle = options['defaultStyle'] || null;
      this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
      if (-1 === YAML_NODE_KINDS.indexOf(this.kind)) {
          throw new exception_1.default('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    return Type;
  }());

  exports.Type = Type;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema',
      ["require", "exports", "./common", "./exception", "./type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  /*eslint-disable max-len*/
  var common = require("./common");
  var exception_1 = require("./exception");
  var type_1 = require("./type");

  function compileList(schema, name, result) {
    var exclude = [];
    schema.include.forEach(function (includedSchema) {
      result = compileList(includedSchema, name, result);
    });
    schema[name].forEach(function (currentType) {
      result.forEach(function (previousType, previousIndex) {
        if (previousType.tag === currentType.tag) {
          exclude.push(previousIndex);
        }
      });
      result.push(currentType);
    });
    return result.filter(function (type, index) {
      return -1 === exclude.indexOf(index);
    });
  }

  function compileMap( /* lists... */) {
    var result = {}, index, length;
    function collectType(type) {
      result[type.tag] = type;
    }
    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }

  var Schema = /** @class */ (function () {
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function (type) {
        if (type.loadKind && 'scalar' !== type.loadKind) {
          throw new exception_1.default('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
      });
      this.compiledImplicit = compileList(this, 'implicit', []);
      this.compiledExplicit = compileList(this, 'explicit', []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }

    Schema.DEFAULT = null;

    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;

        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;

        default:
          throw new exception_1.default('Wrong number of arguments for Schema.create function');
      }

      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function (schema) {
        return schema instanceof Schema;
      })) {
        throw new exception_1.default('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
      }

      if (!types.every(function (type) {
        return type instanceof type_1.Type;
      })) {
        throw new exception_1.default('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }

      return new Schema({
        include: schemas,
        explicit: types,
      });
    };

    return Schema;
  }());
  exports.Schema = Schema;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/str',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  exports.default = new type_1.Type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (data) {
      return null !== data ? data : '';
    },
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/seq',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  exports.default = new type_1.Type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (data) {
      return null !== data ? data : [];
    },
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/map',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  exports.default = new type_1.Type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (data) {
      return null !== data ? data : {};
    },
  });
});

// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema/failsafe',
      [
        "require", "exports", "../schema", "../type/str", "../type/seq", "../type/map"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var schema_1 = require("../schema");
  var str_1 = require("../type/str");
  var seq_1 = require("../type/seq");
  var map_1 = require("../type/map");
  exports.default = new schema_1.Schema({
    explicit: [str_1.default, seq_1.default, map_1.default],
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/null',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  function resolveYamlNull(data) {
    if (null === data) {
      return true;
    }
    var max = data.length;
    return ((max === 1 && data === '~') || (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL')));
  }

  function constructYamlNull() {
    return null;
  }

  function isNull(object) {
    return null === object;
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function () {
        return '~';
      },
      lowercase: function () {
        return 'null';
      },
      uppercase: function () {
        return 'NULL';
      },
      camelcase: function () {
        return 'Null';
      },
    },

    defaultStyle: 'lowercase',
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/bool',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });

  'use strict';
  var type_1 = require("../type");
  function resolveYamlBoolean(data) {
    if (null === data) {
      return false;
    }
    var max = data.length;
    return ((max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
        (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE')));
  }

  function constructYamlBoolean(data) {
    return data === 'true' || data === 'True' || data === 'TRUE';
  }

  function isBoolean(object) {
    return '[object Boolean]' === Object.prototype.toString.call(object);
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function (object) {
        return object ? 'true' : 'false';
      },
      uppercase: function (object) {
        return object ? 'TRUE' : 'FALSE';
      },
      camelcase: function (object) {
        return object ? 'True' : 'False';
      },
    },
    defaultStyle: 'lowercase',
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/int',
      ["require", "exports", "../common", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var common = require("../common");
  var type_1 = require("../type");

  function isHexCode(c) {
    return ((0x30 /* 0 */ <= c && c <= 0x39) /* 9 */ ||
        (0x41 /* A */ <= c && c <= 0x46) /* F */ ||
        (0x61 /* a */ <= c && c <= 0x66) /* f */);
  }

  function isOctCode(c) {
    return 0x30 /* 0 */ <= c && c <= 0x37 /* 7 */;
  }

  function isDecCode(c) {
    return 0x30 /* 0 */ <= c && c <= 0x39 /* 9 */;
  }

  function resolveYamlInteger(data) {
    if (null === data) {
      return false;
    }

    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) {
      return false;
    }

    ch = data[index];
    // sign
    if (ch === '-' || ch === '+') {
      ch = data[++index];
    }
    if (ch === '0') {
      // 0
      if (index + 1 === max) {
        return true;
      }
      ch = data[++index];
      // base 2, base 8, base 16
      if (ch === 'b') {
        // base 2
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') {
            continue;
          }
          if (ch !== '0' && ch !== '1') {
            return false;
          }
          hasDigits = true;
        }
        return hasDigits;
      }
      if (ch === 'x') {
        // base 16
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') {
            continue;
          }
          if (!isHexCode(data.charCodeAt(index))) {
            return false;
          }
          hasDigits = true;
        }
        return hasDigits;
      }

      // base 8
      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') {
          continue;
        }
        if (!isOctCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      return hasDigits;
    }
    // base 10 (except 0) or base 60
    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') {
        continue;
      }
      if (ch === ':') {
        break;
      }
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits) {
      return false;
    }
    // if !base60 - done;
    if (ch !== ':') {
        return true;
    }
    // base60 almost not used, no needs to optimize
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
  }

  function constructYamlInteger(data) {
    var value = data, sign = 1, ch, base, digits = [];
    if (value.indexOf('_') !== -1) {
      value = value.replace(/_/g, '');
    }
    ch = value[0];
    if (ch === '-' || ch === '+') {
      if (ch === '-') {
        sign = -1;
      }
      value = value.slice(1);
      ch = value[0];
    }
    if ('0' === value) {
      return 0;
    }

    if (ch === '0') {
      if (value[1] === 'b') {
        return sign * parseInt(value.slice(2), 2);
      }
      if (value[1] === 'x') {
        return sign * parseInt(value, 16);
      }
      return sign * parseInt(value, 8);
    }

    if (value.indexOf(':') !== -1) {
      value.split(':').forEach(function (v) {
        digits.unshift(parseInt(v, 10));
      });
      value = 0;
      base = 1;
      digits.forEach(function (d) {
        value += d * base;
        base *= 60;
      });
      return sign * value;
    }
    return sign * parseInt(value, 10);
  }

  function isInteger(object) {
    return ('[object Number]' === Object.prototype.toString.call(object) &&
        0 === object % 1 &&
        !common.isNegativeZero(object));
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function (object) {
        return '0b' + object.toString(2);
      },
      octal: function (object) {
        return '0' + object.toString(8);
      },
      decimal: function (object) {
        return object.toString(10);
      },
      hexadecimal: function (object) {
        return '0x' + object.toString(16).toUpperCase();
      },
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary: [2, 'bin'],
      octal: [8, 'oct'],
      decimal: [10, 'dec'],
      hexadecimal: [16, 'hex'],
    },
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/float',
      ["require", "exports", "../common", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var common = require("../common");
  var type_1 = require("../type");
  var YAML_FLOAT_PATTERN = new RegExp('^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?' +
    '|\\.[0-9_]+(?:[eE][-+][0-9]+)?' +
    '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
    '|[-+]?\\.(?:inf|Inf|INF)' +
    '|\\.(?:nan|NaN|NAN))$');
  function resolveYamlFloat(data) {
    if (null === data) {
      return false;
    }
    var value, sign, base, digits;
    if (!YAML_FLOAT_PATTERN.test(data)) {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value, sign, base, digits;
    value = data.replace(/_/g, '').toLowerCase();
    sign = '-' === value[0] ? -1 : 1;
    digits = [];
    if (0 <= '+-'.indexOf(value[0])) {
      value = value.slice(1);
    }
    if ('.inf' === value) {
      return 1 === sign ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    }
    else if ('.nan' === value) {
      return NaN;
    }
    else if (0 <= value.indexOf(':')) {
      value.split(':').forEach(function (v) {
        digits.unshift(parseFloat(v, 10));
      });
      value = 0.0;
      base = 1;
      digits.forEach(function (d) {
        value += d * base;
        base *= 60;
      });
      return sign * value;
    }
    return sign * parseFloat(value, 10);
  }
  function representYamlFloat(object, style) {
    if (isNaN(object)) {
      switch (style) {
        case 'lowercase':
          return '.nan';
        case 'uppercase':
          return '.NAN';
        case 'camelcase':
          return '.NaN';
      }
    }
    else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase':
          return '.inf';
        case 'uppercase':
          return '.INF';
        case 'camelcase':
          return '.Inf';
      }
    }
    else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase':
          return '-.inf';
        case 'uppercase':
          return '-.INF';
        case 'camelcase':
          return '-.Inf';
      }
    }
    else if (common.isNegativeZero(object)) {
      return '-0.0';
    }
    return object.toString(10);
  }
  function isFloat(object) {
    return ('[object Number]' === Object.prototype.toString.call(object) &&
        (0 !== object % 1 || common.isNegativeZero(object)));
  }
  exports.default = new type_1.Type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase',
  });
});

// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema/json',
      [
        "require",
        "exports",
        "../schema",
        "./failsafe",
        "../type/null",
        "../type/bool",
        "../type/int",
        "../type/float"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var schema_1 = require("../schema");
  var failsafe_1 = require("./failsafe");
  var null_1 = require("../type/null");
  var bool_1 = require("../type/bool");
  var int_1 = require("../type/int");
  var float_1 = require("../type/float");
  exports.default = new schema_1.Schema({
    include: [failsafe_1.default],
    implicit: [null_1.default, bool_1.default, int_1.default, float_1.default],
  });
});

// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema/core',
      [
        "require",
        "exports",
        "../schema",
        "./json"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var schema_1 = require("../schema");
  var json_1 = require("./json");
  exports.default = new schema_1.Schema({
    include: [json_1.default],
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/timestamp',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
    '-([0-9][0-9]?)' + // [2] month
    '-([0-9][0-9]?)' + // [3] day
    '(?:(?:[Tt]|[ \\t]+)' + // ...
    '([0-9][0-9]?)' + // [4] hour
    ':([0-9][0-9])' + // [5] minute
    ':([0-9][0-9])' + // [6] second
    '(?:\\.([0-9]*))?' + // [7] fraction
    '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
    '(?::([0-9][0-9]))?))?)?$'); // [11] tz_minute

  function resolveYamlTimestamp(data) {
    if (null === data) {
      return false;
    }
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (null === match) {
      return false;
    }
    return true;
  }

  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (null === match) {
      throw new Error('Date resolve error');
    }

    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
      // no hour
      return new Date(Date.UTC(year, month, day));
    }

    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        // milli-seconds
        fraction = fraction + '0';
      }
      fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
      tz_hour = +match[10];
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
      if ('-' === match[9]) {
        delta = -delta;
      }
    }

    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) {
      date.setTime(date.getTime() - delta);
    }
    return date;
  }

  function representYamlTimestamp(object /*, style*/) {
    return object.toISOString();
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/merge',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  function resolveYamlMerge(data) {
    return '<<' === data || null === data;
  }
  exports.default = new type_1.Type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/binary',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  // [ 64, 65, 66 ] -> [ padding, CR, LF ]
  var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
  function resolveYamlBinary(data) {
    if (null === data) {
      return false;
    }

    var code, idx, bitlen = 0, len = 0, max = data.length, map = BASE64_MAP;
    // Convert one by one.
    for (idx = 0; idx < max; idx++) {
      code = map.indexOf(data.charAt(idx));

      // Skip CR/LF
      if (code > 64) {
        continue;
      }

      // Fail on illegal characters
      if (code < 0) {
        return false;
      }
      bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
  }

  function constructYamlBinary(data) {
    var code, idx, tailbits, input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
    max = input.length, map = BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for (idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push((bits >> 16) & 0xff);
        result.push((bits >> 8) & 0xff);
        result.push(bits & 0xff);
      }
      bits = (bits << 6) | map.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = (max % 4) * 6;
    if (tailbits === 0) {
      result.push((bits >> 16) & 0xff);
      result.push((bits >> 8) & 0xff);
      result.push(bits & 0xff);
    }
    else if (tailbits === 18) {
      result.push((bits >> 10) & 0xff);
      result.push((bits >> 2) & 0xff);
    }
    else if (tailbits === 12) {
      result.push((bits >> 4) & 0xff);
    }

    // Wrap into Buffer for NodeJS and leave Array for browser
    if (NodeBuffer) {
      return new NodeBuffer(result);
    }
    return result;
  }

  function representYamlBinary(object /*, style*/) {
    var result = '', bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for (idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map[(bits >> 18) & 0x3f];
        result += map[(bits >> 12) & 0x3f];
        result += map[(bits >> 6) & 0x3f];
        result += map[bits & 0x3f];
      }
      bits = (bits << 8) + object[idx];
    }

    // Dump tail
    tail = max % 3;
    if (tail === 0) {
      result += map[(bits >> 18) & 0x3f];
      result += map[(bits >> 12) & 0x3f];
      result += map[(bits >> 6) & 0x3f];
      result += map[bits & 0x3f];
    }
    else if (tail === 2) {
      result += map[(bits >> 10) & 0x3f];
      result += map[(bits >> 4) & 0x3f];
      result += map[(bits << 2) & 0x3f];
      result += map[64];
    }
    else if (tail === 1) {
      result += map[(bits >> 2) & 0x3f];
      result += map[(bits << 4) & 0x3f];
      result += map[64];
      result += map[64];
    }
    return result;
  }

  function isBinary(object) {
    return NodeBuffer && NodeBuffer.isBuffer(object);
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/omap',
      ["require", "exports", "../type"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var _toString = Object.prototype.toString;

  function resolveYamlOmap(data) {
    if (null === data) {
        return true;
    }

    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;
      if ('[object Object]' !== _toString.call(pair)) {
        return false;
      }

      for (pairKey in pair) {
        if (_hasOwnProperty.call(pair, pairKey)) {
          if (!pairHasKey) {
            pairHasKey = true;
          }
          else {
            return false;
          }
        }
      }

      if (!pairHasKey) {
        return false;
      }

      if (-1 === objectKeys.indexOf(pairKey)) {
        objectKeys.push(pairKey);
      }
      else {
        return false;
      }
    }
    return true;
  }

  function constructYamlOmap(data) {
    return null !== data ? data : [];
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/pairs',
      ["require", "exports", "../type", "../yamlAST"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  var ast = require("../yamlAST");
  var _toString = Object.prototype.toString;

  function resolveYamlPairs(data) {
    if (null === data) {
      return true;
    }
    if (data.kind != ast.Kind.SEQ) {
      return false;
    }

    var index, length, pair, keys, result, object = data.items;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      if ('[object Object]' !== _toString.call(pair)) {
        return false;
      }
      if (!Array.isArray(pair.mappings)) {
        return false;
      }
      if (1 !== pair.mappings.length) {
        return false;
      }
    }
    return true;
  }

  function constructYamlPairs(data) {
    if (null === data || !Array.isArray(data.items)) {
      return [];
    }

    var index, length, keys, result, object = data.items;
    result = ast.newItems();
    result.parent = data.parent;
    result.startPosition = data.startPosition;
    result.endPosition = data.endPosition;
    for (index = 0, length = object.length; index < length; index += 1) {
      var pair = object[index];
      var mapping = pair.mappings[0];
      var pairSeq = ast.newItems();
      pairSeq.parent = result;
      pairSeq.startPosition = mapping.key.startPosition;
      pairSeq.endPosition = mapping.value.startPosition;
      mapping.key.parent = pairSeq;
      mapping.value.parent = pairSeq;
      pairSeq.items = [mapping.key, mapping.value];
      result.items.push(pairSeq);
    }
    return result;
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/set',
      ["require", "exports", "../type", "../yamlAST"],
      factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../type");
  var ast = require("../yamlAST");
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (null === data) {
      return true;
    }
    if (data.kind != ast.Kind.MAP) {
      return false;
    }
    return true;
  }
  function constructYamlSet(data) {
    return null !== data ? data : {};
  }
  exports.default = new type_1.Type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet,
  });
});

// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema/default_safe',
      [
        "require",
        "exports",
        "../schema",
        "./core",
        "../type/timestamp",
        "../type/merge",
        "../type/binary",
        "../type/omap",
        "../type/pairs",
        "../type/set"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var schema_1 = require("../schema");
  var core_1 = require("./core");
  var timestamp_1 = require("../type/timestamp");
  var merge_1 = require("../type/merge");
  var binary_1 = require("../type/binary");
  var omap_1 = require("../type/omap");
  var pairs_1 = require("../type/pairs");
  var set_1 = require("../type/set");
  var schema = new schema_1.Schema({
    include: [core_1.default],
    implicit: [timestamp_1.default, merge_1.default],
    explicit: [binary_1.default, omap_1.default, pairs_1.default, set_1.default],
  });

  exports.default = schema;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/js/undefined',
      [
        "require",
        "exports",
        "../../type"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../../type");
  function resolveJavascriptUndefined() {
    return true;
  }
  function constructJavascriptUndefined() {
    /*eslint-disable no-undefined*/
    return undefined;
  }
  function representJavascriptUndefined() {
    return '';
  }
  function isUndefined(object) {
    return 'undefined' === typeof object;
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: resolveJavascriptUndefined,
    construct: constructJavascriptUndefined,
    predicate: isUndefined,
    represent: representJavascriptUndefined,
  });
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/type/js/regexp',
      [
        "require",
        "exports",
        "../../type"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });
  var type_1 = require("../../type");

  function resolveJavascriptRegExp(data) {
    if (null === data) {
      return false;
    }
    if (0 === data.length) {
      return false;
    }
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // if regexp starts with '/' it can have modifiers and must be properly closed
    // `/foo/gim` - modifiers tail can be maximum 3 chars
    if ('/' === regexp[0]) {
      if (tail) {
        modifiers = tail[1];
      }
      if (modifiers.length > 3) {
        return false;
      }
      // if expression starts with /, is should be properly terminated
      if (regexp[regexp.length - modifiers.length - 1] !== '/') {
        return false;
      }
      regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    try {
      var dummy = new RegExp(regexp, modifiers);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  function constructJavascriptRegExp(data) {
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // `/foo/gim` - tail can be maximum 4 chars
    if ('/' === regexp[0]) {
      if (tail) {
        modifiers = tail[1];
      }
      regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    return new RegExp(regexp, modifiers);
  }

  function representJavascriptRegExp(object /*, style*/) {
    var result = '/' + object.source + '/';
    if (object.global) {
      result += 'g';
    }
    if (object.multiline) {
      result += 'm';
    }
    if (object.ignoreCase) {
      result += 'i';
    }
    return result;
  }

  function isRegExp(object) {
    return '[object RegExp]' === Object.prototype.toString.call(object);
  }

  exports.default = new type_1.Type('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: resolveJavascriptRegExp,
    construct: constructJavascriptRegExp,
    predicate: isRegExp,
    represent: representJavascriptRegExp,
  });
});

// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/schema/default_full',
      [
        "require",
        "exports",
        "../schema",
        "./default_safe",
        "../type/js/undefined",
        "../type/js/regexp"
      ],
      factory
    );
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var schema_1 = require("../schema");
  var default_safe_1 = require("./default_safe");
  var undefined_1 = require("../type/js/undefined");
  var regexp_1 = require("../type/js/regexp");
  var schema = new schema_1.Schema({
    include: [default_safe_1.default],
    explicit: [undefined_1.default, regexp_1.default],
  });
  schema_1.Schema.DEFAULT = schema;

  exports.default = schema;
});

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return
  m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/loader',
      [
        "require",
        "exports",
        "./yamlAST",
        "./common",
        "./exception",
        "./mark",
        "./schema/default_safe",
        "./schema/default_full"
      ],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var ast = require("./yamlAST");

  'use strict';
  /*eslint-disable max-len,no-use-before-define*/
  var common = require("./common");
  var exception_1 = require("./exception");
  var mark_1 = require("./mark");
  var default_safe_1 = require("./schema/default_safe");
  var default_full_1 = require("./schema/default_full");
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CONTEXT_FLOW_IN = 1;
  var CONTEXT_FLOW_OUT = 2;
  var CONTEXT_BLOCK_IN = 3;
  var CONTEXT_BLOCK_OUT = 4;
  var CHOMPING_CLIP = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP = 3;
  var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;

  function is_EOL(c) {
    return c === 0x0a /* LF */ || c === 0x0d /* CR */;
  }

  function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */ || c === 0x20 /* Space */;
  }

  function is_WS_OR_EOL(c) {
    return (c === 0x09 /* Tab */ ||
        c === 0x20 /* Space */ ||
        c === 0x0a /* LF */ ||
        c === 0x0d /* CR */);
  }

  function is_FLOW_INDICATOR(c) {
    return (0x2c /* , */ === c ||
        0x5b /* [ */ === c ||
        0x5d /* ] */ === c ||
        0x7b /* { */ === c ||
        0x7d /* } */ === c);
  }

  function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */ <= c && c <= 0x39 /* 9 */) {
      return c - 0x30;
    }
    /*eslint-disable no-bitwise*/
    lc = c | 0x20;
    if (0x61 /* a */ <= lc && lc <= 0x66 /* f */) {
      return lc - 0x61 + 10;
    }
    return -1;
  }

  function escapedHexLen(c) {
    if (c === 0x78 /* x */) {
      return 2;
    }
    if (c === 0x75 /* u */) {
      return 4;
    }
    if (c === 0x55 /* U */) {
      return 8;
    }
    return 0;
  }

  function fromDecimalCode(c) {
    if (0x30 /* 0 */ <= c && c <= 0x39 /* 9 */) {
      return c - 0x30;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    return c === 0x30 /* 0 */
        ? '\x00'
        : c === 0x61 /* a */
            ? '\x07'
            : c === 0x62 /* b */
                ? '\x08'
                : c === 0x74 /* t */
                    ? '\x09'
                    : c === 0x09 /* Tab */
                        ? '\x09'
                        : c === 0x6e /* n */
                            ? '\x0A'
                            : c === 0x76 /* v */
                                ? '\x0B'
                                : c === 0x66 /* f */
                                    ? '\x0C'
                                    : c === 0x72 /* r */
                                        ? '\x0D'
                                        : c === 0x65 /* e */
                                            ? '\x1B'
                                            : c === 0x20 /* Space */
                                                ? ' '
                                                : c === 0x22 /* " */
                                                    ? '\x22'
                                                    : c === 0x2f /* / */
                                                        ? '/'
                                                        : c === 0x5c /* \ */
                                                            ? '\x5C'
                                                            : c === 0x4e /* N */
                                                                ? '\x85'
                                                                : c === 0x5f /* _ */
                                                                    ? '\xA0'
                                                                    : c === 0x4c /* L */
                                                                        ? '\u2028'
                                                                        : c === 0x50 /* P */
                                                                            ? '\u2029'
                                                                            : '';
  }
  function charFromCodepoint(c) {
    if (c <= 0xffff) {
      return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode(((c - 0x010000) >> 10) + 0xd800, ((c - 0x010000) & 0x03ff) + 0xdc00);
  }

  var simpleEscapeCheck = new Array(256); // integer, for fast access
  var simpleEscapeMap = new Array(256);
  var customEscapeCheck = new Array(256); // integer, for fast access
  var customEscapeMap = new Array(256);
  for (var i = 0; i < 256; i++) {
    customEscapeMap[i] = simpleEscapeMap[i] = simpleEscapeSequence(i);
    simpleEscapeCheck[i] = simpleEscapeMap[i] ? 1 : 0;
    customEscapeCheck[i] = 1;
    if (!simpleEscapeCheck[i]) {
      customEscapeMap[i] = '\\' + String.fromCharCode(i);
    }
  }

  var State = /** @class */ (function () {
    function State(input, options) {
      this.errorMap = {};
      this.errors = [];
      this.lines = [];
      this.input = input;
      this.filename = options['filename'] || null;
      this.schema = options['schema'] || default_full_1.default;
      this.onWarning = options['onWarning'] || null;
      this.legacy = options['legacy'] || false;
      this.allowAnyEscape = options['allowAnyEscape'] || false;
      this.ignoreDuplicateKeys = options['ignoreDuplicateKeys'] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    return State;
  }());

  function generateError(state, message, isWarning) {
    if (isWarning === void 0) {
      isWarning = false;
    }
    return new exception_1.default(
      message, new mark_1.default(
        state.filename, state.input, state.position, state.line, state.position - state.lineStart),
      isWarning);
  }

  function throwErrorFromPosition(state, position, message, isWarning, toLineEnd) {
    if (isWarning === void 0) {
      isWarning = false;
    }
    if (toLineEnd === void 0) {
      toLineEnd = false;
    }

    var line = positionToLine(state, position);
    if (!line) {
        return;
    }

    var hash = message + position;
    if (state.errorMap[hash]) {
      return;
    }

    var mark = new mark_1.default(state.filename, state.input, position, line.line, position - line.start);
    if (toLineEnd) {
      mark.toLineEnd = true;
    }
    var error = new exception_1.default(message, mark, isWarning);
    state.errors.push(error);
  }
  function throwError(state, message) {
    //FIXME
    var error = generateError(state, message);
    var hash = error.message + error.mark.position;
    if (state.errorMap[hash]) {
      return;
    }
    state.errors.push(error);
    state.errorMap[hash] = 1;
    var or = state.position;
    while (true) {
      if (state.position >= state.input.length - 1) {
        return;
      }
      var c = state.input.charAt(state.position);
      if (c == '\n') {
        state.position--;
        if (state.position == or) {
          state.position += 1;
        }
        return;
      }
      if (c == '\r') {
        state.position--;
        if (state.position == or) {
          state.position += 1;
        }
        return;
      }
      state.position++;
    }
    //throw generateError(state, message);
  }

  function throwWarning(state, message) {
    var error = generateError(state, message);
    if (state.onWarning) {
      state.onWarning.call(null, error);
    }
    else {
      //throw error;
    }
  }

  var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
      var match, major, minor;
      if (null !== state.version) {
        throwError(state, 'duplication of %YAML directive');
      }
      if (1 !== args.length) {
        throwError(state, 'YAML directive accepts exactly one argument');
      }

      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (null === match) {
        throwError(state, 'ill-formed argument of the YAML directive');
      }

      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);
      if (1 !== major) {
        throwError(state, 'found incompatible YAML document (version 1.2 is required)');
      }

      state.version = args[0];
      state.checkLineBreaks = minor < 2;
      if (2 !== minor) {
        throwError(state, 'found incompatible YAML document (version 1.2 is required)');
      }
    },

    TAG: function handleTagDirective(state, name, args) {
      var handle, prefix;
      if (2 !== args.length) {
        throwError(state, 'TAG directive accepts exactly two arguments');
      }

      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
      }
      if (_hasOwnProperty.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
      }
      state.tagMap[handle] = prefix;
    },
  };

  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    var scalar = state.result;
    if (scalar.startPosition == -1) {
      scalar.startPosition = start;
    }
    if (start <= end) {
      _result = state.input.slice(start, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(0x09 === _character ||
            (0x20 <= _character && _character <= 0x10ffff))) {
            throwError(state, 'expected valid JSON character');
          }
        }
      }
      else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, 'the stream contains non-printable characters');
      }
      scalar.value += _result;
      scalar.endPosition = end;
    }
  }

  function mergeMappings(state, destination, source) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
      throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }
    sourceKeys = Object.keys(source);
    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];
      if (!_hasOwnProperty.call(destination, key)) {
        destination[key] = source[key];
      }
    }
  }

  function storeMappingPair(state, _result, keyTag, keyNode, valueNode) {
    var index, quantity;
    if (keyNode == null) {
      return;
    }
    //keyNode = String(keyNode);
    if (null === _result) {
      _result = {
        startPosition: keyNode.startPosition,
        endPosition: valueNode.endPosition,
        parent: null,
        errors: [],
        mappings: [],
        kind: ast.Kind.MAP,
      };
    }
    // if ('tag:yaml.org,2002:merge' === keyTag) {
    //   if (Array.isArray(valueNode)) {
    //    for (index = 0, quantity = (<any>valueNode).length; index < quantity; index += 1) {
    //      mergeMappings(state, _result, valueNode[index]);
    //    }
    //   } else {
    //    mergeMappings(state, _result, valueNode);
    //   }
    // } else {
    var mapping = ast.newMapping(keyNode, valueNode);
    mapping.parent = _result;
    keyNode.parent = mapping;
    if (valueNode != null) {
        valueNode.parent = mapping;
    }
    !state.ignoreDuplicateKeys &&
      _result.mappings.forEach(function (sibling) {
        if (sibling.key &&
            sibling.key.value === (mapping.key && mapping.key.value)) {
          throwErrorFromPosition(state, mapping.key.startPosition, 'duplicate key');
          throwErrorFromPosition(state, sibling.key.startPosition, 'duplicate key');
        }
      });
    _result.mappings.push(mapping);
    _result.endPosition = valueNode
        ? valueNode.endPosition
        : keyNode.endPosition + 1; //FIXME.workaround should be position of ':' indeed
    // }
    return _result;
  }

  function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (0x0a /* LF */ === ch) {
      state.position++;
    }
    else if (0x0d /* CR */ === ch) {
      state.position++;
      if (0x0a /* LF */ === state.input.charCodeAt(state.position)) {
        state.position++;
      }
    }
    else {
      throwError(state, 'a line break is expected');
    }
    state.line += 1;
    state.lineStart = state.position;
    state.lines.push({
      start: state.lineStart,
      line: state.line,
    });
  }

  var Line = /** @class */ (function () {
      function Line() {
      }
      return Line;
  }());

  function positionToLine(state, position) {
    var line;
    for (var i = 0; i < state.lines.length; i++) {
      if (state.lines[i].start > position) {
        break;
      }
      line = state.lines[i];
    }
    if (!line) {
      return {
        start: 0,
        line: 0,
      };
    }
    return line;
  }

  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 0x09 /*Tab*/) {
          state.errors.push(generateError(state, 'Using tabs can lead to unpredictable results', true));
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && 0x23 /* # */ === ch) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0x0a /* LF */ && ch !== 0x0d /* CR */ && 0 !== ch);
      }
      if (is_EOL(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (0x20 /* Space */ === ch) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      }
      else {
        break;
      }
    }
    if (-1 !== checkIndent &&
        0 !== lineBreaks &&
        state.lineIndent < checkIndent) {
      throwWarning(state, 'deficient indentation');
    }
    return lineBreaks;
  }

  function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((0x2d /* - */ === ch || 0x2e /* . */ === ch) &&
        state.input.charCodeAt(_position + 1) === ch &&
        state.input.charCodeAt(_position + 2) === ch) {
      _position += 3;
      ch = state.input.charCodeAt(_position);
      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }
    return false;
  }

  function writeFoldedLines(state, scalar, count) {
    if (1 === count) {
      scalar.value += ' ';
    }
    else if (count > 1) {
      scalar.value += common.repeat('\n', count - 1);
    }
  }

  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    var state_result = ast.newScalar();
    state_result.plainScalar = true;
    state.result = state_result;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) ||
        is_FLOW_INDICATOR(ch) ||
        0x23 /* # */ === ch ||
        0x26 /* & */ === ch ||
        0x2a /* * */ === ch ||
        0x21 /* ! */ === ch ||
        0x7c /* | */ === ch ||
        0x3e /* > */ === ch ||
        0x27 /* ' */ === ch ||
        0x22 /* " */ === ch ||
        0x25 /* % */ === ch ||
        0x40 /* @ */ === ch ||
        0x60 /* ` */ === ch) {
      return false;
    }

    if (0x3f /* ? */ === ch || 0x2d /* - */ === ch) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) ||
        (withinFlowCollection && is_FLOW_INDICATOR(following))) {
        return false;
      }
    }

    state.kind = 'scalar';
    //state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (0 !== ch) {
      if (0x3a /* : */ === ch) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) ||
          (withinFlowCollection && is_FLOW_INDICATOR(following))) {
          break;
        }
      }
      else if (0x23 /* # */ === ch) {
        preceding = state.input.charCodeAt(state.position - 1);
        if (is_WS_OR_EOL(preceding)) {
          break;
        }
      }
      else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
          (withinFlowCollection && is_FLOW_INDICATOR(ch))) {
        break;
      }
      else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);
        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        }
        else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state_result, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }

      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }

      ch = state.input.charCodeAt(++state.position);
      if (state.position >= state.input.length) {
        return false;
      }
    }

    captureSegment(state, captureStart, captureEnd, false);
    if (state.result.startPosition != -1) {
      state_result.rawValue = state.input.substring(state_result.startPosition, state_result.endPosition);
      return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
  }
  
  function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (0x27 /* ' */ !== ch) {
      return false;
    }

    var scalar = ast.newScalar();
    scalar.singleQuoted = true;
    state.kind = 'scalar';
    state.result = scalar;
    scalar.startPosition = state.position;
    state.position++;
    captureStart = captureEnd = state.position;
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
      //console.log('ch: <' + String.fromCharCode(ch) + '>');
      if (0x27 /* ' */ === ch) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        //console.log('next: <' + String.fromCharCode(ch) + '>');
        scalar.endPosition = state.position;
        if (0x27 /* ' */ === ch) {
          captureStart = captureEnd = state.position;
          state.position++;
        }
        else {
          return true;
        }
      }
      else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, scalar, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      }
      else if (state.position === state.lineStart &&
        testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a single quoted scalar');
      }
      else {
        state.position++;
        captureEnd = state.position;
        scalar.endPosition = state.position;
      }
    }
    throwError(state, 'unexpected end of the stream within a single quoted scalar');
  }

  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, tmpEsc, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x22 /* " */ !== ch) {
      return false;
    }

    state.kind = 'scalar';
    var scalar = ast.newScalar();
    scalar.doubleQuoted = true;
    state.result = scalar;
    scalar.startPosition = state.position;
    state.position++;
    captureStart = captureEnd = state.position;
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
      if (0x22 /* " */ === ch) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        scalar.endPosition = state.position;
        scalar.rawValue = state.input.substring(scalar.startPosition, scalar.endPosition);
        return true;
      }

      if (0x5c /* \ */ === ch) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);
          // TODO: rework to inline fn with no type cast?
        }
        else if (ch < 256 &&
          (state.allowAnyEscape ? customEscapeCheck[ch] : simpleEscapeCheck[ch])) {
          scalar.value += state.allowAnyEscape
              ? customEscapeMap[ch]
              : simpleEscapeMap[ch];
          state.position++;
        }
        else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            }
            else {
              throwError(state, 'expected hexadecimal character');
            }
          }
          scalar.value += charFromCodepoint(hexResult);
          state.position++;
        }
        else {
          throwError(state, 'unknown escape sequence');
        }
        captureStart = captureEnd = state.position;
      }
      else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, scalar, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      }
      else if (state.position === state.lineStart &&
        testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a double quoted scalar');
      }
      else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, 'unexpected end of the stream within a double quoted scalar');
  }

  function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5b /* [ */) {
      terminator = 0x5d; /* ] */
      isMapping = false;
      _result = ast.newItems();
      _result.startPosition = state.position;
    }
    else if (ch === 0x7b /* { */) {
      terminator = 0x7d; /* } */
      isMapping = true;
      _result = ast.newMap();
      _result.startPosition = state.position;
    }
    else {
      return false;
    }

    if (null !== state.anchor) {
      _result.anchorId = state.anchor;
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(++state.position);

    while (0 !== ch) {
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? 'mapping' : 'sequence';
        state.result = _result;
        _result.endPosition = state.position;
        return true;
      }

      if (!readNext) {
        var p = state.position;
        throwError(state, 'missed comma between flow collection entries');
        state.position = p + 1;
      }

      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (0x3f /* ? */ === ch) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
        }
      }

      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && 0x3a /* : */ === ch) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }

      if (isMapping) {
        storeMappingPair(state, _result, keyTag, keyNode, valueNode);
      }
      else if (isPair) {
        var mp = storeMappingPair(state, null, keyTag, keyNode, valueNode);
        mp.parent = _result;
        _result.items.push(mp);
      }
      else {
        if (keyNode) {
          keyNode.parent = _result;
        }
        _result.items.push(keyNode);
      }

      _result.endPosition = state.position + 1 /*need to add one more char*/;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (0x2c /* , */ === ch) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      }
      else {
        readNext = false;
      }
    }
    throwError(state, 'unexpected end of the stream within a flow collection');
  }

  function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7c /* | */) {
      folding = false;
    }
    else if (ch === 0x3e /* > */) {
      folding = true;
    }
    else {
      return false;
    }

    var sc = ast.newScalar();
    state.kind = 'scalar';
    state.result = sc;
    sc.startPosition = state.position;
    while (0 !== ch) {
      ch = state.input.charCodeAt(++state.position);
      if (0x2b /* + */ === ch || 0x2d /* - */ === ch) {
        if (CHOMPING_CLIP === chomping) {
          chomping = 0x2b /* + */ === ch ? CHOMPING_KEEP : CHOMPING_STRIP;
        }
        else {
          throwError(state, 'repeat of a chomping mode identifier');
        }
      }
      else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
        }
        else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        }
        else {
          throwError(state, 'repeat of an indentation width identifier');
        }
      }
      else {
        break;
      }
    }

    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (is_WHITE_SPACE(ch));
      if (0x23 /* # */ === ch) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!is_EOL(ch) && 0 !== ch);
      }
    }

    while (0 !== ch) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);

      while ((!detectedIndent || state.lineIndent < textIndent) &&
        0x20 /* Space */ === ch) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }

      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }

      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }

      // End of the scalar.
      if (state.lineIndent < textIndent) {
        // Perform the chomping.
        if (chomping === CHOMPING_KEEP) {
          sc.value += common.repeat('\n', emptyLines);
        }
        else if (chomping === CHOMPING_CLIP) {
          if (detectedIndent) {
            // i.e. only if the scalar is not empty.
            sc.value += '\n';
          }
        }
        // Break this `while` cycle and go to the funciton's epilogue.
        break;
      }

      // Folded style: use fancy rules to handle line breaks.
      if (folding) {
        // Lines starting with white space characters (more-indented lines) are not folded.
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          sc.value += common.repeat('\n', emptyLines + 1);
          // End of more-indented block.
        }
        else if (atMoreIndented) {
          atMoreIndented = false;
          sc.value += common.repeat('\n', emptyLines + 1);
          // Just one line break - perceive as the same line.
        }
        else if (0 === emptyLines) {
          if (detectedIndent) {
            // i.e. only if we have already read some scalar content.
            sc.value += ' ';
          }
          // Several line breaks - perceive as different lines.
        }
        else {
          sc.value += common.repeat('\n', emptyLines);
        }
        // Literal style: just add exact number of line breaks between content lines.
      }
      else if (detectedIndent) {
        // If current line isn't the first one - count line break from the last content line.
        sc.value += common.repeat('\n', emptyLines + 1);
      }
      else {
          // In case of the first content line - count only empty lines.
      }
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;
      while (!is_EOL(ch) && 0 !== ch) {
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, state.position, false);
    }

    sc.endPosition = state.position;
    var i = state.position - 1;
    var needMinus = false;
    while (true) {
      var c = state.input[i];
      if (c == '\r' || c == '\n') {
        if (needMinus) {
          i--;
        }
        break;
      }
      if (c != ' ' && c != '\t') {
        break;
      }
      i--;
      //needMinus=true;
    }
    sc.endPosition = i;
    sc.rawValue = state.input.substring(sc.startPosition, sc.endPosition);
    return true;
  }

  function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = ast.newItems(), following, detected = false, ch;
    if (null !== state.anchor) {
      _result.anchorId = state.anchor;
      state.anchorMap[state.anchor] = _result;
    }

    _result.startPosition = state.position;
    ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
      if (0x2d /* - */ !== ch) {
        break;
      }

      following = state.input.charCodeAt(state.position + 1);
      if (!is_WS_OR_EOL(following)) {
        break;
      }

      detected = true;
      state.position++;
      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.items.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }

      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      if (state.result) {
        state.result.parent = _result;
        _result.items.push(state.result);
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if ((state.line === _line || state.lineIndent > nodeIndent) && 0 !== ch) {
        throwError(state, 'bad indentation of a sequence entry');
      }
      else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    _result.endPosition = state.position;
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'sequence';
      state.result = _result;
      _result.endPosition = state.position;
      return true;
    }

    return false;
  }

  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _tag = state.tag, _anchor = state.anchor, _result = ast.newMap(), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    _result.startPosition = state.position;
    if (null !== state.anchor) {
      _result.anchorId = state.anchor;
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line; // Save the current line.

      // Explicit notation case. There are two separate blocks:
      // first for the key (denoted by "?") and second for the value (denoted by ":")
      if ((0x3f /* ? */ === ch || 0x3a /* : */ === ch) && is_WS_OR_EOL(following)) {

        if (0x3f /* ? */ === ch) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        }
        else if (atExplicitKey) {
          // i.e. 0x3A/* : */ === character after the explicit key.
          atExplicitKey = false;
          allowCompact = true;
        }
        else {
          throwError(state, 'incomplete explicit mapping pair; a key node is missed');
        }
        state.position += 1;
        ch = following;

        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
      }
      else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);

          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }

          if (0x3a /* : */ === ch) {
            ch = state.input.charCodeAt(++state.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
            }

            if (atExplicitKey) {
              storeMappingPair(state, _result, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;
          }
          else if (state.position == state.lineStart &&
            testDocumentSeparator(state)) {
            break; // Reading is done. Go to the epilogue.
          }
          else if (detected) {
            throwError(state, 'can not read an implicit mapping pair; a colon is missed');
          }
          else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }
        }
        else if (detected) {
          throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
          while (state.position > 0) {
            ch = state.input.charCodeAt(--state.position);
            if (is_EOL(ch)) {
              state.position++;
              break;
            }
          }
        }
        else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }
      }
      else {
        break; // Reading is done. Go to the epilogue.
      }

      // Common reading code for both explicit and implicit notations.
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          }
          else {
            valueNode = state.result;
          }
        }

        if (!atExplicitKey) {
          storeMappingPair(state, _result, keyTag, keyNode, valueNode);
          keyTag = keyNode = valueNode = null;
        }

        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }
      if (state.lineIndent > nodeIndent && 0 !== ch) {
        throwError(state, 'bad indentation of a mapping entry');
      }
      else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    // Epilogue.
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
      storeMappingPair(state, _result, keyTag, keyNode, null);
    }
    // Expose the resulting mapping.
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'mapping';
      state.result = _result;
    }
    return detected;
  }

  function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x21 /* ! */ !== ch) {
      return false;
    }

    if (null !== state.tag) {
      throwError(state, 'duplication of a tag property');
    }

    ch = state.input.charCodeAt(++state.position);
    if (0x3c /* < */ === ch) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    }
    else if (0x21 /* ! */ === ch) {
      isNamed = true;
      tagHandle = '!!';
      ch = state.input.charCodeAt(++state.position);
    }
    else {
      tagHandle = '!';
    }

    _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (0 !== ch && 0x3e /* > */ !== ch);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      }
      else {
        throwError(state, 'unexpected end of the stream within a verbatim tag');
      }
    }
    else {
      while (0 !== ch && !is_WS_OR_EOL(ch)) {
        if (0x21 /* ! */ === ch) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, 'named tag handle cannot contain such characters');
            }
            isNamed = true;
            _position = state.position + 1;
          }
          else {
            throwError(state, 'tag suffix cannot contain exclamation marks');
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, 'tag suffix cannot contain flow indicator characters');
      }
    }

    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }

    if (isVerbatim) {
      state.tag = tagName;
    }
    else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    }
    else if ('!' === tagHandle) {
      state.tag = '!' + tagName;
    }
    else if ('!!' === tagHandle) {
      state.tag = 'tag:yaml.org,2002:' + tagName;
    }
    else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }

    return true;
  }

  function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x26 /* & */ !== ch) {
      return false;
    }

    if (null !== state.anchor) {
      throwError(state, 'duplication of an anchor property');
    }

    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (0 !== ch && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position === _position) {
      throwError(state, 'name of an anchor node must contain at least one character');
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }

  function readAlias(state) {
    var _position, alias, len = state.length, input = state.input, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x2a /* * */ !== ch) {
      return false;
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (0 !== ch && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position <= _position) {
      throwError(state, 'name of an alias node must contain at least one character');
      state.position = _position + 1;
    }

    alias = state.input.slice(_position, state.position);
    if (!state.anchorMap.hasOwnProperty(alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
      if (state.position <= _position) {
        state.position = _position + 1;
      }
    }
    state.result = ast.newAnchorRef(alias, _position, state.position, state.anchorMap[alias]);
    skipSeparationSpace(state, true, -1);

    return true;
  }

  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
    atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent, _result;
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        }
        else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        }
        else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }

    var tagStart = state.position;
    var tagColumn = state.position - state.lineStart;
    if (1 === indentStatus) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          }
          else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          }
          else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
        else {
          allowBlockCollections = false;
        }
      }
    }

    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }

    if (1 === indentStatus || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      }
      else {
        flowIndent = parentIndent + 1;
      }

      blockIndent = state.position - state.lineStart;
      if (1 === indentStatus) {
        if ((allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent))) || readFlowCollection(state, flowIndent)) {
          hasContent = true;
        }
        else {
          if ((allowBlockScalars && readBlockScalar(state, flowIndent)) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;
          }
          else if (readAlias(state)) {
            hasContent = true;
            if (null !== state.tag || null !== state.anchor) {
              throwError(state, 'alias node should not have any properties');
            }
          }
          else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (null === state.tag) {
              state.tag = '?';
            }
          }
          if (null !== state.anchor) {
            state.anchorMap[state.anchor] = state.result;
            state.result.anchorId = state.anchor;
          }
        }
      }
      else if (0 === indentStatus) {
        // Special case: block sequences are allowed to have same indentation level as the parent.
        // http://www.yaml.org/spec/1.2/spec.html#id2799784
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (null !== state.tag && '!' !== state.tag) {
      if (state.tag == '!include') {
        if (!state.result) {
          state.result = ast.newScalar();
          state.result.startPosition = state.position;
          state.result.endPosition = state.position;
          throwError(state, '!include without value');
        }
        state.result.kind = ast.Kind.INCLUDE_REF;
      }
      else if ('?' === state.tag) {
        for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
          type = state.implicitTypes[typeIndex];
          // Implicit resolving is not allowed for non-scalar types, and '?'
          // non-specific tag is only assigned to plain scalars. So, it isn't
          // needed to check for 'kind' conformity.
          var vl = state.result['value'];
          if (type.resolve(vl)) {
            // `state.result` updated in resolver if matched
            state.result.valueObject = type.construct(state.result['value']);
            state.tag = type.tag;
            if (null !== state.anchor) {
              state.result.anchorId = state.anchor;
              state.anchorMap[state.anchor] = state.result;
            }
            break;
          }
        }
      }
      else if (_hasOwnProperty.call(state.typeMap, state.tag)) {
        type = state.typeMap[state.tag];
        if (null !== state.result && type.kind !== state.kind && (!type.additionalKinds || (type.additionalKinds && type.additionalKinds.indexOf(state.kind) === -1))) {
            throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
        }
        if (!type.resolve(state.result)) {
          // `state.result` updated in resolver if matched
          throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
        }
        else {
          state.result = type.construct(state.result);
          if (null !== state.anchor) {
            state.result.anchorId = state.anchor;
            state.anchorMap[state.anchor] = state.result;
          }
        }
      }
      else {
        throwErrorFromPosition(state, tagStart, 'unknown tag <' + state.tag + '>', false, true);
      }
    }

    return null !== state.tag || null !== state.anchor || hasContent;
  }

  function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || 0x25 /* % */ !== ch) {
        break;
      }

      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (0 !== ch && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];
      if (directiveName.length < 1) {
        throwError(state, 'directive name must not be less than one character in length');
      }

      while (0 !== ch) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (0x23 /* # */ === ch) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (0 !== ch && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch)) {
          break;
        }
        _position = state.position;
        while (0 !== ch && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }

      if (0 !== ch) {
        readLineBreak(state);
      }

      if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      }
      else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
        state.position++;
      }
    }

    skipSeparationSpace(state, true, -1);

    if (0 === state.lineIndent &&
        0x2d /* - */ === state.input.charCodeAt(state.position) &&
        0x2d /* - */ === state.input.charCodeAt(state.position + 1) &&
        0x2d /* - */ === state.input.charCodeAt(state.position + 2)) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    else if (hasDirectives) {
      throwError(state, 'directives end mark is expected');
    }

    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (0x2e /* . */ === state.input.charCodeAt(state.position)) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }

    if (state.position < state.length - 1) {
      throwError(state, 'end of the stream or a document separator is expected');
    }
    else {
      return;
    }
  }

  function loadDocuments(input, options) {
    var e_1, _a;
    input = String(input);
    options = options || {};
    var inputLength = input.length;
    if (inputLength !== 0) {
      // Add tailing `\n` if not exists
      if (0x0a /* LF */ !== input.charCodeAt(inputLength - 1) && 0x0d /* CR */ !== input.charCodeAt(inputLength - 1)) {
        input += '\n';
      }
      // Strip BOM
      if (input.charCodeAt(0) === 0xfeff) {
        input = input.slice(1);
      }
    }

    var state = new State(input, options);
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';
    while (0x20 /* Space */ === state.input.charCodeAt(state.position)) {
      state.lineIndent += 1;
      state.position += 1;
    }

    while (state.position < state.length - 1) {
      var q = state.position;
      readDocument(state);
      if (state.position <= q) {
        for (; state.position < state.length - 1; state.position++) {
          var c = state.input.charAt(state.position);
          if (c == '\n') {
            break;
          }
        }
        //skip to the new lne
      }
    }

    var documents = state.documents;
    var docsCount = documents.length;
    if (docsCount > 0) {
      //last document takes the file till the end
      documents[docsCount - 1].endPosition = inputLength;
    }
    try {
      for (var documents_1 = __values(documents), documents_1_1 = documents_1.next(); !documents_1_1.done; documents_1_1 = documents_1.next()) {
        var x = documents_1_1.value;
        x.errors = state.errors;
        if (x.startPosition > x.endPosition) {
          x.startPosition = x.endPosition;
        }
      }
    }
    catch (e_1_1) {
      e_1 = { error: e_1_1 };
    }
    finally {
      try {
        if (documents_1_1 && !documents_1_1.done && (_a = documents_1.return))
          _a.call(documents_1);
      }
      finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return documents;
  }

  function loadAll(input, iterator, options) {
    if (options === void 0) {
      options = {};
    }
    var documents = loadDocuments(input, options), index, length;
    for (index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
    }
  }
  
  exports.loadAll = loadAll;

  function load(input, options) {
    if (options === void 0) {
      options = {};
    }
    var documents = loadDocuments(input, options), index, length;
    if (0 === documents.length) {
      /*eslint-disable no-undefined*/
      return undefined;
    }
    else if (1 === documents.length) {
      return documents[0];
    }

    var e = new exception_1.default('expected a single document in the stream, but found more');
    e.mark = new mark_1.default('', '', 0, 0, 0);
    e.mark.position = documents[0].endPosition;
    documents[0].errors.push(e);
    //it is an artifact which is caused by the fact that we are checking next char before stopping parse
    return documents[0];
  }

  exports.load = load;

  function safeLoadAll(input, output, options) {
    if (options === void 0) {
      options = {};
    }
    loadAll(input, output, common.extend({ schema: default_safe_1.default }, options));
  }

  exports.safeLoadAll = safeLoadAll;

  function safeLoad(input, options) {
    if (options === void 0) {
      options = {};
    }
    return load(input, common.extend({ schema: default_safe_1.default }, options));
  }

  exports.safeLoad = safeLoad;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/dumper',
      ["require", "exports"],
      factory
    );
  }
})(function (require, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", { value: true });

  /*eslint-disable no-use-before-define*/
  var common = require('./common');
  var YAMLException = require('./exception');
  var DEFAULT_FULL_SCHEMA = require('./schema/default_full');
  var DEFAULT_SAFE_SCHEMA = require('./schema/default_safe');
  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_TAB = 0x09; /* Tab */
  var CHAR_LINE_FEED = 0x0a; /* LF */
  var CHAR_CARRIAGE_RETURN = 0x0d; /* CR */
  var CHAR_SPACE = 0x20; /* Space */
  var CHAR_EXCLAMATION = 0x21; /* ! */
  var CHAR_DOUBLE_QUOTE = 0x22; /* " */
  var CHAR_SHARP = 0x23; /* # */
  var CHAR_PERCENT = 0x25; /* % */
  var CHAR_AMPERSAND = 0x26; /* & */
  var CHAR_SINGLE_QUOTE = 0x27; /* ' */
  var CHAR_ASTERISK = 0x2a; /* * */
  var CHAR_COMMA = 0x2c; /* , */
  var CHAR_MINUS = 0x2d; /* - */
  var CHAR_COLON = 0x3a; /* : */
  var CHAR_GREATER_THAN = 0x3e; /* > */
  var CHAR_QUESTION = 0x3f; /* ? */
  var CHAR_COMMERCIAL_AT = 0x40; /* @ */
  var CHAR_LEFT_SQUARE_BRACKET = 0x5b; /* [ */
  var CHAR_RIGHT_SQUARE_BRACKET = 0x5d; /* ] */
  var CHAR_GRAVE_ACCENT = 0x60; /* ` */
  var CHAR_LEFT_CURLY_BRACKET = 0x7b; /* { */
  var CHAR_VERTICAL_LINE = 0x7c; /* | */
  var CHAR_RIGHT_CURLY_BRACKET = 0x7d; /* } */
  var ESCAPE_SEQUENCES = {};

  ESCAPE_SEQUENCES[0x00] = '\\0';
  ESCAPE_SEQUENCES[0x07] = '\\a';
  ESCAPE_SEQUENCES[0x08] = '\\b';
  ESCAPE_SEQUENCES[0x09] = '\\t';
  ESCAPE_SEQUENCES[0x0a] = '\\n';
  ESCAPE_SEQUENCES[0x0b] = '\\v';
  ESCAPE_SEQUENCES[0x0c] = '\\f';
  ESCAPE_SEQUENCES[0x0d] = '\\r';
  ESCAPE_SEQUENCES[0x1b] = '\\e';
  ESCAPE_SEQUENCES[0x22] = '\\"';
  ESCAPE_SEQUENCES[0x5c] = '\\\\';
  ESCAPE_SEQUENCES[0x85] = '\\N';
  ESCAPE_SEQUENCES[0xa0] = '\\_';
  ESCAPE_SEQUENCES[0x2028] = '\\L';
  ESCAPE_SEQUENCES[0x2029] = '\\P';

  var DEPRECATED_BOOLEANS_SYNTAX = [ 'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON', 'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF', ];
  function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (null === map) {
      return {};
    }
    result = {};
    keys = Object.keys(map);
    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map[tag]);
      if ('!!' === tag.slice(0, 2)) {
        tag = 'tag:yaml.org,2002:' + tag.slice(2);
      }

      type = schema.compiledTypeMap[tag];
      if (type && _hasOwnProperty.call(type.styleAliases, style)) {
        style = type.styleAliases[style];
      }
      result[tag] = style;
    }

    return result;
  }

  function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xff) {
      handle = 'x';
      length = 2;
    }
    else if (character <= 0xffff) {
      handle = 'u';
      length = 4;
    }
    else if (character <= 0xffffffff) {
      handle = 'U';
      length = 8;
    }
    else {
      throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
    }
    return '\\' + handle + common.repeat('0', length - string.length) + string;
  }

  function State(options) {
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.indent = Math.max(1, options['indent'] || 2);
    this.skipInvalid = options['skipInvalid'] || false;
    this.flowLevel = common.isNothing(options['flowLevel']) ? -1 : options['flowLevel'];
    this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = '';
    this.duplicates = [];
    this.usedDuplicates = null;
  }

  function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces), position = 0, next = -1, result = '', line, length = string.length;
    while (position < length) {
      next = string.indexOf('\n', position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      }
      else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }

      if (line.length && line !== '\n') {
        result += ind;
      }
      result += line;
    }
    return result;
  }

  function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
  }

  function testImplicitResolving(state, str) {
    var index, length, type;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type = state.implicitTypes[index];
      if (type.resolve(str)) {
        return true;
      }
    }
    return false;
  }

  function StringBuilder(source) {
    this.source = source;
    this.result = '';
    this.checkpoint = 0;
  }

  StringBuilder.prototype.takeUpTo = function (position) {
    var er;
    if (position < this.checkpoint) {
      er = new Error('position should be > checkpoint');
      er.position = position;
      er.checkpoint = this.checkpoint;
      throw er;
    }
    this.result += this.source.slice(this.checkpoint, position);
    this.checkpoint = position;
    return this;
  };

  StringBuilder.prototype.escapeChar = function () {
    var character, esc;
    character = this.source.charCodeAt(this.checkpoint);
    esc = ESCAPE_SEQUENCES[character] || encodeHex(character);
    this.result += esc;
    this.checkpoint += 1;
    return this;
  };

  StringBuilder.prototype.finish = function () {
    if (this.source.length > this.checkpoint) {
        this.takeUpTo(this.source.length);
    }
  };

  function writeScalar(state, object, level) {
    var simple, first, spaceWrap, folded, literal, single, double, sawLineFeed, linePosition, longestLine, indent, max, character, position, escapeSeq, hexEsc, previous, lineLength, modifier, trailingLineBreaks, result;
    if (0 === object.length) {
      state.dump = "''";
      return;
    }

    if (object.indexOf('!include') == 0) {
      state.dump = '' + object; //FIXME
      return;
    }

    if (object.indexOf('!$$$novalue') == 0) {
      state.dump = ''; //FIXME
      return;
    }

    if (-1 !== DEPRECATED_BOOLEANS_SYNTAX.indexOf(object)) {
      state.dump = "'" + object + "'";
      return;
    }

    simple = true;
    first = object.length ? object.charCodeAt(0) : 0;
    spaceWrap = CHAR_SPACE === first || CHAR_SPACE === object.charCodeAt(object.length - 1);
    // Simplified check for restricted first characters
    // http://www.yaml.org/spec/1.2/spec.html#ns-plain-first%28c%29
    if (CHAR_MINUS === first || CHAR_QUESTION === first || CHAR_COMMERCIAL_AT === first || CHAR_GRAVE_ACCENT === first) {
      simple = false;
    }

    // can only use > and | if not wrapped in spaces.
    if (spaceWrap) {
      simple = false;
      folded = false;
      literal = false;
    }
    else {
      folded = true;
      literal = true;
    }

    single = true;
    double = new StringBuilder(object);
    sawLineFeed = false;
    linePosition = 0;
    longestLine = 0;
    indent = state.indent * level;
    max = 80;
    if (indent < 40) {
      max -= indent;
    }
    else {
      max = 40;
    }

    for (position = 0; position < object.length; position++) {
      character = object.charCodeAt(position);
      if (simple) {
        // Characters that can never appear in the simple scalar
        if (!simpleChar(character)) {
          simple = false;
        }
        else {
          // Still simple.  If we make it all the way through like
          // this, then we can just dump the string as-is.
          continue;
        }
      }

      if (single && character === CHAR_SINGLE_QUOTE) {
        single = false;
      }
      escapeSeq = ESCAPE_SEQUENCES[character];
      hexEsc = needsHexEscape(character);
      if (!escapeSeq && !hexEsc) {
        continue;
      }

      if (character !== CHAR_LINE_FEED && character !== CHAR_DOUBLE_QUOTE && character !== CHAR_SINGLE_QUOTE) {
        folded = false;
        literal = false;
      }
      else if (character === CHAR_LINE_FEED) {
        sawLineFeed = true;
        single = false;
        if (position > 0) {
          previous = object.charCodeAt(position - 1);
          if (previous === CHAR_SPACE) {
            literal = false;
            folded = false;
          }
        }
        if (folded) {
          lineLength = position - linePosition;
          linePosition = position;
          if (lineLength > longestLine) {
            longestLine = lineLength;
          }
        }
      }
      if (character !== CHAR_DOUBLE_QUOTE) {
        single = false;
      }
      double.takeUpTo(position);
      double.escapeChar();
    }

    if (simple && testImplicitResolving(state, object)) {
        simple = false;
    }

    modifier = '';
    if (folded || literal) {
      trailingLineBreaks = 0;
      if (object.charCodeAt(object.length - 1) === CHAR_LINE_FEED) {
        trailingLineBreaks += 1;
        if (object.charCodeAt(object.length - 2) === CHAR_LINE_FEED) {
          trailingLineBreaks += 1;
        }
      }
      if (trailingLineBreaks === 0) {
        modifier = '-';
      }
      else if (trailingLineBreaks === 2) {
        modifier = '+';
      }
    }

    if (literal && longestLine < max) {
      folded = false;
    }

    // If it's literally one line, then don't bother with the literal.
    // We may still want to do a fold, though, if it's a super long line.
    if (!sawLineFeed) {
      literal = false;
    }
    if (simple) {
      state.dump = object;
    }
    else if (single) {
      state.dump = "'" + object + "'";
    }
    else if (folded) {
      result = fold(object, max);
      state.dump = '>' + modifier + '\n' + indentString(result, indent);
    }
    else if (literal) {
      if (!modifier) {
        object = object.replace(/\n$/, '');
      }
      state.dump = '|' + modifier + '\n' + indentString(object, indent);
    }
    else if (double) {
      double.finish();
      state.dump = '"' + double.result + '"';
    }
    else {
      throw new Error('Failed to dump scalar value');
    }
    return;
  }

  // The `trailing` var is a regexp match of any trailing `\n` characters.
  //
  // There are three cases we care about:
  //
  // 1. One trailing `\n` on the string.  Just use `|` or `>`.
  //    This is the assumed default. (trailing = null)
  // 2. No trailing `\n` on the string.  Use `|-` or `>-` to "chomp" the end.
  // 3. More than one trailing `\n` on the string.  Use `|+` or `>+`.
  //
  // In the case of `>+`, these line breaks are *not* doubled (like the line
  // breaks within the string), so it's important to only end with the exact
  // same number as we started.
  function fold(object, max) {
    var result = '', position = 0, length = object.length, trailing = /\n+$/.exec(object), newLine;
    if (trailing) {
      length = trailing.index + 1;
    }

    while (position < length) {
      newLine = object.indexOf('\n', position);
      if (newLine > length || newLine === -1) {
        if (result) {
          result += '\n\n';
        }
        result += foldLine(object.slice(position, length), max);
        position = length;
      }
      else {
        if (result) {
          result += '\n\n';
        }
        result += foldLine(object.slice(position, newLine), max);
        position = newLine + 1;
      }
    }

    if (trailing && trailing[0] !== '\n') {
      result += trailing[0];
    }

    return result;
  }

  function foldLine(line, max) {
    if (line === '') {
      return line;
    }
    var foldRe = /[^\s] [^\s]/g, result = '', prevMatch = 0, foldStart = 0, match = foldRe.exec(line), index, foldEnd, folded;
    while (match) {
      index = match.index;
      // when we cross the max len, if the previous match would've
      // been ok, use that one, and carry on.  If there was no previous
      // match on this fold section, then just have a long line.
      if (index - foldStart > max) {
        if (prevMatch !== foldStart) {
          foldEnd = prevMatch;
        }
        else {
          foldEnd = index;
        }

        if (result) {
          result += '\n';
        }

        folded = line.slice(foldStart, foldEnd);
        result += folded;
        foldStart = foldEnd + 1;
      }
      prevMatch = index + 1;
      match = foldRe.exec(line);
    }

    if (result) {
      result += '\n';
    }

    // if we end up with one last word at the end, then the last bit might
    // be slightly bigger than we wanted, because we exited out of the loop.
    if (foldStart !== prevMatch && line.length - foldStart > max) {
      result += line.slice(foldStart, prevMatch) + '\n' + line.slice(prevMatch + 1);
    }
    else {
      result += line.slice(foldStart);
    }
    return result;
  }

  // Returns true if character can be found in a simple scalar
  function simpleChar(character) {
    return (CHAR_TAB !== character &&
        CHAR_LINE_FEED !== character &&
        CHAR_CARRIAGE_RETURN !== character &&
        CHAR_COMMA !== character &&
        CHAR_LEFT_SQUARE_BRACKET !== character &&
        CHAR_RIGHT_SQUARE_BRACKET !== character &&
        CHAR_LEFT_CURLY_BRACKET !== character &&
        CHAR_RIGHT_CURLY_BRACKET !== character &&
        CHAR_SHARP !== character &&
        CHAR_AMPERSAND !== character &&
        CHAR_ASTERISK !== character &&
        CHAR_EXCLAMATION !== character &&
        CHAR_VERTICAL_LINE !== character &&
        CHAR_GREATER_THAN !== character &&
        CHAR_SINGLE_QUOTE !== character &&
        CHAR_DOUBLE_QUOTE !== character &&
        CHAR_PERCENT !== character &&
        CHAR_COLON !== character &&
        !ESCAPE_SEQUENCES[character] &&
        !needsHexEscape(character));
  }

  // Returns true if the character code needs to be escaped.
  function needsHexEscape(character) {
    return !((0x00020 <= character && character <= 0x00007e) ||
        0x00085 === character ||
        (0x000a0 <= character && character <= 0x00d7ff) ||
        (0x0e000 <= character && character <= 0x00fffd) ||
        (0x10000 <= character && character <= 0x10ffff));
  }

  function writeFlowSequence(state, level, object) {
    var _result = '', _tag = state.tag, index, length;
    for (index = 0, length = object.length; index < length; index += 1) {
      // Write only valid elements.
      if (writeNode(state, level, object[index], false, false)) {
        if (0 !== index) {
          _result += ', ';
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = '[' + _result + ']';
  }

  function writeBlockSequence(state, level, object, compact) {
    var _result = '', _tag = state.tag, index, length;
    for (index = 0, length = object.length; index < length; index += 1) {
      // Write only valid elements.
      if (writeNode(state, level + 1, object[index], true, true)) {
        if (!compact || 0 !== index) {
          _result += generateNextLine(state, level);
        }
        _result += '- ' + state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
  }

  function writeFlowMapping(state, level, object) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';
      if (0 !== index) {
        pairBuffer += ', ';
      }

      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (!writeNode(state, level, objectKey, false, false)) {
        continue; // Skip this pair because of invalid key;
      }

      if (state.dump.length > 1024) {
        pairBuffer += '? ';
      }

      pairBuffer += state.dump + ': ';
      if (!writeNode(state, level, objectValue, false, false)) {
        continue; // Skip this pair because of invalid value.
      }

      pairBuffer += state.dump;
      // Both key and value are valid.
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = '{' + _result + '}';
  }

  function writeBlockMapping(state, level, object, compact) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';
      if (!compact || 0 !== index) {
        pairBuffer += generateNextLine(state, level);
      }
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (!writeNode(state, level + 1, objectKey, true, true)) {
        continue; // Skip this pair because of invalid key.
      }

      explicitPair = (null !== state.tag && '?' !== state.tag) || (state.dump && state.dump.length > 1024);
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += '?';
        }
        else {
          pairBuffer += '? ';
        }
      }

      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }

      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue; // Skip this pair because of invalid value.
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ':';
      }
      else {
        pairBuffer += ': ';
      }

      pairBuffer += state.dump;
      // Both key and value are valid.
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
  }

  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
      type = typeList[index];
      if ((type.instanceOf || type.predicate) && (!type.instanceOf ||
            ('object' === typeof object && object instanceof type.instanceOf)) &&
          (!type.predicate || type.predicate(object))) {
        state.tag = explicit ? type.tag : '?';
        if (type.represent) {
          style = state.styleMap[type.tag] || type.defaultStyle;
          if ('[object Function]' === _toString.call(type.represent)) {
            _result = type.represent(object, style);
          }
          else if (_hasOwnProperty.call(type.represent, style)) {
            _result = type.represent[style](object, style);
          }
          else {
            throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }

  // Serializes `object` and writes it to global `result`.
  // Returns true on success, or false on invalid object.
  //
  function writeNode(state, level, object, block, compact) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    if (block) {
      block = 0 > state.flowLevel || state.flowLevel > level;
    }

    if ((null !== state.tag && '?' !== state.tag) || (2 !== state.indent && level > 0)) {
      compact = false;
    }

    var objectOrArray = '[object Object]' === type || '[object Array]' === type, duplicateIndex, duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }

    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = '*ref_' + duplicateIndex;
    }
    else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if ('[object Object]' === type) {
        if (block && 0 !== Object.keys(state.dump).length) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + (0 === level ? '\n' : '') + state.dump;
          }
        }
        else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      }
      else if ('[object Array]' === type) {
        if (block && 0 !== state.dump.length) {
          writeBlockSequence(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + (0 === level ? '\n' : '') + state.dump;
          }
        }
        else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      }
      else if ('[object String]' === type) {
        if ('?' !== state.tag) {
          writeScalar(state, state.dump, level);
        }
      }
      else {
        if (state.skipInvalid) {
            return false;
        }
        throw new YAMLException('unacceptable kind of an object to dump ' + type);
      }
      if (null !== state.tag && '?' !== state.tag) {
          state.dump = '!<' + state.tag + '> ' + state.dump;
      }
    }

    return true;
  }

  function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }

  function inspectNode(object, objects, duplicatesIndexes) {
    var type = _toString.call(object), objectKeyList, index, length;
    if (null !== object && 'object' === typeof object) {
      index = objects.indexOf(object);
      if (-1 !== index) {
        if (-1 === duplicatesIndexes.indexOf(index)) {
          duplicatesIndexes.push(index);
        }
      }
      else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        }
        else {
          objectKeyList = Object.keys(object);
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }

  function dump(input, options) {
    options = options || {};
    var state = new State(options);
    getDuplicateReferences(input, state);
    if (writeNode(state, 0, input, true, true)) {
      return state.dump + '\n';
    }
    return '';
  }

  exports.dump = dump;

  function safeDump(input, options) {
    return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
  }

  exports.safeDump = safeDump;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/scalarInference',
      ["require", "exports"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });

  function parseYamlBoolean(input) {
    if (['true', 'True', 'TRUE'].lastIndexOf(input) >= 0) {
      return true;
    }
    if (['false', 'False', 'FALSE'].lastIndexOf(input) >= 0) {
      return false;
    }
    throw "Invalid boolean \"" + input + "\"";
  }
  exports.parseYamlBoolean = parseYamlBoolean;

  function safeParseYamlInteger(input) {
    // Use startsWith when es6 methods becomes available
    if (input.lastIndexOf('0o', 0) === 0) {
      return parseInt(input.substring(2), 8);
    }
    return parseInt(input);
  }

  function parseYamlInteger(input) {
    var result = safeParseYamlInteger(input);
    if (isNaN(result)) {
      throw "Invalid integer \"" + input + "\"";
    }
    return result;
  }

  exports.parseYamlInteger = parseYamlInteger;

  function parseYamlFloat(input) {
    if (['.nan', '.NaN', '.NAN'].lastIndexOf(input) >= 0) {
      return NaN;
    }
    var infinity = /^([-+])?(?:\.inf|\.Inf|\.INF)$/;
    var match = infinity.exec(input);
    if (match) {
      return match[1] === '-' ? -Infinity : Infinity;
    }

    var result = parseFloat(input);
    if (!isNaN(result)) {
      return result;
    }
    throw "Invalid float \"" + input + "\"";
  }

  exports.parseYamlFloat = parseYamlFloat;
  var ScalarType;
  (function (ScalarType) {
    ScalarType[ScalarType["null"] = 0] = "null";
    ScalarType[ScalarType["bool"] = 1] = "bool";
    ScalarType[ScalarType["int"] = 2] = "int";
    ScalarType[ScalarType["float"] = 3] = "float";
    ScalarType[ScalarType["string"] = 4] = "string";
  })(ScalarType = exports.ScalarType || (exports.ScalarType = {}));
  /** Determines the type of a scalar according to
   * the YAML 1.2 Core Schema (http://www.yaml.org/spec/1.2/spec.html#id2804923)
   */
  function determineScalarType(node) {
    if (node === undefined) {
      return ScalarType.null;
    }
    if (node.doubleQuoted || !node.plainScalar || node['singleQuoted']) {
      return ScalarType.string;
    }
    var value = node.value;
    if (['null', 'Null', 'NULL', '~', ''].indexOf(value) >= 0) {
      return ScalarType.null;
    }
    if (value === null || value === undefined) {
      return ScalarType.null;
    }

    if (['true', 'True', 'TRUE', 'false', 'False', 'FALSE'].indexOf(value) >= 0) {
      return ScalarType.bool;
    }

    var base10 = /^[-+]?[0-9]+$/;
    var base8 = /^0o[0-7]+$/;
    var base16 = /^0x[0-9a-fA-F]+$/;
    if (base10.test(value) || base8.test(value) || base16.test(value)) {
      return ScalarType.int;
    }

    var float = /^[-+]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)([eE][-+]?[0-9]+)?$/;
    var infinity = /^[-+]?(\.inf|\.Inf|\.INF)$/;
    if (float.test(value) || infinity.test(value) || ['.nan', '.NaN', '.NAN'].indexOf(value) >= 0) {
      return ScalarType.float;
    }

    return ScalarType.string;
  }

  exports.determineScalarType = determineScalarType;
});

/**
 * Created by kor on 06/05/15.
 */
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/yaml-ast-parser-custom-tags/index',
      ["require", "exports", "./loader", "./dumper", "./yamlAST", "./scalarInference"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";

  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }

  Object.defineProperty(exports, "__esModule", { value: true });
  var loader_1 = require("./loader");
  exports.load = loader_1.load;
  exports.loadAll = loader_1.loadAll;
  exports.safeLoad = loader_1.safeLoad;
  exports.safeLoadAll = loader_1.safeLoadAll;
  var dumper_1 = require("./dumper");
  exports.dump = dumper_1.dump;
  exports.safeDump = dumper_1.safeDump;
  __export(require("./yamlAST"));

  function deprecated(name) {
    return function () {
      throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
  }

  __export(require("./scalarInference"));
});

/* js-yaml 3.12.0 https://github.com/nodeca/js-yaml */
(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f()
  }
  else if (typeof define === "function" && define.amd) {
    define('js-yaml/js-yaml', [], f)
  }
  else {
    var g;
    if (typeof window !== "undefined") {
      g = window
    }
    else if (typeof global !== "undefined") {
      g = global
    }
    else if (typeof self !== "undefined") {
      g = self
    }
    else {
      g = this
    }
    g.jsyaml = f()
  }
})

(function(){
  var define, module, exports;
  return (function() {
    function r(e,n,t) { 
      function o(i,f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c)
              return c(i, !0);
            if (u)
              return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a
          }
          var p = n[i] = { exports: {} };
          e[i][0].call(p.exports, function(r) {
            var n = e[i][1][r];
            return o(n || r)
          }, p, p.exports, r, e, n, t)
        }
        return n[i].exports
      }
      for (var u = "function" == typeof require && require, i=0; i < t.length; i++)
        o(t[i]);
      return o
    }
    return r
  })()({
    1:[function(require,module,exports){
  'use strict';

  var loader = require('./js-yaml/loader');
  var dumper = require('./js-yaml/dumper');

  function deprecated(name) {
    return function () {
      throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
  }

  module.exports.Type                = require('./js-yaml/type');
  module.exports.Schema              = require('./js-yaml/schema');
  module.exports.FAILSAFE_SCHEMA     = require('./js-yaml/schema/failsafe');
  module.exports.JSON_SCHEMA         = require('./js-yaml/schema/json');
  module.exports.CORE_SCHEMA         = require('./js-yaml/schema/core');
  module.exports.DEFAULT_SAFE_SCHEMA = require('./js-yaml/schema/default_safe');
  module.exports.DEFAULT_FULL_SCHEMA = require('./js-yaml/schema/default_full');
  module.exports.load                = loader.load;
  module.exports.loadAll             = loader.loadAll;
  module.exports.safeLoad            = loader.safeLoad;
  module.exports.safeLoadAll         = loader.safeLoadAll;
  module.exports.dump                = dumper.dump;
  module.exports.safeDump            = dumper.safeDump;
  module.exports.YAMLException       = require('./js-yaml/exception');

  // Deprecated schema names from JS-YAML 2.0.x
  module.exports.MINIMAL_SCHEMA = require('./js-yaml/schema/failsafe');
  module.exports.SAFE_SCHEMA    = require('./js-yaml/schema/default_safe');
  module.exports.DEFAULT_SCHEMA = require('./js-yaml/schema/default_full');

  // Deprecated functions from JS-YAML 1.x.x
  module.exports.scan           = deprecated('scan');
  module.exports.parse          = deprecated('parse');
  module.exports.compose        = deprecated('compose');
  module.exports.addConstructor = deprecated('addConstructor');

}, {"./js-yaml/dumper":3,"./js-yaml/exception":4,"./js-yaml/loader":5,"./js-yaml/schema":7,"./js-yaml/schema/core":8,"./js-yaml/schema/default_full":9,"./js-yaml/schema/default_safe":10,"./js-yaml/schema/failsafe":11,"./js-yaml/schema/json":12,"./js-yaml/type":13}],2:[function(require,module,exports){
'use strict';

function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}

function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}

function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}

function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}

module.exports.isNothing      = isNothing;
module.exports.isObject       = isObject;
module.exports.toArray        = toArray;
module.exports.repeat         = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend         = extend;

},{}],3:[function(require,module,exports){
'use strict';

/*eslint-disable no-use-before-define*/

var common              = require('./common');
var YAMLException       = require('./exception');
var DEFAULT_FULL_SCHEMA = require('./schema/default_full');
var DEFAULT_SAFE_SCHEMA = require('./schema/default_safe');

var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}

function State(options) {
  this.schema       = options['schema'] || DEFAULT_FULL_SCHEMA;
  this.indent       = Math.max(1, (options['indent'] || 2));
  this.skipInvalid  = options['skipInvalid'] || false;
  this.flowLevel    = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap     = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys     = options['sortKeys'] || false;
  this.lineWidth    = options['lineWidth'] || 80;
  this.noRefs       = options['noRefs'] || false;
  this.noCompatMode = options['noCompatMode'] || false;
  this.condenseFlow = options['condenseFlow'] || false;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c) {
  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
  return isPrintable(c) && c !== 0xFEFF
    // - c-flow-indicator
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // - ":" - "#"
    && c !== CHAR_COLON
    && c !== CHAR_SHARP;
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  return isPrintable(c) && c !== 0xFEFF
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(string.charCodeAt(0))
          && !isWhitespace(string.charCodeAt(string.length - 1));

  if (singleLineOnly) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char);
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char);
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    return plain && !testAmbiguousType(string)
      ? STYLE_PLAIN : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
  state.dump = (function () {
    if (string.length === 0) {
      return "''";
    }
    if (!state.noCompatMode &&
        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
      return "'" + string + "'";
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string, lineWidth) + '"';
      default:
        throw new YAMLException('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char, nextChar;
  var escapeSeq;

  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
    if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
      nextChar = string.charCodeAt(i + 1);
      if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
        // Combine the surrogate pair and store it escaped.
        result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
        // Advance index one extra since we already used that char here.
        i++; continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char)
      ? string[i]
      : escapeSeq || encodeHex(char);
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level, object[index], false, false)) {
      if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level + 1, object[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = state.condenseFlow ? '"' : '';

    if (index !== 0) pairBuffer += ', ';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new YAMLException('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      state.tag = explicit ? type.tag : '?';

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      if (block && (state.dump.length !== 0)) {
        writeBlockSequence(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      state.dump = '!<' + state.tag + '> ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

  return '';
}

function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}

module.exports.dump     = dump;
module.exports.safeDump = safeDump;

},{"./common":2,"./exception":4,"./schema/default_full":9,"./schema/default_safe":10}],4:[function(require,module,exports){
// YAML error class. http://stackoverflow.com/questions/8458984
//


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  var result = this.name + ': ';

  result += this.reason || '(unknown reason)';

  if (!compact && this.mark) {
    result += ' ' + this.mark.toString();
  }

  return result;
};


module.exports = YAMLException;

},{}],
  5:[function(require,module,exports){
    'use strict';

    /*eslint-disable max-len,no-use-before-define*/
    var common              = require('./common');
    var YAMLException       = require('./exception');
    var Mark                = require('./mark');
    var DEFAULT_SAFE_SCHEMA = require('./schema/default_safe');
    var DEFAULT_FULL_SCHEMA = require('./schema/default_full');

    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    var CONTEXT_FLOW_IN   = 1;
    var CONTEXT_FLOW_OUT  = 2;
    var CONTEXT_BLOCK_IN  = 3;
    var CONTEXT_BLOCK_OUT = 4;

    var CHOMPING_CLIP  = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP  = 3;

    var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;

    function is_EOL(c) {
      return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
    }

    function is_WHITE_SPACE(c) {
      return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
    }

    function is_WS_OR_EOL(c) {
      return (c === 0x09/* Tab */) ||
             (c === 0x20/* Space */) ||
             (c === 0x0A/* LF */) ||
             (c === 0x0D/* CR */);
    }

    function is_FLOW_INDICATOR(c) {
      return c === 0x2C/* , */ ||
             c === 0x5B/* [ */ ||
             c === 0x5D/* ] */ ||
             c === 0x7B/* { */ ||
             c === 0x7D/* } */;
    }

    function fromHexCode(c) {
      var lc;

      if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
        return c - 0x30;
      }

      /*eslint-disable no-bitwise*/
      lc = c | 0x20;

      if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
        return lc - 0x61 + 10;
      }

      return -1;
    }

    function escapedHexLen(c) {
      if (c === 0x78/* x */) { return 2; }
      if (c === 0x75/* u */) { return 4; }
      if (c === 0x55/* U */) { return 8; }
      return 0;
    }

    function fromDecimalCode(c) {
      if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
        return c - 0x30;
      }

      return -1;
    }

    function simpleEscapeSequence(c) {
      /* eslint-disable indent */
      return (c === 0x30/* 0 */) ? '\x00' :
            (c === 0x61/* a */) ? '\x07' :
            (c === 0x62/* b */) ? '\x08' :
            (c === 0x74/* t */) ? '\x09' :
            (c === 0x09/* Tab */) ? '\x09' :
            (c === 0x6E/* n */) ? '\x0A' :
            (c === 0x76/* v */) ? '\x0B' :
            (c === 0x66/* f */) ? '\x0C' :
            (c === 0x72/* r */) ? '\x0D' :
            (c === 0x65/* e */) ? '\x1B' :
            (c === 0x20/* Space */) ? ' ' :
            (c === 0x22/* " */) ? '\x22' :
            (c === 0x2F/* / */) ? '/' :
            (c === 0x5C/* \ */) ? '\x5C' :
            (c === 0x4E/* N */) ? '\x85' :
            (c === 0x5F/* _ */) ? '\xA0' :
            (c === 0x4C/* L */) ? '\u2028' :
            (c === 0x50/* P */) ? '\u2029' : '';
    }

    function charFromCodepoint(c) {
      if (c <= 0xFFFF) {
        return String.fromCharCode(c);
      }
      // Encode UTF-16 surrogate pair
      // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
      return String.fromCharCode(
        ((c - 0x010000) >> 10) + 0xD800,
        ((c - 0x010000) & 0x03FF) + 0xDC00
      );
    }

    var simpleEscapeCheck = new Array(256); // integer, for fast access
    var simpleEscapeMap = new Array(256);
    for (var i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }

    function State(input, options) {
      this.input = input;

      this.filename  = options['filename']  || null;
      this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
      this.onWarning = options['onWarning'] || null;
      this.legacy    = options['legacy']    || false;
      this.json      = options['json']      || false;
      this.listener  = options['listener']  || null;

      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap       = this.schema.compiledTypeMap;

      this.length     = input.length;
      this.position   = 0;
      this.line       = 0;
      this.lineStart  = 0;
      this.lineIndent = 0;

      this.documents = [];

      /*
      this.version;
      this.checkLineBreaks;
      this.tagMap;
      this.anchorMap;
      this.tag;
      this.anchor;
      this.kind;
      this.result;*/
    }

    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
    }

    function throwError(state, message) {
      throw generateError(state, message);
    }

    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }

    var directiveHandlers = {

      YAML: function handleYamlDirective(state, name, args) {

        var match, major, minor;

        if (state.version !== null) {
          throwError(state, 'duplication of %YAML directive');
        }

        if (args.length !== 1) {
          throwError(state, 'YAML directive accepts exactly one argument');
        }

        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

        if (match === null) {
          throwError(state, 'ill-formed argument of the YAML directive');
        }

        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);

        if (major !== 1) {
          throwError(state, 'unacceptable YAML version of the document');
        }

        state.version = args[0];
        state.checkLineBreaks = (minor < 2);

        if (minor !== 1 && minor !== 2) {
          throwWarning(state, 'unsupported YAML version of the document');
        }
      },

      TAG: function handleTagDirective(state, name, args) {

        var handle, prefix;

        if (args.length !== 2) {
          throwError(state, 'TAG directive accepts exactly two arguments');
        }

        handle = args[0];
        prefix = args[1];

        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
        }

        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }

        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
        }

        state.tagMap[handle] = prefix;
      }
    };

    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;

      if (start < end) {
        _result = state.input.slice(start, end);

        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 0x09 ||
                  (0x20 <= _character && _character <= 0x10FFFF))) {
              throwError(state, 'expected valid JSON character');
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, 'the stream contains non-printable characters');
        }

        state.result += _result;
      }
    }

    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;

      if (!common.isObject(source)) {
        throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
      }

      sourceKeys = Object.keys(source);

      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];

        if (!_hasOwnProperty.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }

    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;

      keyNode = String(keyNode);

      if (_result === null) {
        _result = {};
      }

      if (keyTag === 'tag:yaml.org,2002:merge') {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      }
      else {
        if (!state.json &&
            !_hasOwnProperty.call(overridableKeys, keyNode) &&
            _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, 'duplicated mapping key');
        }
        _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
      }

      return _result;
    }

    function readLineBreak(state) {
      var ch;

      ch = state.input.charCodeAt(state.position);

      if (ch === 0x0A/* LF */) {
        state.position++;
      } else if (ch === 0x0D/* CR */) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
          state.position++;
        }
      } else {
        throwError(state, 'a line break is expected');
      }

      state.line += 1;
      state.lineStart = state.position;
    }

    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0,
          ch = state.input.charCodeAt(state.position);

      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (allowComments && ch === 0x23/* # */) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
        }

        if (is_EOL(ch)) {
          readLineBreak(state);

          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;

          while (ch === 0x20/* Space */) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }

      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, 'deficient indentation');
      }

      return lineBreaks;
    }

    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);

      // Condition state.position === state.lineStart is tested
      // in parent on each call, for efficiency. No needs to test here again.
      if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
          ch === state.input.charCodeAt(_position + 1) &&
          ch === state.input.charCodeAt(_position + 2)) {

        _position += 3;
        ch = state.input.charCodeAt(_position);

        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }

      return false;
    }

    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += ' ';
      } else if (count > 1) {
        state.result += common.repeat('\n', count - 1);
      }
    }

    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding,
          following,
          captureStart,
          captureEnd,
          hasPendingContent,
          _line,
          _lineStart,
          _lineIndent,
          _kind = state.kind,
          _result = state.result,
          ch;

      ch = state.input.charCodeAt(state.position);

      if (is_WS_OR_EOL(ch)      ||
          is_FLOW_INDICATOR(ch) ||
          ch === 0x23/* # */    ||
          ch === 0x26/* & */    ||
          ch === 0x2A/* * */    ||
          ch === 0x21/* ! */    ||
          ch === 0x7C/* | */    ||
          ch === 0x3E/* > */    ||
          ch === 0x27/* ' */    ||
          ch === 0x22/* " */    ||
          ch === 0x25/* % */    ||
          ch === 0x40/* @ */    ||
          ch === 0x60/* ` */) {
        return false;
      }

      if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
        following = state.input.charCodeAt(state.position + 1);

        if (is_WS_OR_EOL(following) ||
            withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }

      state.kind = 'scalar';
      state.result = '';
      captureStart = captureEnd = state.position;
      hasPendingContent = false;

      while (ch !== 0) {
        if (ch === 0x3A/* : */) {
          following = state.input.charCodeAt(state.position + 1);

          if (is_WS_OR_EOL(following) ||
              withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }

        } else if (ch === 0x23/* # */) {
          preceding = state.input.charCodeAt(state.position - 1);

          if (is_WS_OR_EOL(preceding)) {
            break;
          }

        } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
                   withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;

        }
        else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);

          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }

        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }

        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }

        ch = state.input.charCodeAt(++state.position);
      }

      captureSegment(state, captureStart, captureEnd, false);

      if (state.result) {
        return true;
      }

      state.kind = _kind;
      state.result = _result;
      return false;
    }

    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);

      if (ch !== 0x27/* ' */) {
        return false;
      }

      state.kind = 'scalar';
      state.result = '';
      state.position++;
      captureStart = captureEnd = state.position;

      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 0x27/* ' */) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);

          if (ch === 0x27/* ' */) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }

        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;

        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, 'unexpected end of the document within a single quoted scalar');

        } else {
          state.position++;
          captureEnd = state.position;
        }
      }

      throwError(state, 'unexpected end of the stream within a single quoted scalar');
    }

    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);

      if (ch !== 0x22/* " */) {
        return false;
      }

      state.kind = 'scalar';
      state.result = '';
      state.position++;
      captureStart = captureEnd = state.position;

      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 0x22/* " */) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;

        } else if (ch === 0x5C/* \ */) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);

          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);

            // TODO: rework to inline fn with no type cast?
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;

          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;

            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);

              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, 'expected hexadecimal character');
              }
            }

            state.result += charFromCodepoint(hexResult);
            state.position++;
          }
          else {
            throwError(state, 'unknown escape sequence');
          }
          captureStart = captureEnd = state.position;
        }
        else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;

        }
        else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, 'unexpected end of the document within a double quoted scalar');
        }
        else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, 'unexpected end of the stream within a double quoted scalar');
    }

    function readFlowCollection(state, nodeIndent) {
      var readNext = true,
          _line,
          _tag     = state.tag,
          _result,
          _anchor  = state.anchor,
          following,
          terminator,
          isPair,
          isExplicitPair,
          isMapping,
          overridableKeys = {},
          keyNode,
          keyTag,
          valueNode,
          ch;

      ch = state.input.charCodeAt(state.position);
      if (ch === 0x5B/* [ */) {
        terminator = 0x5D;/* ] */
        isMapping = false;
        _result = [];
      }
      else if (ch === 0x7B/* { */) {
        terminator = 0x7D;/* } */
        isMapping = true;
        _result = {};
      }
      else {
        return false;
      }

      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }

      ch = state.input.charCodeAt(++state.position);

      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);

        ch = state.input.charCodeAt(state.position);

        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? 'mapping' : 'sequence';
          state.result = _result;
          return true;
        }
        else if (!readNext) {
          throwError(state, 'missed comma between flow collection entries');
        }

        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;

        if (ch === 0x3F/* ? */) {
          following = state.input.charCodeAt(state.position + 1);

          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }

        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);

        ch = state.input.charCodeAt(state.position);

        if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }

        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        }
        else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        }
        else {
          _result.push(keyNode);
        }

        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);

        if (ch === 0x2C/* , */) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        }
        else {
          readNext = false;
        }
      }
      throwError(state, 'unexpected end of the stream within a flow collection');
    }

    function readBlockScalar(state, nodeIndent) {
      var captureStart,
          folding,
          chomping       = CHOMPING_CLIP,
          didReadContent = false,
          detectedIndent = false,
          textIndent     = nodeIndent,
          emptyLines     = 0,
          atMoreIndented = false,
          tmp,
          ch;

      ch = state.input.charCodeAt(state.position);

      if (ch === 0x7C/* | */) {
        folding = false;
      }
      else if (ch === 0x3E/* > */) {
        folding = true;
      }
      else {
        return false;
      }

      state.kind = 'scalar';
      state.result = '';
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);

        if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
          if (CHOMPING_CLIP === chomping) {
            chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
          }
          else {
            throwError(state, 'repeat of a chomping mode identifier');
          }

        }
        else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
          }
          else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          }
          else {
            throwError(state, 'repeat of an indentation width identifier');
          }
        }
        else {
          break;
        }
      }

      if (is_WHITE_SPACE(ch)) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (is_WHITE_SPACE(ch));

        if (ch === 0x23/* # */) {
          do { ch = state.input.charCodeAt(++state.position); }
          while (!is_EOL(ch) && (ch !== 0));
        }
      }

      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;

        ch = state.input.charCodeAt(state.position);

        while ((!detectedIndent || state.lineIndent < textIndent) &&
               (ch === 0x20/* Space */)) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }

        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }

        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }

        // End of the scalar.
        if (state.lineIndent < textIndent) {

          // Perform the chomping.
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) { // i.e. only if the scalar is not empty.
              state.result += '\n';
            }
          }

          // Break this `while` cycle and go to the funciton's epilogue.
          break;
        }

        // Folded style: use fancy rules to handle line breaks.
        if (folding) {

          // Lines starting with white space characters (more-indented lines) are not folded.
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            // except for the first content line (cf. Example 8.1)
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

          // End of more-indented block.
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat('\n', emptyLines + 1);

          // Just one line break - perceive as the same line.
          } else if (emptyLines === 0) {
            if (didReadContent) { // i.e. only if we have already read some scalar content.
              state.result += ' ';
            }

          // Several line breaks - perceive as different lines.
          } else {
            state.result += common.repeat('\n', emptyLines);
          }

        // Literal style: just add exact number of line breaks between content lines.
        } else {
          // Keep all line breaks except the header line break.
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        }

        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;

        while (!is_EOL(ch) && (ch !== 0)) {
          ch = state.input.charCodeAt(++state.position);
        }

        captureSegment(state, captureStart, state.position, false);
      }

      return true;
    }

    function readBlockSequence(state, nodeIndent) {
      var _line,
          _tag      = state.tag,
          _anchor   = state.anchor,
          _result   = [],
          following,
          detected  = false,
          ch;

      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 0x2D/* - */) {
          break;
        }

        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }

        detected = true;
        state.position++;

        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }

        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);

        ch = state.input.charCodeAt(state.position);

        if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
          throwError(state, 'bad indentation of a sequence entry');
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }

      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'sequence';
        state.result = _result;
        return true;
      }
      return false;
    }

    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following,
          allowCompact,
          _line,
          _pos,
          _tag          = state.tag,
          _anchor       = state.anchor,
          _result       = {},
          overridableKeys = {},
          keyTag        = null,
          keyNode       = null,
          valueNode     = null,
          atExplicitKey = false,
          detected      = false,
          ch;

      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }

      ch = state.input.charCodeAt(state.position);

      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        _pos = state.position;

        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {
          if (ch === 0x3F/* ? */) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }

            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          }
          else if (atExplicitKey) {
            // i.e. 0x3A/* : */ === character after the explicit key.
            atExplicitKey = false;
            allowCompact = true;
          }
          else {
            throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
          }

          state.position += 1;
          ch = following;
          //
          // Implicit notation case. Flow-style node as the key first, then ":", and the value.
          //
        }
        else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);

            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }

            if (ch === 0x3A/* : */) {
              ch = state.input.charCodeAt(++state.position);

              if (!is_WS_OR_EOL(ch)) {
                throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }

              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;

            }
            else if (detected) {
              throwError(state, 'can not read an implicit mapping pair; a colon is missed');
            }
            else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true; // Keep the result of `composeNode`.
            }

          }
          else if (detected) {
            throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
          }
          else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }
        }
        else {
          break; // Reading is done. Go to the epilogue.
        }

        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }

          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }

          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }

        if (state.lineIndent > nodeIndent && (ch !== 0)) {
          throwError(state, 'bad indentation of a mapping entry');
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }

      //
      // Epilogue.
      //
      // Special case: last mapping's node contains only the key in explicit notation.
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }

      // Expose the resulting mapping.
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'mapping';
        state.result = _result;
      }

      return detected;
    }

    function readTagProperty(state) {
      var _position,
          isVerbatim = false,
          isNamed    = false,
          tagHandle,
          tagName,
          ch;

      ch = state.input.charCodeAt(state.position);

      if (ch !== 0x21/* ! */) return false;

      if (state.tag !== null) {
        throwError(state, 'duplication of a tag property');
      }

      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x3C/* < */) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);

      } else if (ch === 0x21/* ! */) {
        isNamed = true;
        tagHandle = '!!';
        ch = state.input.charCodeAt(++state.position);

      } else {
        tagHandle = '!';
      }

      _position = state.position;

      if (isVerbatim) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && ch !== 0x3E/* > */);

        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, 'unexpected end of the stream within a verbatim tag');
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {

          if (ch === 0x21/* ! */) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);

              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, 'named tag handle cannot contain such characters');
              }

              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, 'tag suffix cannot contain exclamation marks');
            }
          }

          ch = state.input.charCodeAt(++state.position);
        }

        tagName = state.input.slice(_position, state.position);

        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, 'tag suffix cannot contain flow indicator characters');
        }
      }

      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, 'tag name cannot contain such characters: ' + tagName);
      }

      if (isVerbatim) {
        state.tag = tagName;

      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;

      } else if (tagHandle === '!') {
        state.tag = '!' + tagName;

      } else if (tagHandle === '!!') {
        state.tag = 'tag:yaml.org,2002:' + tagName;

      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }

      return true;
    }

    function readAnchorProperty(state) {
      var _position,
          ch;

      ch = state.input.charCodeAt(state.position);

      if (ch !== 0x26/* & */) return false;

      if (state.anchor !== null) {
        throwError(state, 'duplication of an anchor property');
      }

      ch = state.input.charCodeAt(++state.position);
      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, 'name of an anchor node must contain at least one character');
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }

    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 0x2A/* * */) return false;

      ch = state.input.charCodeAt(++state.position);
      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (state.position === _position) {
        throwError(state, 'name of an alias node must contain at least one character');
      }

      alias = state.input.slice(_position, state.position);

      if (!state.anchorMap.hasOwnProperty(alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }

      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }

    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles,
          allowBlockScalars,
          allowBlockCollections,
          indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
          atNewLine  = false,
          hasContent = false,
          typeIndex,
          typeQuantity,
          type,
          flowIndent,
          blockIndent;

      if (state.listener !== null) {
        state.listener('open', state);
      }

      state.tag    = null;
      state.anchor = null;
      state.kind   = null;
      state.result = null;

      allowBlockStyles = allowBlockScalars = allowBlockCollections =
        CONTEXT_BLOCK_OUT === nodeContext ||
        CONTEXT_BLOCK_IN  === nodeContext;

      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;

          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }

      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;

            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }

      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }

      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }

        blockIndent = state.position - state.lineStart;

        if (indentStatus === 1) {
          if (allowBlockCollections &&
              (readBlockSequence(state, blockIndent) ||
               readBlockMapping(state, blockIndent, flowIndent)) ||
              readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
                readSingleQuotedScalar(state, flowIndent) ||
                readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;

            } else if (readAlias(state)) {
              hasContent = true;

              if (state.tag !== null || state.anchor !== null) {
                throwError(state, 'alias node should not have any properties');
              }

            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;

              if (state.tag === null) {
                state.tag = '?';
              }
            }

            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          // Special case: block sequences are allowed to have same indentation level as the parent.
          // http://www.yaml.org/spec/1.2/spec.html#id2799784
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }

      if (state.tag !== null && state.tag !== '!') {
        if (state.tag === '?') {
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];

            // Implicit resolving is not allowed for non-scalar types, and '?'
            // non-specific tag is only assigned to plain scalars. So, it isn't
            // needed to check for 'kind' conformity.

            if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
          type = state.typeMap[state.kind || 'fallback'][state.tag];

          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }

          if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
            throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, 'unknown tag !<' + state.tag + '>');
        }
      }

      if (state.listener !== null) {
        state.listener('close', state);
      }
      return state.tag !== null ||  state.anchor !== null || hasContent;
    }

    function readDocument(state) {
      var documentStart = state.position,
          _position,
          directiveName,
          directiveArgs,
          hasDirectives = false,
          ch;

      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};

      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);

        ch = state.input.charCodeAt(state.position);

        if (state.lineIndent > 0 || ch !== 0x25/* % */) {
          break;
        }

        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;

        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];

        if (directiveName.length < 1) {
          throwError(state, 'directive name must not be less than one character in length');
        }

        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }

          if (ch === 0x23/* # */) {
            do { ch = state.input.charCodeAt(++state.position); }
            while (ch !== 0 && !is_EOL(ch));
            break;
          }

          if (is_EOL(ch)) break;

          _position = state.position;

          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }

          directiveArgs.push(state.input.slice(_position, state.position));
        }

        if (ch !== 0) readLineBreak(state);

        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }

      skipSeparationSpace(state, true, -1);

      if (state.lineIndent === 0 &&
          state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
          state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
          state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);

      } else if (hasDirectives) {
        throwError(state, 'directives end mark is expected');
      }

      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);

      if (state.checkLineBreaks &&
          PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, 'non-ASCII line breaks are interpreted as content');
      }

      state.documents.push(state.result);

      if (state.position === state.lineStart && testDocumentSeparator(state)) {

        if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }

      if (state.position < (state.length - 1)) {
        throwError(state, 'end of the stream or a document separator is expected');
      } else {
        return;
      }
    }

    function loadDocuments(input, options) {
      input = String(input);
      options = options || {};

      if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
            input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
          input += '\n';
        }

        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
          input = input.slice(1);
        }
      }

      var state = new State(input, options);
      // Use 0 as string terminator. That significantly simplifies bounds check.
      state.input += '\0';

      while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
        state.lineIndent += 1;
        state.position += 1;
      }

      while (state.position < (state.length - 1)) {
        readDocument(state);
      }

      return state.documents;
    }

    function loadAll(input, iterator, options) {
      var documents = loadDocuments(input, options), index, length;

      if (typeof iterator !== 'function') {
        return documents;
      }

      for (index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }

    function load(input, options) {
      var documents = loadDocuments(input, options);

      if (documents.length === 0) {
        /*eslint-disable no-undefined*/
        return undefined;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException('expected a single document in the stream, but found more');
    }

    function safeLoadAll(input, output, options) {
      if (typeof output === 'function') {
        loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
      } else {
        return loadAll(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
      }
    }


    function safeLoad(input, options) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
    }

    module.exports.loadAll     = loadAll;
    module.exports.load        = load;
    module.exports.safeLoadAll = safeLoadAll;
    module.exports.safeLoad    = safeLoad;

  },
  {
    "./common": 2,
    "./exception": 4,
    "./mark": 6,
    "./schema/default_full": 9,
    "./schema/default_safe": 10
  }
],
6: [
  function(require,module,exports) {
    'use strict';
    var common = require('./common');
    function Mark(name, buffer, position, line, column) {
      this.name     = name;
      this.buffer   = buffer;
      this.position = position;
      this.line     = line;
      this.column   = column;
    }

    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;

      if (!this.buffer) return null;

      indent = indent || 4;
      maxLength = maxLength || 75;

      head = '';
      start = this.position;

      while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > (maxLength / 2 - 1)) {
          head = ' ... ';
          start += 5;
          break;
        }
      }

      tail = '';
      end = this.position;

      while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > (maxLength / 2 - 1)) {
          tail = ' ... ';
          end -= 5;
          break;
        }
      }

      snippet = this.buffer.slice(start, end);

      return common.repeat(' ', indent) + head + snippet + tail + '\n' +
             common.repeat(' ', indent + this.position - start + head.length) + '^';
    };

    Mark.prototype.toString = function toString(compact) {
      var snippet, where = '';

      if (this.name) {
        where += 'in "' + this.name + '" ';
      }

      where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

      if (!compact) {
        snippet = this.getSnippet();

        if (snippet) {
          where += ':\n' + snippet;
        }
      }

      return where;
    };

    module.exports = Mark;

  },
  {
    "./common": 2
  }
],
7: [
  function(require, module, exports) {
    'use strict';

    /*eslint-disable max-len*/
    var common        = require('./common');
    var YAMLException = require('./exception');
    var Type          = require('./type');

    function compileList(schema, name, result) {
      var exclude = [];

      schema.include.forEach(function (includedSchema) {
        result = compileList(includedSchema, name, result);
      });

      schema[name].forEach(function (currentType) {
        result.forEach(function (previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });

        result.push(currentType);
      });

      return result.filter(function (type, index) {
        return exclude.indexOf(index) === -1;
      });
    }

    function compileMap(/* lists... */) {
      var result = {
            scalar: {},
            sequence: {},
            mapping: {},
            fallback: {}
          }, index, length;

      function collectType(type) {
        result[type.kind][type.tag] = result['fallback'][type.tag] = type;
      }

      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }

    function Schema(definition) {
      this.include  = definition.include  || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];

      this.implicit.forEach(function (type) {
        if (type.loadKind && type.loadKind !== 'scalar') {
          throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
      });

      this.compiledImplicit = compileList(this, 'implicit', []);
      this.compiledExplicit = compileList(this, 'explicit', []);
      this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
    }

    Schema.DEFAULT = null;

    Schema.create = function createSchema() {
      var schemas, types;

      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;

        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;

        default:
          throw new YAMLException('Wrong number of arguments for Schema.create function');
      }

      schemas = common.toArray(schemas);
      types = common.toArray(types);

      if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
        throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
      }

      if (!types.every(function (type) { return type instanceof Type; })) {
        throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }

      return new Schema({
        include: schemas,
        explicit: types
      });
    };

    module.exports = Schema;
  },
  {
    "./common": 2,
    "./exception": 4,
    "./type": 13
  }
],
8: [
  function(require, module, exports) {
    // Standard YAML's Core schema.
    // http://www.yaml.org/spec/1.2/spec.html#id2804923
    //
    // NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
    // So, Core schema has no distinctions from JSON schema is JS-YAML.
    var Schema = require('../schema');
    module.exports = new Schema({
      include: [
        require('./json')
      ]
    });
  },
  {
    "../schema": 7,
    "./json": 12
  }
],
9: [
  function(require, module, exports) {
    // JS-YAML's default schema for `load` function.
    // It is not described in the YAML specification.
    //
    // This schema is based on JS-YAML's default safe schema and includes
    // JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
    //
    // Also this schema is used as default base schema at `Schema.create` function.
    var Schema = require('../schema');

    module.exports = Schema.DEFAULT = new Schema({
      include: [
        require('./default_safe')
      ],
      explicit: [
        require('../type/js/undefined'),
        require('../type/js/regexp'),
        require('../type/js/function')
      ]
    });
  },
  {
    "../schema": 7,
    "../type/js/function": 18,
    "../type/js/regexp": 19,
    "../type/js/undefined": 20,
    "./default_safe": 10
  }
],
10: [
  function(require, module, exports) {
    // JS-YAML's default schema for `safeLoad` function.
    // It is not described in the YAML specification.
    //
    // This schema is based on standard YAML's Core schema and includes most of
    // extra types described at YAML tag repository. (http://yaml.org/type/)
    var Schema = require('../schema');

    module.exports = new Schema({
      include: [
        require('./core')
      ],
      implicit: [
        require('../type/timestamp'),
        require('../type/merge')
      ],
      explicit: [
        require('../type/binary'),
        require('../type/omap'),
        require('../type/pairs'),
        require('../type/set')
      ]
    });
  },
  {
    "../schema": 7,
    "../type/binary": 14,
    "../type/merge": 22,
    "../type/omap": 24,
    "../type/pairs": 25,
    "../type/set": 27,
    "../type/timestamp": 29,
    "./core": 8
  }
],
11: [
  function(require,module,exports){
    // Standard YAML's Failsafe schema.
    // http://www.yaml.org/spec/1.2/spec.html#id2802346
    var Schema = require('../schema');
    module.exports = new Schema({
      explicit: [
        require('../type/str'),
        require('../type/seq'),
        require('../type/map')
      ]
    });
  },
  {
    "../schema": 7,
    "../type/map": 21,
    "../type/seq": 26,
    "../type/str": 28
  }
],
12: [
  function(require,module,exports){
    // Standard YAML's JSON schema.
    // http://www.yaml.org/spec/1.2/spec.html#id2803231
    //
    // NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
    // So, this schema is not such strict as defined in the YAML specification.
    // It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
    var Schema = require('../schema');
    module.exports = new Schema({
      include: [
        require('./failsafe')
      ],
      implicit: [
        require('../type/null'),
        require('../type/bool'),
        require('../type/int'),
        require('../type/float')
      ]
    });
  },
  {
    "../schema": 7,
    "../type/bool": 15,
    "../type/float": 16,
    "../type/int": 17,
    "../type/null": 23,
    "./failsafe": 11
  }
],
13: [
  function(require, module, exports) {
    'use strict';

    var YAMLException = require('./exception');
    var TYPE_CONSTRUCTOR_OPTIONS = [
      'kind',
      'resolve',
      'construct',
      'instanceOf',
      'predicate',
      'represent',
      'defaultStyle',
      'styleAliases'
    ];
    var YAML_NODE_KINDS = [
      'scalar',
      'sequence',
      'mapping'
    ];

    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function (style) {
          map[style].forEach(function (alias) {
            result[String(alias)] = style;
          });
        });
      }

      return result;
    }

    function Type(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function (name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });

      // TODO: Add tag format check.
      this.tag          = tag;
      this.kind         = options['kind']         || null;
      this.resolve      = options['resolve']      || function () { return true; };
      this.construct    = options['construct']    || function (data) { return data; };
      this.instanceOf   = options['instanceOf']   || null;
      this.predicate    = options['predicate']    || null;
      this.represent    = options['represent']    || null;
      this.defaultStyle = options['defaultStyle'] || null;
      this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module.exports = Type;
  },
  {
    "./exception": 4
  }
],
14: [
  function(require,module,exports){
    'use strict';
    /*eslint-disable no-bitwise*/
    var NodeBuffer;
    try {
      // A trick for browserified version, to not include `Buffer` shim
      var _require = require;
      NodeBuffer = _require('buffer').Buffer;
    } catch (__) {}

    var Type       = require('../type');

    // [ 64, 65, 66 ] -> [ padding, CR, LF ]
    var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';

    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      // Convert one by one.
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
      }

      // If there are any bits left, source was corrupted
      return (bitlen % 8) === 0;
    }

    function constructYamlBinary(data) {
      var idx, tailbits,
          input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
          max = input.length,
          map = BASE64_MAP,
          bits = 0,
          result = [];

      // Collect by 6*4 bits (3 bytes)

      for (idx = 0; idx < max; idx++) {
        if ((idx % 4 === 0) && idx) {
          result.push((bits >> 16) & 0xFF);
          result.push((bits >> 8) & 0xFF);
          result.push(bits & 0xFF);
        }

        bits = (bits << 6) | map.indexOf(input.charAt(idx));
      }

      // Dump tail
      tailbits = (max % 4) * 6;

      if (tailbits === 0) {
        result.push((bits >> 16) & 0xFF);
        result.push((bits >> 8) & 0xFF);
        result.push(bits & 0xFF);
      }
      else if (tailbits === 18) {
        result.push((bits >> 10) & 0xFF);
        result.push((bits >> 2) & 0xFF);
      }
      else if (tailbits === 12) {
        result.push((bits >> 4) & 0xFF);
      }

      // Wrap into Buffer for NodeJS and leave Array for browser
      if (NodeBuffer) {
        // Support node 6.+ Buffer API when available
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }

    function representYamlBinary(object /*, style*/) {
      var result = '', bits = 0, idx, tail,
          max = object.length,
          map = BASE64_MAP;

      // Convert every three bytes to 4 ASCII characters.
      for (idx = 0; idx < max; idx++) {
        if ((idx % 3 === 0) && idx) {
          result += map[(bits >> 18) & 0x3F];
          result += map[(bits >> 12) & 0x3F];
          result += map[(bits >> 6) & 0x3F];
          result += map[bits & 0x3F];
        }

        bits = (bits << 8) + object[idx];
      }

      // Dump tail
      tail = max % 3;

      if (tail === 0) {
        result += map[(bits >> 18) & 0x3F];
        result += map[(bits >> 12) & 0x3F];
        result += map[(bits >> 6) & 0x3F];
        result += map[bits & 0x3F];
      }
      else if (tail === 2) {
        result += map[(bits >> 10) & 0x3F];
        result += map[(bits >> 4) & 0x3F];
        result += map[(bits << 2) & 0x3F];
        result += map[64];
      }
      else if (tail === 1) {
        result += map[(bits >> 2) & 0x3F];
        result += map[(bits << 4) & 0x3F];
        result += map[64];
        result += map[64];
      }

      return result;
    }

    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }

    module.exports = new Type('tag:yaml.org,2002:binary', {
      kind: 'scalar',
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  },
  {
    "../type": 13
  }
],
15: [
  function(require, module, exports) {
    'use strict';
    var Type = require('../type');

    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
             (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
    }

    function constructYamlBoolean(data) {
      return data === 'true' || data === 'True' || data === 'TRUE';
    }

    function isBoolean(object) {
      return Object.prototype.toString.call(object) === '[object Boolean]';
    }

    module.exports = new Type('tag:yaml.org,2002:bool', {
      kind: 'scalar',
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function (object) { return object ? 'true' : 'false'; },
        uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
        camelcase: function (object) { return object ? 'True' : 'False'; }
      },
      defaultStyle: 'lowercase'
    });
  },
  {
    "../type": 13
  }
],
16: [
  function(require,module,exports){
    'use strict';

    var common = require('../common');
    var Type   = require('../type');

    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
      // .2e4, .2
      // special case, seems not from spec
      '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
      // 20:59
      '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
      // .inf
      '|[-+]?\\.(?:inf|Inf|INF)' +
      // .nan
      '|\\.(?:nan|NaN|NAN))$');

    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) ||
          // Quick hack to not allow integers end with `_`
          // Probably should update regexp & check speed
          data[data.length - 1] === '_') {
        return false;
      }
      return true;
    }

    function constructYamlFloat(data) {
      var value, sign, base, digits;

      value  = data.replace(/_/g, '').toLowerCase();
      sign   = value[0] === '-' ? -1 : 1;
      digits = [];

      if ('+-'.indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }

      if (value === '.inf') {
        return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      }
      if (value === '.nan') {
        return NaN;
      }
      if (value.indexOf(':') >= 0) {
        value.split(':').forEach(function (v) {
          digits.unshift(parseFloat(v, 10));
        });

        value = 0.0;
        base = 1;

        digits.forEach(function (d) {
          value += d * base;
          base *= 60;
        });

        return sign * value;

      }
      return sign * parseFloat(value, 10);
    }

    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case 'lowercase': return '.nan';
          case 'uppercase': return '.NAN';
          case 'camelcase': return '.NaN';
        }
      }
      else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case 'lowercase': return '.inf';
          case 'uppercase': return '.INF';
          case 'camelcase': return '.Inf';
        }
      }
      else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case 'lowercase': return '-.inf';
          case 'uppercase': return '-.INF';
          case 'camelcase': return '-.Inf';
        }
      }
      else if (common.isNegativeZero(object)) {
        return '-0.0';
      }

      res = object.toString(10);
      // JS stringifier can build scientific format without dots: 5e-100,
      // while YAML requres dot: 5.e-100. Fix it with simple hack
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
    }

    function isFloat(object) {
      return (Object.prototype.toString.call(object) === '[object Number]') &&
             (object % 1 !== 0 || common.isNegativeZero(object));
    }

    module.exports = new Type('tag:yaml.org,2002:float', {
      kind: 'scalar',
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: 'lowercase'
    });
  },
  {
    "../common": 2,
    "../type": 13
  }
],
17: [
  function(require,module,exports){
    'use strict';

    var common = require('../common');
    var Type   = require('../type');

    function isHexCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
             ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
             ((0x61/* a */ <= c) && (c <= 0x66/* f */));
    }

    function isOctCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
    }

    function isDecCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
    }

    function resolveYamlInteger(data) {
      if (data === null) return false;

      var max = data.length,
          index = 0,
          hasDigits = false,
          ch;

      if (!max) return false;

      ch = data[index];
      // sign
      if (ch === '-' || ch === '+') {
        ch = data[++index];
      }

      if (ch === '0') {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];

        // base 2, base 8, base 16
        if (ch === 'b') {
          // base 2
          index++;

          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') continue;
            if (ch !== '0' && ch !== '1') return false;
            hasDigits = true;
          }
          return hasDigits && ch !== '_';
        }

        if (ch === 'x') {
          // base 16
          index++;

          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== '_';
        }

        // base 8
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }

      // base 10 (except 0) or base 60

      // value should not start with `_`;
      if (ch === '_') return false;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch === ':') break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }

      // Should have digits and should not end with `_`
      if (!hasDigits || ch === '_') return false;

      // if !base60 - done;
      if (ch !== ':') return true;

      // base60 almost not used, no needs to optimize
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }

    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];

      if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
      }

      ch = value[0];

      if (ch === '-' || ch === '+') {
        if (ch === '-') sign = -1;
        value = value.slice(1);
        ch = value[0];
      }

      if (value === '0') return 0;

      if (ch === '0') {
        if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
        if (value[1] === 'x') return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }

      if (value.indexOf(':') !== -1) {
        value.split(':').forEach(function (v) {
          digits.unshift(parseInt(v, 10));
        });

        value = 0;
        base = 1;

        digits.forEach(function (d) {
          value += (d * base);
          base *= 60;
        });
        return sign * value;
      }

      return sign * parseInt(value, 10);
    }

    function isInteger(object) {
      return (Object.prototype.toString.call(object)) === '[object Number]' &&
             (object % 1 === 0 && !common.isNegativeZero(object));
    }

    module.exports = new Type('tag:yaml.org,2002:int', {
      kind: 'scalar',
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
        octal:       function (obj) { return obj >= 0 ? '0'  + obj.toString(8) : '-0'  + obj.toString(8).slice(1); },
        decimal:     function (obj) { return obj.toString(10); },
        /* eslint-disable max-len */
        hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
      },
      defaultStyle: 'decimal',
      styleAliases: {
        binary:      [ 2,  'bin' ],
        octal:       [ 8,  'oct' ],
        decimal:     [ 10, 'dec' ],
        hexadecimal: [ 16, 'hex' ]
      }
    });
  },
  {
    "../common": 2,
    "../type": 13
  }
],
18: [
  function(require,module,exports){
    'use strict';

    var esprima;

    // Browserified version does not have esprima
    //
    // 1. For node.js just require module as deps
    // 2. For browser try to require mudule via external AMD system.
    //    If not found - try to fallback to window.esprima. If not
    //    found too - then fail to parse.
    //
    try {
      // workaround to exclude package from browserify list.
      var _require = require;
      esprima = _require('esprima');
    }
    catch (_) {
      /*global window */
      if (typeof window !== 'undefined')
        esprima = window.esprima;
    }

    var Type = require('../../type');

    function resolveJavascriptFunction(data) {
      if (data === null) return false;

      try {
        var source = '(' + data + ')',
            ast    = esprima.parse(source, { range: true });

        if (ast.type                    !== 'Program'             ||
            ast.body.length             !== 1                     ||
            ast.body[0].type            !== 'ExpressionStatement' ||
            (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
              ast.body[0].expression.type !== 'FunctionExpression')) {
          return false;
        }

        return true;
      }
      catch (err) {
        return false;
      }
    }

    function constructJavascriptFunction(data) {
      /*jslint evil:true*/

      var source = '(' + data + ')',
          ast    = esprima.parse(source, { range: true }),
          params = [],
          body;

      if (ast.type                    !== 'Program'             ||
          ast.body.length             !== 1                     ||
          ast.body[0].type            !== 'ExpressionStatement' ||
          (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
            ast.body[0].expression.type !== 'FunctionExpression')) {
        throw new Error('Failed to resolve function');
      }

      ast.body[0].expression.params.forEach(function (param) {
        params.push(param.name);
      });

      body = ast.body[0].expression.body.range;

      // Esprima's ranges include the first '{' and the last '}' characters on
      // function expressions. So cut them out.
      if (ast.body[0].expression.body.type === 'BlockStatement') {
        /*eslint-disable no-new-func*/
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      // ES6 arrow functions can omit the BlockStatement. In that case, just return
      // the body.
      /*eslint-disable no-new-func*/
      return new Function(params, 'return ' + source.slice(body[0], body[1]));
    }

    function representJavascriptFunction(object /*, style*/) {
      return object.toString();
    }

    function isFunction(object) {
      return Object.prototype.toString.call(object) === '[object Function]';
    }

    module.exports = new Type('tag:yaml.org,2002:js/function', {
      kind: 'scalar',
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  },
  {
    "../../type": 13
  }
],
19: [
  function(require,module,exports){
    'use strict';
    var Type = require('../../type');

    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;

      var regexp = data,
          tail   = /\/([gim]*)$/.exec(data),
          modifiers = '';

      // if regexp starts with '/' it can have modifiers and must be properly closed
      // `/foo/gim` - modifiers tail can be maximum 3 chars
      if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];

        if (modifiers.length > 3) return false;
        // if expression starts with /, is should be properly terminated
        if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
      }
      return true;
    }

    function constructJavascriptRegExp(data) {
      var regexp = data,
          tail   = /\/([gim]*)$/.exec(data),
          modifiers = '';

      // `/foo/gim` - tail can be maximum 4 chars
      if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }

      return new RegExp(regexp, modifiers);
    }

    function representJavascriptRegExp(object /*, style*/) {
      var result = '/' + object.source + '/';

      if (object.global) result += 'g';
      if (object.multiline) result += 'm';
      if (object.ignoreCase) result += 'i';

      return result;
    }

    function isRegExp(object) {
      return Object.prototype.toString.call(object) === '[object RegExp]';
    }

    module.exports = new Type('tag:yaml.org,2002:js/regexp', {
      kind: 'scalar',
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  },
  {
    "../../type": 13
  }
],
20: [
  function(require,module,exports){
    'use strict';

    var Type = require('../../type');

    function resolveJavascriptUndefined() {
      return true;
    }

    function constructJavascriptUndefined() {
      /*eslint-disable no-undefined*/
      return undefined;
    }

    function representJavascriptUndefined() {
      return '';
    }

    function isUndefined(object) {
      return typeof object === 'undefined';
    }

    module.exports = new Type('tag:yaml.org,2002:js/undefined', {
      kind: 'scalar',
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  },
  {
    "../../type": 13
  }
],
21: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');

    module.exports = new Type('tag:yaml.org,2002:map', {
      kind: 'mapping',
      construct: function (data) { return data !== null ? data : {}; }
    });
  },
  {
    "../type": 13
  }
],
22: [
  function(require,module,exports){
    'use strict';
    var Type = require('../type');
    function resolveYamlMerge(data) {
      return data === '<<' || data === null;
    }
    module.exports = new Type('tag:yaml.org,2002:merge', {
      kind: 'scalar',
      resolve: resolveYamlMerge
    });
  },
  {
    "../type": 13
  }
],
23: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');
    function resolveYamlNull(data) {
      if (data === null)
        return true;
      var max = data.length;
      return (max === 1 && data === '~') ||
             (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
    }

    function constructYamlNull() {
      return null;
    }

    function isNull(object) {
      return object === null;
    }

    module.exports = new Type('tag:yaml.org,2002:null', {
      kind: 'scalar',
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function () { return '~';    },
        lowercase: function () { return 'null'; },
        uppercase: function () { return 'NULL'; },
        camelcase: function () { return 'Null'; }
      },
      defaultStyle: 'lowercase'
    });
  },
  {
    "../type":
    13
  }
],
24: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString       = Object.prototype.toString;

    function resolveYamlOmap(data) {
      if (data === null)
        return true;

      var objectKeys = [], index, length, pair, pairKey, pairHasKey,
          object = data;

      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;

        if (_toString.call(pair) !== '[object Object]')
          return false;

        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey)
              pairHasKey = true;
            else
              return false;
          }
        }

        if (!pairHasKey)
          return false;
        if (objectKeys.indexOf(pairKey) === -1)
          objectKeys.push(pairKey);
        else
          return false;
      }

      return true;
    }

    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }

    module.exports = new Type('tag:yaml.org,2002:omap', {
      kind: 'sequence',
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  },
  {
    "../type": 13
  }
],
25: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');
    var _toString = Object.prototype.toString;

    function resolveYamlPairs(data) {
      if (data === null)
        return true;

      var index, length, pair, keys, result,
          object = data;

      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== '[object Object]')
          return false;

        keys = Object.keys(pair);
        if (keys.length !== 1)
          return false;

        result[index] = [ keys[0], pair[keys[0]] ];
      }

      return true;
    }

    function constructYamlPairs(data) {
      if (data === null)
        return [];

      var index, length, pair, keys, result,
          object = data;

      result = new Array(object.length);

      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [ keys[0], pair[keys[0]] ];
      }

      return result;
    }

    module.exports = new Type('tag:yaml.org,2002:pairs', {
      kind: 'sequence',
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  },
  {
    "../type": 13
  }
],
26: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');

    module.exports = new Type('tag:yaml.org,2002:seq', {
      kind: 'sequence',
      construct: function (data) { return data !== null ? data : []; }
    });
  },
  {
    "../type": 13
  }
],
27: [
  function(require,module,exports){
    'use strict';
    var Type = require('../type');
    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    function resolveYamlSet(data) {
      if (data === null)
        return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null)
            return false;
        }
      }

      return true;
    }

    function constructYamlSet(data) {
      return data !== null ? data : {};
    }

    module.exports = new Type('tag:yaml.org,2002:set', {
      kind: 'mapping',
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  },
  {
    "../type": 13
  }
],
28: [
  function(require,module,exports){
    'use strict';
    var Type = require('../type');

    module.exports = new Type('tag:yaml.org,2002:str', {
      kind: 'scalar',
      construct: function (data) { return data !== null ? data : ''; }
    });
  },
  {
    "../type": 13
  }
],
29: [
  function(require,module,exports){
    'use strict';

    var Type = require('../type');

    var YAML_DATE_REGEXP = new RegExp(
      '^([0-9][0-9][0-9][0-9])'          + // [1] year
      '-([0-9][0-9])'                    + // [2] month
      '-([0-9][0-9])$');                   // [3] day

    var YAML_TIMESTAMP_REGEXP = new RegExp(
      '^([0-9][0-9][0-9][0-9])'          + // [1] year
      '-([0-9][0-9]?)'                   + // [2] month
      '-([0-9][0-9]?)'                   + // [3] day
      '(?:[Tt]|[ \\t]+)'                 + // ...
      '([0-9][0-9]?)'                    + // [4] hour
      ':([0-9][0-9])'                    + // [5] minute
      ':([0-9][0-9])'                    + // [6] second
      '(?:\\.([0-9]*))?'                 + // [7] fraction
      '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
      '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }

    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0,
          delta = null, tz_hour, tz_minute, date;

      match = YAML_DATE_REGEXP.exec(data);
      if (match === null)
        match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null)
        throw new Error('Date resolve error');

      // match: [1] year [2] month [3] day

      year = +(match[1]);
      month = +(match[2]) - 1; // JS month starts with 0
      day = +(match[3]);

      if (!match[4]) { // no hour
        return new Date(Date.UTC(year, month, day));
      }

      // match: [4] hour [5] minute [6] second [7] fraction
      hour = +(match[4]);
      minute = +(match[5]);
      second = +(match[6]);

      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) { // milli-seconds
          fraction += '0';
        }
        fraction = +fraction;
      }

      // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
      if (match[9]) {
        tz_hour = +(match[10]);
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === '-')
          delta = -delta;
      }

      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

      if (delta)
        date.setTime(date.getTime() - delta);

      return date;
    }

    function representYamlTimestamp(object /*, style*/) {
      return object.toISOString();
    }

    module.exports = new Type('tag:yaml.org,2002:timestamp', {
      kind: 'scalar',
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  },
  {
    "../type": 13
  }
],
"/": [
  function(require,module,exports){
    'use strict';
    var yaml = require('./lib/js-yaml.js');
    module.exports = yaml;
  },
  {
    "./lib/js-yaml.js": 1
  }
]
},
{},
[])("/")
});

define(
  'js-yaml',
  ['js-yaml/js-yaml'],
  function (main) {
    return main;
  }
);

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
      define(
        'vs/language/yaml/languageservice/utils/documentPositionCalculator',
        ["require", "exports"],
        factory
      );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  function insertionPointReturnValue(pt) {
      return -pt - 1;
  }
  
  exports.insertionPointReturnValue = insertionPointReturnValue;
  function binarySearch(array, sought) {
    var lower = 0;
    var upper = array.length - 1;
    while (lower <= upper) {
      var idx = Math.floor((lower + upper) / 2);
      var value = array[idx];
      if (value === sought) {
          return idx;
      }
      if (lower === upper) {
          var insertionPoint = value < sought ? idx + 1 : idx;
          return insertionPointReturnValue(insertionPoint);
      }
      if (sought > value) {
          lower = idx + 1;
      }
      else if (sought < value) {
          upper = idx - 1;
      }
    }
  }
  exports.binarySearch = binarySearch;
  function getLineStartPositions(text) {
    var lineStartPositions = [0];
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (c === '\r') {
        // Check for Windows encoding, otherwise we are old Mac
        if (i + 1 < text.length && text[i + 1] === '\n') {
          i++;
        }
        lineStartPositions.push(i + 1);
      }
      else if (c === '\n') {
        lineStartPositions.push(i + 1);
      }
    }
    return lineStartPositions;
  }
  exports.getLineStartPositions = getLineStartPositions;
  function getPosition(pos, lineStartPositions) {
    var line = binarySearch(lineStartPositions, pos);
    if (line < 0) {
      var insertionPoint = -1 * line - 1;
      line = insertionPoint - 1;
    }
    return { line: line, column: pos - lineStartPositions[line] };
  }
  exports.getPosition = getPosition;
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
      define(
        'vs/language/yaml/languageservice/parser/scalar-type',
        ["require", "exports"],
        factory
      );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Parse a boolean according to the specification
   * Return: true if its a true value, false if its a false value
   */
  function parseYamlBoolean(input) {
    if (['true', 'True', 'TRUE', 'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',].lastIndexOf(input) >= 0) {
      return true;
    }
    if (['false', 'False', 'FALSE', 'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF',].lastIndexOf(input) >= 0) {
      return false;
    }
    throw "Invalid boolean \"" + input + "\"";
  }
  exports.parseYamlBoolean = parseYamlBoolean;
});

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/utils/arrUtils',
      ["require", "exports"],
      factory
    );
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function removeDuplicates(arr, prop) {
    var new_arr = [];
    var lookup = {};
    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (var i in lookup) {
      new_arr.push(lookup[i]);
    }
    return new_arr;
  }
  exports.removeDuplicates = removeDuplicates;
  function getLineOffsets(textDocString) {
    var lineOffsets = [];
    var text = textDocString;
    var isLineStart = true;
    for (var i = 0; i < text.length; i++) {
      if (isLineStart) {
        lineOffsets.push(i);
        isLineStart = false;
      }
      var ch = text.charAt(i);
      isLineStart = ch === '\r' || ch === '\n';
      if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
          i++;
      }
    }
    if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
    }
    return lineOffsets;
  }
  exports.getLineOffsets = getLineOffsets;

  function removeDuplicatesObj(objArray) {
    var nonDuplicateSet = new Set();
    var nonDuplicateArr = [];
    for (var obj in objArray) {
      var currObj = objArray[obj];
      var stringifiedObj = JSON.stringify(currObj);
      if (!nonDuplicateSet.has(stringifiedObj)) {
        nonDuplicateArr.push(currObj);
        nonDuplicateSet.add(stringifiedObj);
      }
    }
    return nonDuplicateArr;
  }
  exports.removeDuplicatesObj = removeDuplicatesObj;

  function matchOffsetToDocument(offset, jsonDocuments) {
    for (var jsonDoc in jsonDocuments.documents) {
      var currJsonDoc = jsonDocuments.documents[jsonDoc];
      if (currJsonDoc.root &&
        currJsonDoc.root.end >= offset &&
        currJsonDoc.root.start <= offset) {
        return currJsonDoc;
      }
    }
    // TODO: Fix this so that it returns the correct document
    return jsonDocuments.documents[0];
  }
  exports.matchOffsetToDocument = matchOffsetToDocument;

  function matchOffsetToDocument2(offset, jsonDocuments) {
    var e_1, _a;
    try {
      for (var _b = __values(jsonDocuments.documents), _c = _b.next(); !_c.done; _c = _b.next()) {
        var jsonDoc = _c.value;
        if (jsonDoc.root &&
          jsonDoc.root.offset <= offset &&
          jsonDoc.root.length + jsonDoc.root.offset >= offset) {
          return jsonDoc;
        }
      }
    }
    catch (e_1_1) {
      e_1 = { error: e_1_1 };
    }
    finally {
      try {
          if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      }
      finally {
        if (e_1)
          throw e_1.error;
      }
    }
    // TODO: Fix this so that it returns the correct document
    return null;
  }
  exports.matchOffsetToDocument2 = matchOffsetToDocument2;

  function filterInvalidCustomTags(customTags) {
    var validCustomTags = ['mapping', 'scalar', 'sequence'];
    return customTags.filter(function (tag) {
      if (typeof tag === 'string') {
        var typeInfo = tag.split(' ');
        var type = (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar';
        // We need to check if map is a type because map will throw an error within the yaml-ast-parser
        if (type === 'map') {
          return false;
        }
        return validCustomTags.indexOf(type) !== -1;
      }
      return false;
    });
  }
  exports.filterInvalidCustomTags = filterInvalidCustomTags;
});

var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };

  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/parser/yamlParser07',
      [
        "require",
        "exports",
        "./jsonParser07",
        "vscode-nls",
        "../../yaml-ast-parser-custom-tags/index",
        "js-yaml",
        "../utils/documentPositionCalculator",
        "./scalar-type",
        "../utils/arrUtils",
        "vscode-json-languageservice"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Adam Voss. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonParser07_1 = require("./jsonParser07");
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();
  var Yaml = require("../../yaml-ast-parser-custom-tags/index");
  var js_yaml_1 = require("js-yaml");
  var documentPositionCalculator_1 = require("../utils/documentPositionCalculator");
  var scalar_type_1 = require("./scalar-type");
  var arrUtils_1 = require("../utils/arrUtils");
  var vscode_json_languageservice_1 = require("vscode-json-languageservice");
  var SingleYAMLDocument = /** @class */ (function (_super) {
    __extends(SingleYAMLDocument, _super);

    function SingleYAMLDocument(lines) {
      var _this = _super.call(this, null, []) || this;
      _this.lines = lines;
      _this.root = null;
      _this.errors = [];
      _this.warnings = [];
      return _this;
    }

    SingleYAMLDocument.prototype.getSchemas = function (schema, doc, node) {
      var matchingSchemas = [];
      doc.validate(schema, matchingSchemas, node.start);
      return matchingSchemas;
    };
    return SingleYAMLDocument;
  }(jsonParser07_1.JSONDocument));

  exports.SingleYAMLDocument = SingleYAMLDocument;

  function recursivelyBuildAst(parent, node) {
    var e_1, _a, e_2, _b;
    if (!node) {
        return;
    }
    switch (node.kind) {
      case Yaml.Kind.MAP: {
        var instance = node;
        var result = new jsonParser07_1.ObjectASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition);
        try {
          for (var _c = __values(instance.mappings), _d = _c.next(); !_d.done; _d = _c.next()) {
            var mapping = _d.value;
            result.properties.push(recursivelyBuildAst(result, mapping));
          }
        }
        catch (e_1_1) {
          e_1 = { error: e_1_1 };
        }
        finally {
          try {
              if (_d && !_d.done && (_a = _c.return))
              _a.call(_c);
          }
          finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return result;
      }

      case Yaml.Kind.MAPPING: {
        var instance = node;
        var key = instance.key;
        var result = new jsonParser07_1.PropertyASTNodeImpl(parent, instance.startPosition, instance.endPosition - instance.startPosition);
        // Technically, this is an arbitrary node in YAML
        // I doubt we would get a better string representation by parsing it
        var keyNode = new jsonParser07_1.StringASTNodeImpl(result, key.startPosition, key.endPosition - key.startPosition);
        keyNode.value = key.value;
        var valueNode = instance.value
            ? recursivelyBuildAst(result, instance.value)
            : new jsonParser07_1.NullASTNodeImpl(parent, instance.endPosition, 0);
        //valueNode.location = key.value;
        result.keyNode = keyNode;
        result.valueNode = valueNode;
        return result;
      }

      case Yaml.Kind.SEQ: {
        var instance = node;
        var result = new jsonParser07_1.ArrayASTNodeImpl(parent, instance.startPosition, instance.endPosition - instance.startPosition);
        var count = 0;
        try {
          for (var _e = __values(instance.items), _f = _e.next(); !_f.done; _f = _e.next()) {
            var item = _f.value;
            if (item === null && count === instance.items.length - 1) {
              break;
            }
            // Be aware of https://github.com/nodeca/js-yaml/issues/321
            // Cannot simply work around it here because we need to know if we are in Flow or Block
            var itemNode = item === null
                ? new jsonParser07_1.NullASTNodeImpl(parent, instance.endPosition, 0)
                : recursivelyBuildAst(result, item);
            // itemNode.location = count++;
            result.children.push(itemNode);
          }
        }
        catch (e_2_1) {
          e_2 = { error: e_2_1 };
        }
        finally {
          try {
            if (_f && !_f.done && (_b = _e.return))
              _b.call(_e);
          }
          finally {
            if (e_2)
              throw e_2.error;
          }
        }
        return result;
      }

      case Yaml.Kind.SCALAR: {
        var instance = node;
        var type = Yaml.determineScalarType(instance);
        // The name is set either by the sequence or the mapping case.
        var name_1 = null;
        var value = instance.value;
        //This is a patch for redirecting values with these strings to be boolean nodes because its not supported in the parser.
        var possibleBooleanValues = ['y', 'Y', 'yes', 'Yes', 'YES', 'n', 'N', 'no', 'No', 'NO', 'on', 'On', 'ON', 'off', 'Off', 'OFF', ];
        if (instance.plainScalar &&
            possibleBooleanValues.indexOf(value.toString()) !== -1) {
            return new jsonParser07_1.BooleanASTNodeImpl(parent, scalar_type_1.parseYamlBoolean(value), node.startPosition, node.endPosition - node.startPosition);
        }
        switch (type) {
          case Yaml.ScalarType.null: {
            return new jsonParser07_1.StringASTNodeImpl(parent, instance.startPosition, instance.endPosition - instance.startPosition);
          }

          case Yaml.ScalarType.bool: {
            return new jsonParser07_1.BooleanASTNodeImpl(parent, Yaml.parseYamlBoolean(value), node.startPosition, node.endPosition - node.startPosition);
          }

          case Yaml.ScalarType.int: {
            var result = new jsonParser07_1.NumberASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition);
            result.value = Yaml.parseYamlInteger(value);
            result.isInteger = true;
            return result;
          }

          case Yaml.ScalarType.float: {
            var result = new jsonParser07_1.NumberASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition);
            result.value = Yaml.parseYamlFloat(value);
            result.isInteger = false;
            return result;
          }

          case Yaml.ScalarType.string: {
            var result = new jsonParser07_1.StringASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition);
            result.value = node.value;
            return result;
          }
        }
        break;
      }
        
      case Yaml.Kind.ANCHOR_REF: {
        var instance = node.value;
        return (recursivelyBuildAst(parent, instance) ||
            new jsonParser07_1.NullASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition));
      }
      case Yaml.Kind.INCLUDE_REF: {
        var result = new jsonParser07_1.StringASTNodeImpl(parent, node.startPosition, node.endPosition - node.startPosition);
        result.value = node.value;
        return result;
      }
    }
  }

  function convertError(e) {
    var line = e.mark.line === 0 ? 0 : e.mark.line - 1;
    var character = e.mark.position + e.mark.column === 0
        ? 0 : e.mark.position + e.mark.column - 1;
    return {
      message: "" + e.reason,
      range: {
        start: {
          line: line,
          character: character,
        },
        end: {
          line: line,
          character: character,
        },
      },
      severity: 2,
    };
  }

  function createJSONDocument(yamlDoc, startPositions, text) {
    var _doc = new SingleYAMLDocument(startPositions);
    _doc.root = recursivelyBuildAst(null, yamlDoc);
    if (!_doc.root) {
      // TODO: When this is true, consider not pushing the other errors.
      _doc.errors.push({
        message: localize('Invalid symbol', 'Expected a YAML object, array or literal'),
        code: vscode_json_languageservice_1.ErrorCode.Undefined,
        location: { start: yamlDoc.startPosition, end: yamlDoc.endPosition },
      });
    }

    var duplicateKeyReason = 'duplicate key';
    //Patch ontop of yaml-ast-parser to disable duplicate key message on merge key
    var isDuplicateAndNotMergeKey = function (error, yamlText) {
      var errorConverted = convertError(error);
      var errorStart = errorConverted.range.start.character;
      var errorEnd = errorConverted.range.end.character;
      if (error.reason === duplicateKeyReason &&
        yamlText.substring(errorStart, errorEnd).startsWith('<<')) {
        return false;
      }
      return true;
    };

    var errors = yamlDoc.errors
        .filter(function (e) { return e.reason !== duplicateKeyReason && !e.isWarning; })
        .map(function (e) { return convertError(e); });

    var warnings = yamlDoc.errors
        .filter(function (e) {
        return (e.reason === duplicateKeyReason &&
            isDuplicateAndNotMergeKey(e, text)) ||
            e.isWarning;
    }).map(function (e) { return convertError(e); });
    errors.forEach(function (e) { return _doc.errors.push(e); });
    warnings.forEach(function (e) { return _doc.warnings.push(e); });
    return _doc;
  }

  var YAMLDocument = /** @class */ (function () {
    function YAMLDocument(documents) {
        this.documents = documents;
        this.errors = [];
        this.warnings = [];
    }
    return YAMLDocument;
  }());
  exports.YAMLDocument = YAMLDocument;
  
  function parse(text, customTags) {
    if (customTags === void 0) { customTags = []; }
    var startPositions = documentPositionCalculator_1.getLineStartPositions(text);
    // This is documented to return a YAMLNode even though the
    // typing only returns a YAMLDocument
    var yamlDocs = [];
    var filteredTags = arrUtils_1.filterInvalidCustomTags(customTags);
    var schemaWithAdditionalTags = js_yaml_1.Schema.create(filteredTags.map(function (tag) {
        var typeInfo = tag.split(' ');
        return new js_yaml_1.Type(typeInfo[0], {
          kind: (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar',
        });
    }));

    /**
     * Collect the additional tags into a map of string to possible tag types
     */
    var tagWithAdditionalItems = new Map();
    filteredTags.forEach(function (tag) {
      var typeInfo = tag.split(' ');
      var tagName = typeInfo[0];
      var tagType = (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar';
      if (tagWithAdditionalItems.has(tagName)) {
        tagWithAdditionalItems.set(tagName, tagWithAdditionalItems.get(tagName).concat([tagType]));
      }
      else {
        tagWithAdditionalItems.set(tagName, [tagType]);
      }
    });

    tagWithAdditionalItems.forEach(function (additionalTagKinds, key) {
      var newTagType = new js_yaml_1.Type(key, {
          kind: additionalTagKinds[0] || 'scalar',
      });
      newTagType.additionalKinds = additionalTagKinds;
      schemaWithAdditionalTags.compiledTypeMap[key] = newTagType;
    });
    var additionalOptions = {
      schema: schemaWithAdditionalTags,
    };
    Yaml.loadAll(text, function (doc) { return yamlDocs.push(doc); }, additionalOptions);
    return new YAMLDocument(yamlDocs.map(function (doc) { return createJSONDocument(doc, startPositions, text); }));
  }
  exports.parse = parse;
});

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/services/documentSymbols',
      [
        "require",
        "exports",
        "../parser/yamlParser07",
        "vscode-json-languageservice/lib/umd/services/jsonDocumentSymbols"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var yamlParser07_1 = require("../parser/yamlParser07");
  var jsonDocumentSymbols_1 = require("vscode-json-languageservice/lib/umd/services/jsonDocumentSymbols");
  var YAMLDocumentSymbols = /** @class */ (function () {
    function YAMLDocumentSymbols(schemaService) {
      this.jsonDocumentSymbols = new jsonDocumentSymbols_1.JSONDocumentSymbols(schemaService);
    }

    YAMLDocumentSymbols.prototype.findDocumentSymbols = function (document) {
      var e_1, _a;
      var doc = yamlParser07_1.parse(document.getText());
      if (!doc || doc['documents'].length === 0) {
        return null;
      }
      var results = [];
      try {
        for (var _b = __values(doc['documents']), _c = _b.next(); !_c.done; _c = _b.next()) {
            var yamlDoc = _c.value;
            if (yamlDoc.root) {
                results = results.concat(this.jsonDocumentSymbols.findDocumentSymbols(document, yamlDoc));
            }
        }
      }
      catch (e_1_1) {
        e_1 = { error: e_1_1 };
      }
      finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        }
        finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return results;
    };

    YAMLDocumentSymbols.prototype.findHierarchicalDocumentSymbols = function (document) {
      var e_2, _a;
      var doc = yamlParser07_1.parse(document.getText());
      if (!doc || doc['documents'].length === 0) {
          return null;
      }
      var results = [];
      try {
        for (var _b = __values(doc['documents']), _c = _b.next(); !_c.done; _c = _b.next()) {
          var yamlDoc = _c.value;
          if (yamlDoc.root) {
              results = results.concat(this.jsonDocumentSymbols.findDocumentSymbols2(document, yamlDoc));
          }
        }
      }
      catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      }
      finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        }
        finally {
          if (e_2)
            throw e_2.error;
        }
      }
      return results;
    };

    return YAMLDocumentSymbols;
  }());

  exports.YAMLDocumentSymbols = YAMLDocumentSymbols;
});

var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = (this && this.__read) || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  }
  catch (error) {
    e = { error: error };
  }
  finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    }
    finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};

var __spread = (this && this.__spread) || function () {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/parser/jsonParser04',
      [
        "require",
        "exports",
        "../utils/objects",
        "vscode-nls"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var objects = require("../utils/objects");
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();

  var ErrorCode;
  (function (ErrorCode) {
      ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
      ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
      ErrorCode[ErrorCode["CommentsNotAllowed"] = 2] = "CommentsNotAllowed";
  })(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

  var ProblemSeverity;
  (function (ProblemSeverity) {
    ProblemSeverity[ProblemSeverity["Error"] = 0] = "Error";
    ProblemSeverity[ProblemSeverity["Warning"] = 1] = "Warning";
  })(ProblemSeverity = exports.ProblemSeverity || (exports.ProblemSeverity = {}));

  var ASTNode = /** @class */ (function () {
    function ASTNode(parent, type, location, start, end) {
      this.type = type;
      this.location = location;
      this.start = start;
      this.end = end;
      this.parent = parent;
      this.parserSettings = {
        isKubernetes: false,
      };
    }

    ASTNode.prototype.setParserSettings = function (parserSettings) {
      this.parserSettings = parserSettings;
    };

    ASTNode.prototype.getPath = function () {
      var path = this.parent ? this.parent.getPath() : [];
      if (this.location !== null) {
        path.push(this.location);
      }
      return path;
    };

    ASTNode.prototype.getChildNodes = function () {
      return [];
    };

    ASTNode.prototype.getLastChild = function () {
      return null;
    };

    // tslint:disable-next-line: no-any
    ASTNode.prototype.getValue = function () {
      // override in children
      return;
    };

    ASTNode.prototype.contains = function (offset, includeRightBound) {
      if (includeRightBound === void 0) { includeRightBound = false; }
      return ((offset >= this.start && offset < this.end) ||
        (includeRightBound && offset === this.end));
    };

    ASTNode.prototype.toString = function () {
      return ('type: ' + this.type + ' (' + this.start + '/' + this.end + ')' +
          (this.parent ? ' parent: {' + this.parent.toString() + '}' : ''));
    };

    ASTNode.prototype.visit = function (visitor) {
      return visitor(this);
    };

    ASTNode.prototype.getNodeFromOffset = function (offset) {
      var findNode = function (node) {
        if (offset >= node.start && offset < node.end) {
          var children = node.getChildNodes();
          for (var i = 0; i < children.length && children[i].start <= offset; i++) {
            var item = findNode(children[i]);
            if (item) {
              return item;
            }
          }
          return node;
        }
        return null;
      };
      return findNode(this);
    };

    ASTNode.prototype.getNodeCollectorCount = function (offset) {
      var collector = [];
      var findNode = function (node) {
        var children = node.getChildNodes();
        for (var i = 0; i < children.length; i++) {
          var item = findNode(children[i]);
          if (item && item.type === 'property') {
            collector.push(item);
          }
        }
        return node;
      };
      var foundNode = findNode(this);
      return collector.length;
    };

    ASTNode.prototype.getNodeFromOffsetEndInclusive = function (offset) {
      var collector = [];
      var findNode = function (node) {
        if (offset >= node.start && offset <= node.end) {
          var children = node.getChildNodes();
          for (var i = 0; i < children.length && children[i].start <= offset; i++) {
            var item = findNode(children[i]);
            if (item) {
              collector.push(item);
            }
          }
          return node;
        }
        return null;
      };
      var foundNode = findNode(this);
      var currMinDist = Number.MAX_VALUE;
      var currMinNode = null;
      for (var possibleNode in collector) {
        var currNode = collector[possibleNode];
        var minDist = currNode.end - offset + (offset - currNode.start);
        if (minDist < currMinDist) {
          currMinNode = currNode;
          currMinDist = minDist;
        }
      }
      return currMinNode || foundNode;
    };

    ASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
      var e_1, _a;
      var _this = this;
      if (!matchingSchemas.include(this)) {
        return;
      }

      if (Array.isArray(schema.type)) {
        if (schema.type.indexOf(this.type) === -1) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: schema.errorMessage ||
                localize('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', schema.type.join(', ')),
          });
        }
      }
      else if (schema.type) {
        if (this.type !== schema.type) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: schema.errorMessage ||
                localize('typeMismatchWarning', 'Incorrect type. Expected "{0}".', schema.type),
          });
        }
      }

      if (Array.isArray(schema.allOf)) {
        schema.allOf.forEach(function (subSchema) {
          _this.validate(subSchema, validationResult, matchingSchemas);
        });
      }

      if (schema.not) {
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        this.validate(schema.not, subValidationResult, subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: localize('notSchemaWarning', 'Matches a schema that is not allowed.'),
          });
        }
        subMatchingSchemas.schemas.forEach(function (ms) {
          ms.inverted = !ms.inverted;
          matchingSchemas.add(ms);
        });
      }
      var testAlternatives = function (alternatives, maxOneMatch) {
        var matches = [];
        // remember the best match that is used for error messages
        var bestMatch = null;
        alternatives.forEach(function (subSchema) {
          var subValidationResult = new ValidationResult();
          var subMatchingSchemas = matchingSchemas.newSub();
          _this.validate(subSchema, subValidationResult, subMatchingSchemas);
          if (!subValidationResult.hasProblems()) {
            matches.push(subSchema);
          }
          if (!bestMatch) {
            bestMatch = {
              schema: subSchema,
              validationResult: subValidationResult,
              matchingSchemas: subMatchingSchemas,
            };
          }
          else if (_this.parserSettings.isKubernetes) {
            bestMatch = alternativeComparison(subValidationResult, bestMatch, subSchema, subMatchingSchemas);
          }
          else {
            bestMatch = genericComparison(maxOneMatch, subValidationResult, bestMatch, subSchema, subMatchingSchemas);
          }
        });
        if (matches.length > 1 &&
          maxOneMatch &&
          !_this.parserSettings.isKubernetes) {
          validationResult.problems.push({
            location: { start: _this.start, end: _this.start + 1 },
            severity: ProblemSeverity.Warning,
            message: localize('oneOfWarning', 'Matches multiple schemas when only one must validate.'),
          });
        }
        if (bestMatch !== null) {
          validationResult.merge(bestMatch.validationResult);
          validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
          validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
          matchingSchemas.merge(bestMatch.matchingSchemas);
        }
        return matches.length;
      };

      if (Array.isArray(schema.anyOf)) {
        testAlternatives(schema.anyOf, false);
      }

      if (Array.isArray(schema.oneOf)) {
        testAlternatives(schema.oneOf, true);
      }

      if (Array.isArray(schema.enum)) {
        var val = this.getValue();
        var enumValueMatch = false;
        try {
          for (var _b = __values(schema.enum), _c = _b.next(); !_c.done; _c = _b.next()) {
            var e = _c.value;
            if (objects.equals(val, e)) {
              enumValueMatch = true;
              break;
            }
          }
        }
        catch (e_1_1) {
          e_1 = { error: e_1_1 };
        }
        finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          }
          finally {
            if (e_1)
              throw e_1.error;
          }
        }
        validationResult.enumValues = schema.enum;
        validationResult.enumValueMatch = enumValueMatch;
        if (!enumValueMatch) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            code: ErrorCode.EnumValueMismatch,
            message: schema.errorMessage ||
                localize('enumWarning', 'Value is not accepted. Valid values: {0}.', schema.enum.map(function (v) { return JSON.stringify(v); }).join(', ')),
          });
        }
      }

      if (schema.deprecationMessage && this.parent) {
        validationResult.problems.push({
          location: { start: this.parent.start, end: this.parent.end },
          severity: ProblemSeverity.Warning,
          message: schema.deprecationMessage,
        });
      }
      matchingSchemas.add({ node: this, schema: schema });
    };
    return ASTNode;
  }());
  exports.ASTNode = ASTNode;

  var NullASTNode = /** @class */ (function (_super) {
    __extends(NullASTNode, _super);
    function NullASTNode(parent, name, start, end) {
      return _super.call(this, parent, 'null', name, start, end) || this;
    }
    // tslint:disable-next-line: no-any
    NullASTNode.prototype.getValue = function () {
      return null;
    };
    return NullASTNode;
  }(ASTNode));
  exports.NullASTNode = NullASTNode;

  var BooleanASTNode = /** @class */ (function (_super) {
    __extends(BooleanASTNode, _super);
    function BooleanASTNode(parent, name, value, start, end) {
      var _this = _super.call(this, parent, 'boolean', name, start, end) || this;
      _this.value = value;
      return _this;
    }
    // tslint:disable-next-line: no-any
    BooleanASTNode.prototype.getValue = function () {
      return this.value;
    };
    return BooleanASTNode;
  }(ASTNode));
  exports.BooleanASTNode = BooleanASTNode;

  var ArrayASTNode = /** @class */ (function (_super) {
    __extends(ArrayASTNode, _super);
    function ArrayASTNode(parent, name, start, end) {
      var _this = _super.call(this, parent, 'array', name, start, end) || this;
      _this.items = [];
      return _this;
    }

    ArrayASTNode.prototype.getChildNodes = function () {
      return this.items;
    };

    ArrayASTNode.prototype.getLastChild = function () {
      return this.items[this.items.length - 1];
    };

    // tslint:disable-next-line: no-any
    ArrayASTNode.prototype.getValue = function () {
      return this.items.map(function (v) { return v.getValue(); });
    };

    ArrayASTNode.prototype.addItem = function (item) {
      if (item) {
        this.items.push(item);
        return true;
      }
      return false;
    };

    ArrayASTNode.prototype.visit = function (visitor) {
      var ctn = visitor(this);
      for (var i = 0; i < this.items.length && ctn; i++) {
        ctn = this.items[i].visit(visitor);
      }
      return ctn;
    };

    ArrayASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
      var _this = this;
      if (!matchingSchemas.include(this)) {
          return;
      }
      _super.prototype.validate.call(this, schema, validationResult, matchingSchemas);
      if (Array.isArray(schema.items)) {
        var subSchemas_1 = schema.items;
        subSchemas_1.forEach(function (subSchema, index) {
          var itemValidationResult = new ValidationResult();
          var item = _this.items[index];
          if (item) {
            item.validate(subSchema, itemValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(itemValidationResult);
          }
          else if (_this.items.length >= subSchemas_1.length) {
            validationResult.propertiesValueMatches++;
          }
        });
        if (this.items.length > subSchemas_1.length) {
          if (typeof schema.additionalItems === 'object') {
            for (var i = subSchemas_1.length; i < this.items.length; i++) {
              var itemValidationResult = new ValidationResult();
              // tslint:disable-next-line: no-any
              this.items[i].validate(schema.additionalItems, itemValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(itemValidationResult);
            }
          }
          else if (schema.additionalItems === false) {
            validationResult.problems.push({
              location: { start: this.start, end: this.end },
              severity: ProblemSeverity.Warning,
              message: localize('additionalItemsWarning', 'Array has too many items according to schema. Expected {0} or fewer.', subSchemas_1.length),
            });
          }
        }
      }
      else if (schema.items) {
        this.items.forEach(function (item) {
          var itemValidationResult = new ValidationResult();
          item.validate(schema.items, itemValidationResult, matchingSchemas);
          validationResult.mergePropertyMatch(itemValidationResult);
        });
      }

      if (schema.minItems && this.items.length < schema.minItems) {
        validationResult.problems.push({
          location: { start: this.start, end: this.end },
          severity: ProblemSeverity.Warning,
          message: localize('minItemsWarning', 'Array has too few items. Expected {0} or more.', schema.minItems),
        });
      }

      if (schema.maxItems && this.items.length > schema.maxItems) {
        validationResult.problems.push({
          location: { start: this.start, end: this.end },
          severity: ProblemSeverity.Warning,
          message: localize('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', schema.minItems),
        });
      }

      if (schema.uniqueItems === true) {
        var values_1 = this.items.map(function (node) { return node.getValue(); });
        var duplicates = values_1.some(function (value, index) { return index !== values_1.lastIndexOf(value); });
        if (duplicates) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: localize('uniqueItemsWarning', 'Array has duplicate items.'),
          });
        }
      }
    };
    return ArrayASTNode;
  }(ASTNode));
  exports.ArrayASTNode = ArrayASTNode;

  var NumberASTNode = /** @class */ (function (_super) {
    __extends(NumberASTNode, _super);
    function NumberASTNode(parent, name, start, end) {
      var _this = _super.call(this, parent, 'number', name, start, end) || this;
      _this.isInteger = true;
      _this.value = Number.NaN;
      return _this;
    }
    // tslint:disable-next-line: no-any
    NumberASTNode.prototype.getValue = function () {
      return this.value;
    };

    NumberASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
      if (!matchingSchemas.include(this)) {
        return;
      }
      // work around type validation in the base class
      var typeIsInteger = false;
      if (schema.type === 'integer' ||
        (Array.isArray(schema.type) && schema.type.indexOf('integer') !== -1)) {
        typeIsInteger = true;
      }
      if (typeIsInteger && this.isInteger === true) {
        this.type = 'integer';
      }
      _super.prototype.validate.call(this, schema, validationResult, matchingSchemas);
      this.type = 'number';
      var val = this.getValue();
      if (typeof schema.multipleOf === 'number') {
        if (val % schema.multipleOf !== 0) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: localize('multipleOfWarning', 'Value is not divisible by {0}.', schema.multipleOf),
          });
        }
      }
      if (typeof schema.minimum === 'number') {
        if (schema.exclusiveMinimum && val <= schema.minimum) {
          validationResult.problems.push({
              location: { start: this.start, end: this.end },
              severity: ProblemSeverity.Warning,
              message: localize('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', schema.minimum),
          });
        }
        if (!schema.exclusiveMinimum && val < schema.minimum) {
          validationResult.problems.push({
              location: { start: this.start, end: this.end },
              severity: ProblemSeverity.Warning,
              message: localize('minimumWarning', 'Value is below the minimum of {0}.', schema.minimum),
          });
        }
      }
      if (typeof schema.maximum === 'number') {
        if (schema.exclusiveMaximum && val >= schema.maximum) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: localize('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', schema.maximum),
          });
        }
        if (!schema.exclusiveMaximum && val > schema.maximum) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: localize('maximumWarning', 'Value is above the maximum of {0}.', schema.maximum),
          });
        }
      }
    };
    return NumberASTNode;
  }(ASTNode));
  exports.NumberASTNode = NumberASTNode;

  var StringASTNode = /** @class */ (function (_super) {
    __extends(StringASTNode, _super);

    function StringASTNode(parent, name, isKey, start, end) {
      var _this = _super.call(this, parent, 'string', name, start, end) || this;
      _this.isKey = isKey;
      _this.value = '';
      return _this;
    }

    // tslint:disable-next-line: no-any
    StringASTNode.prototype.getValue = function () {
      return this.value;
    };

    StringASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
      if (!matchingSchemas.include(this)) {
        return;
      }
      _super.prototype.validate.call(this, schema, validationResult, matchingSchemas);
      if (schema.minLength && this.value.length < schema.minLength) {
        validationResult.problems.push({
          location: { start: this.start, end: this.end },
          severity: ProblemSeverity.Warning,
          message: localize('minLengthWarning', 'String is shorter than the minimum length of {0}.', schema.minLength),
        });
      }
      if (schema.maxLength && this.value.length > schema.maxLength) {
        validationResult.problems.push({
          location: { start: this.start, end: this.end },
          severity: ProblemSeverity.Warning,
          message: localize('maxLengthWarning', 'String is longer than the maximum length of {0}.', schema.maxLength),
        });
      }
      if (schema.pattern) {
        var regex = new RegExp(schema.pattern);
        if (!regex.test(this.value)) {
          validationResult.problems.push({
            location: { start: this.start, end: this.end },
            severity: ProblemSeverity.Warning,
            message: schema.patternErrorMessage ||
              schema.errorMessage ||
              localize('patternWarning', 'String does not match the pattern of "{0}".', schema.pattern),
          });
        }
      }
    };
    return StringASTNode;
  }(ASTNode));
  exports.StringASTNode = StringASTNode;

  var PropertyASTNode = /** @class */ (function (_super) {
    __extends(PropertyASTNode, _super);
    function PropertyASTNode(parent, key) {
      var _this = _super.call(this, parent, 'property', null, key.start) || this;
      _this.key = key;
      key.parent = _this;
      key.location = key.value;
      _this.colonOffset = -1;
      return _this;
    }

    PropertyASTNode.prototype.getChildNodes = function () {
      return this.value ? [this.key, this.value] : [this.key];
    };

    PropertyASTNode.prototype.getLastChild = function () {
      return this.value;
    };
    PropertyASTNode.prototype.setValue = function (value) {
      this.value = value;
      return value !== null;
    };
    PropertyASTNode.prototype.visit = function (visitor) {
      return (visitor(this) &&
          this.key.visit(visitor) &&
          this.value &&
          this.value.visit(visitor));
    };
    PropertyASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
      if (!matchingSchemas.include(this)) {
        return;
      }
      if (this.value) {
        this.value.validate(schema, validationResult, matchingSchemas);
      }
    };
    return PropertyASTNode;
  }(ASTNode));
  exports.PropertyASTNode = PropertyASTNode;

  var ObjectASTNode = /** @class */ (function (_super) {
      __extends(ObjectASTNode, _super);
      function ObjectASTNode(parent, name, start, end) {
        var _this = _super.call(this, parent, 'object', name, start, end) || this;
        _this.properties = [];
        return _this;
      }

      ObjectASTNode.prototype.getChildNodes = function () {
        return this.properties;
      };

      ObjectASTNode.prototype.getLastChild = function () {
        return this.properties[this.properties.length - 1];
      };

      ObjectASTNode.prototype.addProperty = function (node) {
        if (!node) {
            return false;
        }
        this.properties.push(node);
        return true;
      };

      ObjectASTNode.prototype.getFirstProperty = function (key) {
        for (var i = 0; i < this.properties.length; i++) {
          if (this.properties[i].key.value === key) {
            return this.properties[i];
          }
        }
        return null;
      };

      ObjectASTNode.prototype.getKeyList = function () {
        return this.properties.map(function (p) { return p.key.getValue(); });
      };

      // tslint:disable-next-line: no-any
      ObjectASTNode.prototype.getValue = function () {
        // tslint:disable-next-line: no-any
        var value = Object.create(null);
        this.properties.forEach(function (p) {
          var v = p.value && p.value.getValue();
          if (typeof v !== 'undefined') {
            value[p.key.getValue()] = v;
          }
        });
        return value;
      };

      ObjectASTNode.prototype.visit = function (visitor) {
        var ctn = visitor(this);
        for (var i = 0; i < this.properties.length && ctn; i++) {
          ctn = this.properties[i].visit(visitor);
        }
        return ctn;
      };

      ObjectASTNode.prototype.validate = function (schema, validationResult, matchingSchemas) {
        var _this = this;
        if (!matchingSchemas.include(this)) {
          return;
        }
        _super.prototype.validate.call(this, schema, validationResult, matchingSchemas);
        var seenKeys = Object.create(null);
        var unprocessedProperties = [];
        this.properties.forEach(function (node) {
          var key = node.key.value;
          //Replace the merge key with the actual values of what the node value points to in seen keys
          if (key === '<<' && node.value) {
            switch (node.value.type) {
              case 'object': {
                node.value['properties'].forEach(function (propASTNode) {
                  var propKey = propASTNode.key.value;
                  seenKeys[propKey] = propASTNode.value;
                  unprocessedProperties.push(propKey);
                });
                break;
              }
              case 'array': {
                node.value['items'].forEach(function (sequenceNode) {
                  sequenceNode['properties'].forEach(function (propASTNode) {
                    var seqKey = propASTNode.key.value;
                    seenKeys[seqKey] = propASTNode.value;
                    unprocessedProperties.push(seqKey);
                  });
                });
                break;
              }
              default: {
                break;
              }
            }
          }
          else {
            seenKeys[key] = node.value;
            unprocessedProperties.push(key);
          }
        });

        if (Array.isArray(schema.required)) {
          schema.required.forEach(function (propertyName) {
            if (!seenKeys[propertyName]) {
              var key = _this.parent && _this.parent && _this.parent.key;
              var location_1 = key
                  ? { start: key.start, end: key.end }
                  : { start: _this.start, end: _this.start + 1 };
              validationResult.problems.push({
                  location: location_1,
                  severity: ProblemSeverity.Warning,
                  message: localize('MissingRequiredPropWarning', 'Missing property "{0}".', propertyName),
              });
            }
          });
        }

        var propertyProcessed = function (prop) {
          var index = unprocessedProperties.indexOf(prop);
          while (index >= 0) {
            unprocessedProperties.splice(index, 1);
            index = unprocessedProperties.indexOf(prop);
          }
        };

        if (schema.properties) {
          Object.keys(schema.properties).forEach(function (propertyName) {
            propertyProcessed(propertyName);
            var prop = schema.properties[propertyName];
            var child = seenKeys[propertyName];
            if (child) {
              var propertyValidationResult = new ValidationResult();
              child.validate(prop, propertyValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          });
        }

        if (schema.patternProperties) {
          Object.keys(schema.patternProperties).forEach(function (propertyPattern) {
            var regex = new RegExp(propertyPattern);
            unprocessedProperties.slice(0).forEach(function (propertyName) {
              if (regex.test(propertyName)) {
                propertyProcessed(propertyName);
                var child = seenKeys[propertyName];
                if (child) {
                  var propertyValidationResult = new ValidationResult();
                  child.validate(schema.patternProperties[propertyPattern], propertyValidationResult, matchingSchemas);
                  validationResult.mergePropertyMatch(propertyValidationResult);
                }
              }
            });
          });
        }

        if (typeof schema.additionalProperties === 'object') {
          unprocessedProperties.forEach(function (propertyName) {
            var child = seenKeys[propertyName];
            if (child) {
              var propertyValidationResult = new ValidationResult();
              // tslint:disable-next-line: no-any
              child.validate(schema.additionalProperties, propertyValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          });
        }
        else if (schema.additionalProperties === false) {
          if (unprocessedProperties.length > 0) {
            unprocessedProperties.forEach(function (propertyName) {
              var child = seenKeys[propertyName];
              if (child) {
                var propertyNode = null;
                if (child.type !== 'property') {
                  propertyNode = child.parent;
                  if (propertyNode.type === 'object') {
                    propertyNode = propertyNode.properties[0];
                  }
                }
                else {
                  propertyNode = child;
                }
                validationResult.problems.push({
                  location: {
                      start: propertyNode.key.start,
                      end: propertyNode.key.end,
                  },
                  severity: ProblemSeverity.Warning,
                  message: schema.errorMessage ||
                      localize('DisallowedExtraPropWarning', 'Unexpected property {0}', propertyName),
                });
              }
            });
          }
        }

        if (schema.maxProperties) {
          if (this.properties.length > schema.maxProperties) {
            validationResult.problems.push({
              location: { start: this.start, end: this.end },
              severity: ProblemSeverity.Warning,
              message: localize('MaxPropWarning', 'Object has more properties than limit of {0}.', schema.maxProperties),
            });
          }
        }

        if (schema.minProperties) {
          if (this.properties.length < schema.minProperties) {
            validationResult.problems.push({
              location: { start: this.start, end: this.end },
              severity: ProblemSeverity.Warning,
              message: localize('MinPropWarning', 'Object has fewer properties than the required number of {0}', schema.minProperties),
            });
          }
        }

        if (schema.dependencies) {
          Object.keys(schema.dependencies).forEach(function (key) {
            var prop = seenKeys[key];
            if (prop) {
              var propertyDep = schema.dependencies[key];
              if (Array.isArray(propertyDep)) {
                propertyDep.forEach(function (requiredProp) {
                  if (!seenKeys[requiredProp]) {
                    validationResult.problems.push({
                      location: {
                        start: _this.start,
                        end: _this.end
                      },
                      severity: ProblemSeverity.Warning,
                      message: localize('RequiredDependentPropWarning',
                                        'Object is missing property {0} required by property {1}.',
                                        requiredProp, key),
                    });
                  }
                  else {
                    validationResult.propertiesValueMatches++;
                  }
                });
              }
              else if (propertyDep) {
                var propertyvalidationResult = new ValidationResult();
                _this.validate(propertyDep, propertyvalidationResult, matchingSchemas);
                validationResult.mergePropertyMatch(propertyvalidationResult);
              }
            }
          });
        }
      };
      return ObjectASTNode;
  }(ASTNode));
  exports.ObjectASTNode = ObjectASTNode;
  var EnumMatch;
  (function (EnumMatch) {
    EnumMatch[EnumMatch["Key"] = 0] = "Key";
    EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
  })(EnumMatch = exports.EnumMatch || (exports.EnumMatch = {}));

  var SchemaCollector = /** @class */ (function () {
    function SchemaCollector(focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      this.focusOffset = focusOffset;
      this.exclude = exclude;
      this.schemas = [];
    }

    SchemaCollector.prototype.add = function (schema) {
      this.schemas.push(schema);
    };

    SchemaCollector.prototype.merge = function (other) {
      var _a;
      (_a = this.schemas).push.apply(_a, __spread(other.schemas));
    };

    SchemaCollector.prototype.include = function (node) {
      return ((this.focusOffset === -1 || node.contains(this.focusOffset)) &&
          node !== this.exclude);
    };

    SchemaCollector.prototype.newSub = function () {
      return new SchemaCollector(-1, this.exclude);
    };
    return SchemaCollector;
  }());

  var NoOpSchemaCollector = /** @class */ (function () {
    function NoOpSchemaCollector() {}

    Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
      get: function () {
          return [];
      },
      enumerable: true,
      configurable: true
    });
    NoOpSchemaCollector.prototype.add = function (schema) { };
    NoOpSchemaCollector.prototype.merge = function (other) { };
    NoOpSchemaCollector.prototype.include = function (node) {
      return true;
    };
    NoOpSchemaCollector.prototype.newSub = function () {
      return this;
    };
    return NoOpSchemaCollector;
  }());

  var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
      this.problems = [];
      this.propertiesMatches = 0;
      this.propertiesValueMatches = 0;
      this.primaryValueMatches = 0;
      this.enumValueMatch = false;
      this.enumValues = null;
      this.warnings = [];
      this.errors = [];
    }

    ValidationResult.prototype.hasProblems = function () {
      return !!this.problems.length;
    };

    ValidationResult.prototype.mergeAll = function (validationResults) {
      var _this = this;
      validationResults.forEach(function (validationResult) {
        _this.merge(validationResult);
      });
    };

    ValidationResult.prototype.merge = function (validationResult) {
      this.problems = this.problems.concat(validationResult.problems);
    };

    ValidationResult.prototype.mergeEnumValues = function (validationResult) {
      var e_2, _a;
      if (!this.enumValueMatch &&
          !validationResult.enumValueMatch &&
          this.enumValues &&
          validationResult.enumValues) {
        this.enumValues = this.enumValues.concat(validationResult.enumValues);
        try {
          for (var _b = __values(this.problems), _c = _b.next(); !_c.done; _c = _b.next()) {
            var error = _c.value;
            if (error.code === ErrorCode.EnumValueMismatch) {
                error.message = localize('enumWarning', 'Value is not accepted. Valid values: {0}.',
                                         this.enumValues.map(function (v) { return JSON.stringify(v); }).join(', '));
            }
          }
        }
        catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        }
        finally {
          try {
              if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          }
          finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
    };

    ValidationResult.prototype.mergePropertyMatch = function (propertyValidationResult) {
      this.merge(propertyValidationResult);
      this.propertiesMatches++;
      if (propertyValidationResult.enumValueMatch ||
          (!this.hasProblems() && propertyValidationResult.propertiesMatches)) {
        this.propertiesValueMatches++;
      }
      if (propertyValidationResult.enumValueMatch &&
          propertyValidationResult.enumValues) {
        this.primaryValueMatches++;
      }
    };

    ValidationResult.prototype.compareGeneric = function (other) {
      var hasProblems = this.hasProblems();
      if (hasProblems !== other.hasProblems()) {
          return hasProblems ? -1 : 1;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
          return other.enumValueMatch ? -1 : 1;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };

    ValidationResult.prototype.compareKubernetes = function (other) {
      var hasProblems = this.hasProblems();
      if (this.propertiesMatches !== other.propertiesMatches) {
        return this.propertiesMatches - other.propertiesMatches;
      }
      if (this.enumValueMatch !== other.enumValueMatch) {
        return other.enumValueMatch ? -1 : 1;
      }
      if (this.primaryValueMatches !== other.primaryValueMatches) {
        return this.primaryValueMatches - other.primaryValueMatches;
      }
      if (this.propertiesValueMatches !== other.propertiesValueMatches) {
        return this.propertiesValueMatches - other.propertiesValueMatches;
      }
      if (hasProblems !== other.hasProblems()) {
        return hasProblems ? -1 : 1;
      }
      return this.propertiesMatches - other.propertiesMatches;
    };
    return ValidationResult;
  }());
  exports.ValidationResult = ValidationResult;

  var JSONDocument = /** @class */ (function () {
    function JSONDocument(root, syntaxErrors) {
      this.root = root;
      this.syntaxErrors = syntaxErrors;
    }

    JSONDocument.prototype.getNodeFromOffset = function (offset) {
      return this.root && this.root.getNodeFromOffset(offset);
    };

    JSONDocument.prototype.getNodeFromOffsetEndInclusive = function (offset) {
      return this.root && this.root.getNodeFromOffsetEndInclusive(offset);
    };

    JSONDocument.prototype.visit = function (visitor) {
      if (this.root) {
        this.root.visit(visitor);
      }
    };

    JSONDocument.prototype.configureSettings = function (parserSettings) {
      if (this.root) {
        this.root.setParserSettings(parserSettings);
      }
    };

    JSONDocument.prototype.validate = function (schema) {
      if (this.root && schema) {
        var validationResult = new ValidationResult();
        this.root.validate(schema, validationResult, new NoOpSchemaCollector());
        return validationResult.problems;
      }
      return null;
    };

    JSONDocument.prototype.getMatchingSchemas = function (schema, focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      var matchingSchemas = new SchemaCollector(focusOffset, exclude);
      var validationResult = new ValidationResult();
      if (this.root && schema) {
        this.root.validate(schema, validationResult, matchingSchemas);
      }
      return matchingSchemas.schemas;
    };

    JSONDocument.prototype.getValidationProblems = function (schema, focusOffset, exclude) {
      if (focusOffset === void 0) {
        focusOffset = -1;
      }
      if (exclude === void 0) {
        exclude = null;
      }
      var matchingSchemas = new SchemaCollector(focusOffset, exclude);
      var validationResult = new ValidationResult();
      if (this.root && schema) {
        this.root.validate(schema, validationResult, matchingSchemas);
      }
      return validationResult.problems;
    };
    return JSONDocument;
  }());
  exports.JSONDocument = JSONDocument;

  //Alternative comparison is specifically used by the kubernetes/openshift schema but may lead to better results then genericComparison depending on the schema
  function alternativeComparison(subValidationResult, bestMatch, subSchema, subMatchingSchemas) {
    var compareResult = subValidationResult.compareKubernetes(bestMatch.validationResult);
    if (compareResult > 0) {
      // our node is the best matching so far
      bestMatch = {
        schema: subSchema,
        validationResult: subValidationResult,
        matchingSchemas: subMatchingSchemas,
      };
    }
    else if (compareResult === 0) {
      // there's already a best matching but we are as good
      bestMatch.matchingSchemas.merge(subMatchingSchemas);
      bestMatch.validationResult.mergeEnumValues(subValidationResult);
    }
    return bestMatch;
  }

  //genericComparison tries to find the best matching schema using a generic comparison
  function genericComparison(maxOneMatch, subValidationResult, bestMatch, subSchema, subMatchingSchemas) {
    if (!maxOneMatch &&
        !subValidationResult.hasProblems() &&
        !bestMatch.validationResult.hasProblems()) {
      // no errors, both are equally good matches
      bestMatch.matchingSchemas.merge(subMatchingSchemas);
      bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
      bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
    }
    else {
      var compareResult = subValidationResult.compareGeneric(bestMatch.validationResult);
      if (compareResult > 0) {
        // our node is the best matching so far
        bestMatch = {
          schema: subSchema,
          validationResult: subValidationResult,
          matchingSchemas: subMatchingSchemas,
        };
      }
      else if (compareResult === 0) {
        // there's already a best matching but we are as good
        bestMatch.matchingSchemas.merge(subMatchingSchemas);
        bestMatch.validationResult.mergeEnumValues(subValidationResult);
      }
    }
    return bestMatch;
  }
});

var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/parser/yamlParser04',
      [
        "require",
        "exports",
        "./jsonParser04",
        "vscode-nls",
        "../../yaml-ast-parser-custom-tags/index",
        "js-yaml",
        "../utils/documentPositionCalculator",
        "./scalar-type",
        "../utils/arrUtils"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Adam Voss. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var jsonParser04_1 = require("./jsonParser04");
  var nls = require("vscode-nls");
  var localize = nls.loadMessageBundle();
  var Yaml = require("../../yaml-ast-parser-custom-tags/index");
  var js_yaml_1 = require("js-yaml");
  var documentPositionCalculator_1 = require("../utils/documentPositionCalculator");
  var scalar_type_1 = require("./scalar-type");
  var arrUtils_1 = require("../utils/arrUtils");

  var SingleYAMLDocument = /** @class */ (function (_super) {
    __extends(SingleYAMLDocument, _super);
    function SingleYAMLDocument(lines) {
      var _this = _super.call(this, null, []) || this;
      _this.lines = lines;
      _this.root = null;
      _this.errors = [];
      _this.warnings = [];
      return _this;
    }

    SingleYAMLDocument.prototype.getSchemas = function (schema, doc, node) {
      var matchingSchemas = [];
      doc.validate(schema, matchingSchemas, node.start);
      return matchingSchemas;
    };

    SingleYAMLDocument.prototype.getNodeFromOffset = function (offset) {
      return this.getNodeFromOffsetEndInclusive(offset);
    };
    return SingleYAMLDocument;
  }(jsonParser04_1.JSONDocument));
  exports.SingleYAMLDocument = SingleYAMLDocument;

  function recursivelyBuildAst(parent, node) {
    var e_1, _a, e_2, _b;
    if (!node) {
        return;
    }
    switch (node.kind) {
      case Yaml.Kind.MAP: {
        var instance = node;
        var result = new jsonParser04_1.ObjectASTNode(parent, null, node.startPosition, node.endPosition);
        try {
            for (var _c = __values(instance.mappings), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mapping = _d.value;
                result.addProperty(recursivelyBuildAst(result, mapping));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
      }
      case Yaml.Kind.MAPPING: {
        var instance = node;
        var key = instance.key;
        // Technically, this is an arbitrary node in YAML
        // I doubt we would get a better string representation by parsing it
        var keyNode = new jsonParser04_1.StringASTNode(null, null, true, key.startPosition, key.endPosition);
        keyNode.value = key.value;
        var result = new jsonParser04_1.PropertyASTNode(parent, keyNode);
        result.end = instance.endPosition;
        var valueNode = instance.value
            ? recursivelyBuildAst(result, instance.value)
            : new jsonParser04_1.NullASTNode(parent, key.value, instance.endPosition, instance.endPosition);
        valueNode.location = key.value;
        result.setValue(valueNode);
        return result;
      }
      case Yaml.Kind.SEQ: {
        var instance = node;
        var result = new jsonParser04_1.ArrayASTNode(parent, null, instance.startPosition, instance.endPosition);
        var count = 0;
        try {
          for (var _e = __values(instance.items), _f = _e.next(); !_f.done; _f = _e.next()) {
            var item = _f.value;
            if (item === null && count === instance.items.length - 1) {
              break;
            }
            // Be aware of https://github.com/nodeca/js-yaml/issues/321
            // Cannot simply work around it here because we need to know if we are in Flow or Block
            var itemNode = item === null
                ? new jsonParser04_1.NullASTNode(parent, null, instance.endPosition, instance.endPosition)
                : recursivelyBuildAst(result, item);
            itemNode.location = count++;
            result.addItem(itemNode);
          }
        }
        catch (e_2_1) {
          e_2 = { error: e_2_1 };
        }
        finally {
          try {
              if (_f && !_f.done && (_b = _e.return))
              _b.call(_e);
          }
          finally {
            if (e_2)
              throw e_2.error;
          }
        }
        return result;
      }
      case Yaml.Kind.SCALAR: {
        var instance = node;
        var type = Yaml.determineScalarType(instance);
        // The name is set either by the sequence or the mapping case.
        var name_1 = null;
        var value = instance.value;
        //This is a patch for redirecting values with these strings to be boolean nodes because its not supported in the parser.
        var possibleBooleanValues = ['y', 'Y', 'yes', 'Yes', 'YES', 'n', 'N', 'no', 'No', 'NO', 'on', 'On', 'ON', 'off', 'Off', 'OFF', ];
        if (instance.plainScalar && possibleBooleanValues.indexOf(value.toString()) !== -1) {
          return new jsonParser04_1.BooleanASTNode(parent, name_1, scalar_type_1.parseYamlBoolean(value), node.startPosition, node.endPosition);
        }
        switch (type) {
          case Yaml.ScalarType.null: {
            return new jsonParser04_1.StringASTNode(parent, name_1, false, instance.startPosition, instance.endPosition);
          }
          case Yaml.ScalarType.bool: {
            return new jsonParser04_1.BooleanASTNode(parent, name_1, Yaml.parseYamlBoolean(value), node.startPosition, node.endPosition);
          }
          case Yaml.ScalarType.int: {
            var result = new jsonParser04_1.NumberASTNode(parent, name_1, node.startPosition, node.endPosition);
            result.value = Yaml.parseYamlInteger(value);
            result.isInteger = true;
            return result;
          }
          case Yaml.ScalarType.float: {
            var result = new jsonParser04_1.NumberASTNode(parent, name_1, node.startPosition, node.endPosition);
            result.value = Yaml.parseYamlFloat(value);
            result.isInteger = false;
            return result;
          }
          case Yaml.ScalarType.string: {
            var result = new jsonParser04_1.StringASTNode(parent, name_1, false, node.startPosition, node.endPosition);
            result.value = node.value;
            return result;
          }
        }
        break;
      }
      case Yaml.Kind.ANCHOR_REF: {
        var instance = node.value;
        return (recursivelyBuildAst(parent, instance) ||
          new jsonParser04_1.NullASTNode(parent, null, node.startPosition, node.endPosition));
      }
      case Yaml.Kind.INCLUDE_REF: {
        var result = new jsonParser04_1.StringASTNode(parent, null, false, node.startPosition, node.endPosition);
        result.value = node.value;
        return result;
      }
    }
  }

  function convertError(e) {
    return {
      message: "" + e.reason,
      location: {
        start: e.mark.position,
        end: e.mark.position + e.mark.column,
        code: jsonParser04_1.ErrorCode.Undefined,
      },
    };
  }
  function createJSONDocument(yamlDoc, startPositions, text) {
    var _doc = new SingleYAMLDocument(startPositions);
    _doc.root = recursivelyBuildAst(null, yamlDoc);
    if (!_doc.root) {
      // TODO: When this is true, consider not pushing the other errors.
      _doc.errors.push({
        message: localize('Invalid symbol', 'Expected a YAML object, array or literal'),
        code: jsonParser04_1.ErrorCode.Undefined,
        location: { start: yamlDoc.startPosition, end: yamlDoc.endPosition },
      });
    }
    var duplicateKeyReason = 'duplicate key';
    //Patch ontop of yaml-ast-parser to disable duplicate key message on merge key
    var isDuplicateAndNotMergeKey = function (error, yamlText) {
      var errorConverted = convertError(error);
      var errorStart = errorConverted.location.start;
      var errorEnd = errorConverted.location.end;
      if (error.reason === duplicateKeyReason && yamlText.substring(errorStart, errorEnd).startsWith('<<')) {
        return false;
      }
      return true;
    };
    var errors = yamlDoc.errors
        .filter(function (e) { return e.reason !== duplicateKeyReason && !e.isWarning; })
        .map(function (e) { return convertError(e); });
    var warnings = yamlDoc.errors.filter(function (e) {
      return (e.reason === duplicateKeyReason &&
          isDuplicateAndNotMergeKey(e, text)) ||
          e.isWarning;
    })
      .map(function (e) { return convertError(e); });

    errors.forEach(function (e) { return _doc.errors.push(e); });
    warnings.forEach(function (e) { return _doc.warnings.push(e); });
    return _doc;
  }

  var YAMLDocument = /** @class */ (function () {
    function YAMLDocument(documents) {
      this.documents = documents;
      this.errors = [];
      this.warnings = [];
    }
    return YAMLDocument;
  }());
  exports.YAMLDocument = YAMLDocument;

  function parse(text, customTags) {
    if (customTags === void 0) {
      customTags = [];
    }
    var startPositions = documentPositionCalculator_1.getLineStartPositions(text);
    // This is documented to return a YAMLNode even though the
    // typing only returns a YAMLDocument
    var yamlDocs = [];
    var filteredTags = arrUtils_1.filterInvalidCustomTags(customTags);
    var schemaWithAdditionalTags = js_yaml_1.Schema.create(filteredTags.map(function (tag) {
      var typeInfo = tag.split(' ');
      return new js_yaml_1.Type(typeInfo[0], {
        kind: (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar',
      });
    }));

    /**
     * Collect the additional tags into a map of string to possible tag types
     */
    var tagWithAdditionalItems = new Map();

    filteredTags.forEach(function (tag) {
      var typeInfo = tag.split(' ');
      var tagName = typeInfo[0];
      var tagType = (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar';
      if (tagWithAdditionalItems.has(tagName)) {
        tagWithAdditionalItems.set(tagName, tagWithAdditionalItems.get(tagName).concat([tagType]));
      }
      else {
        tagWithAdditionalItems.set(tagName, [tagType]);
      }
    });

    tagWithAdditionalItems.forEach(function (additionalTagKinds, key) {
      var newTagType = new js_yaml_1.Type(key, {
          kind: additionalTagKinds[0] || 'scalar',
      });
      newTagType.additionalKinds = additionalTagKinds;
      schemaWithAdditionalTags.compiledTypeMap[key] = newTagType;
    });

    var additionalOptions = {
      schema: schemaWithAdditionalTags,
    };
    Yaml.loadAll(text, function (doc) { return yamlDocs.push(doc); }, additionalOptions);
      return new YAMLDocument(yamlDocs.map(function (doc) { return createJSONDocument(doc, startPositions, text); }));
    }
    exports.parse = parse;
  }
);

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined)
      module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/services/yamlCompletion',
      [
        "require",
        "exports",
        "../parser/yamlParser04",
        "jsonc-parser",
        "vscode-languageserver-types",
        "vscode-nls",
        "../utils/arrUtils"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var yamlParser04_1 = require("../parser/yamlParser04");
  var Json = require("jsonc-parser");
  var vscode_languageserver_types_1 = require("vscode-languageserver-types");
  var nls = require("vscode-nls");
  var arrUtils_1 = require("../utils/arrUtils");
  var localize = nls.loadMessageBundle();

  var YAMLCompletion = /** @class */ (function () {
    function YAMLCompletion(schemaService, contributions, promiseConstructor) {
      if (contributions === void 0) {
        contributions = [];
      }
      this.schemaService = schemaService;
      this.contributions = contributions;
      this.promise = promiseConstructor || Promise;
      this.customTags = [];
      this.completion = true;
    }

    YAMLCompletion.prototype.configure = function (languageSettings, customTags) {
      if (languageSettings) {
        this.completion = languageSettings.completion;
      }
      this.customTags = customTags;
    };

    YAMLCompletion.prototype.doResolve = function (item) {
      for (var i = this.contributions.length - 1; i >= 0; i--) {
        if (this.contributions[i].resolveCompletion) {
          var resolver = this.contributions[i].resolveCompletion(item);
          if (resolver) {
            return resolver;
          }
        }
      }
      return this.promise.resolve(item);
    };

    YAMLCompletion.prototype.doComplete = function (document, position, isKubernetes) {
      var _this = this;
      if (isKubernetes === void 0) {
        isKubernetes = false;
      }
      var result = {
        items: [],
        isIncomplete: false,
      };
      if (!this.completion) {
        return Promise.resolve(result);
      }

      var completionFix = this.completionHelper(document, position);
      var newText = completionFix.newText;
      var doc = yamlParser04_1.parse(newText);
      this.setKubernetesParserOption(doc.documents, isKubernetes);
      var offset = document.offsetAt(position);
      if (document.getText()[offset] === ':') {
        return Promise.resolve(result);
      }

      var currentDoc = arrUtils_1.matchOffsetToDocument(offset, doc);
      if (currentDoc === null) {
        return Promise.resolve(result);
      }

      var currentDocIndex = doc.documents.indexOf(currentDoc);
      var node = currentDoc.getNodeFromOffsetEndInclusive(offset);
      // if (this.isInComment(document, node ? node.start : 0, offset)) {
      // 	return Promise.resolve(result);
      // }
      var currentWord = this.getCurrentWord(document, offset);
      var overwriteRange = null;
      if (node && node.type === 'null') {
        var nodeStartPos = document.positionAt(node.start);
        nodeStartPos.character += 1;
        var nodeEndPos = document.positionAt(node.end);
        nodeEndPos.character += 1;
        overwriteRange = vscode_languageserver_types_1.Range.create(nodeStartPos, nodeEndPos);
      }
      else if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean')) {
        overwriteRange = vscode_languageserver_types_1.Range.create(document.positionAt(node.start), document.positionAt(node.end));
      }
      else {
        var overwriteStart = offset - currentWord.length;
        if (overwriteStart > 0 &&
          document.getText()[overwriteStart - 1] === '"') {
          overwriteStart--;
        }
        overwriteRange = vscode_languageserver_types_1.Range.create(document.positionAt(overwriteStart), position);
      }

      var proposed = {};
      var collector = {
        add: function (suggestion) {
          var existing = proposed[suggestion.label];
          if (!existing) {
            proposed[suggestion.label] = suggestion;
            if (overwriteRange &&
              overwriteRange.start.line === overwriteRange.end.line) {
              suggestion.textEdit = vscode_languageserver_types_1.TextEdit.replace(overwriteRange, suggestion.insertText);
            }
            result.items.push(suggestion);
          }
          else if (!existing.documentation) {
            existing.documentation = suggestion.documentation;
          }
        },
        setAsIncomplete: function () {
          result.isIncomplete = true;
        },
        error: function (message) {
          console.error(message);
        },
        log: function (message) {
          console.log(message);
        },
        getNumberOfProposals: function () { return result.items.length; },
      };
        
      if (this.customTags.length > 0) {
        this.getCustomTagValueCompletions(collector);
      }

      currentDoc.currentDocIndex = currentDocIndex;
      return this.schemaService.getSchemaForResource(document.uri, currentDoc).then(function (schema) {
          if (!schema) {
            return Promise.resolve(result);
          }

          var newSchema = schema;
          // tslint:disable-next-line: no-any
          var collectionPromises = [];
          var addValue = true;
          var currentKey = '';
          var currentProperty = null;
          if (node) {
            if (node.type === 'string') {
              var stringNode = node;
              if (stringNode.isKey) {
                addValue = !(node.parent && node.parent.value);
                currentProperty = node.parent ? node.parent : null;
                currentKey = document.getText().substring(node.start + 1, node.end - 1);
                if (node.parent) {
                    node = node.parent.parent;
                }
              }
            }
          }

          // proposals for properties
          if (node && node.type === 'object') {
            // don't suggest properties that are already present
            var properties = node.properties;
            properties.forEach(function (p) {
              if (!currentProperty || currentProperty !== p) {
                proposed[p.key.value] = vscode_languageserver_types_1.CompletionItem.create('__');
              }
            });
            var separatorAfter = '';
            if (addValue) {
              separatorAfter = _this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
            }
            if (newSchema) {
              // property proposals with schema
              _this.getPropertyCompletions(document, newSchema, currentDoc, node, addValue, collector, separatorAfter);
            }
            var location_1 = node.getPath();
            _this.contributions.forEach(function (contribution) {
              var collectPromise = contribution.collectPropertyCompletions(document.uri, location_1, currentWord, addValue, false, collector);
              if (collectPromise) {
                collectionPromises.push(collectPromise);
              }
            });

            if (!schema && currentWord.length > 0 &&
                document.getText().charAt(offset - currentWord.length - 1) !== '"') {
              collector.add({
                kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                label: _this.getLabelForValue(currentWord),
                insertText: _this.getInsertTextForProperty(currentWord, null, false, separatorAfter),
                insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                documentation: '',
              });
            }
          }

          // proposals for values
          if (newSchema) {
              _this.getValueCompletions(newSchema, currentDoc, node, offset, document, collector);
          }
          if (_this.contributions.length > 0) {
              _this.getContributedValueCompletions(currentDoc, node, offset, document, collector, collectionPromises);
          }
          return _this.promise.all(collectionPromises).then(function () { return result; });
        });
      };
      
    YAMLCompletion.prototype.getPropertyCompletions = function (document, schema, doc, node, addValue, collector, separatorAfter) {
      var _this = this;
      var matchingSchemas = doc.getMatchingSchemas(schema.schema);
      matchingSchemas.forEach(function (s) {
        if (s.node === node && !s.inverted) {
          var schemaProperties_1 = s.schema.properties;
          if (schemaProperties_1) {
            Object.keys(schemaProperties_1).forEach(function (key) {
              var propertySchema = schemaProperties_1[key];
              if (!propertySchema.deprecationMessage && !propertySchema['doNotSuggest']) {
                var identCompensation = '';
                if (node.parent && node.parent.type === 'array') {
                  // because there is a slash '-' to prevent the properties generated to have the correct indent
                  var sourceText = document.getText();
                  var indexOfSlash = sourceText.lastIndexOf('-', node.start - 1);
                  if (indexOfSlash > 0) {
                    // add one space to compensate the '-'
                    identCompensation = '' + sourceText.slice(indexOfSlash + 1, node.start);
                  }
                }
                collector.add({
                  kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                  label: key,
                  insertText: _this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter, identCompensation + '\t'),
                  insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                  documentation: propertySchema.description || '',
                });
              }
            });
          }

          // Error fix
          // If this is a array of string/boolean/number
          //  test:
          //    - item1
          // it will treated as a property key since `:` has been appended
          if (node.type === 'object' && node.parent && node.parent.type === 'array' && s.schema.type !== 'object') {
            _this.addSchemaValueCompletions(s.schema, collector, separatorAfter);
          }
        }
      });
    };

    YAMLCompletion.prototype.getValueCompletions = function (schema, doc, node, offset, document, collector) {
      var _this = this;
      var offsetForSeparator = offset;
      var parentKey = null;
      var valueNode = null;
      if (node &&
          (node.type === 'string' ||
              node.type === 'number' ||
              node.type === 'boolean')) {
        offsetForSeparator = node.end;
        valueNode = node;
        node = node.parent;
      }
      if (node && node.type === 'null') {
        var nodeParent = node.parent;
        /*
         * This is going to be an object for some reason and we need to find the property
         * Its an issue with the null node
         */
        if (nodeParent && nodeParent.type === 'object') {
          for (var prop in nodeParent['properties']) {
            var currNode = nodeParent['properties'][prop];
            if (currNode.key && currNode.key.location === node.location) {
              node = currNode;
            }
          }
        }
      }

      if (!node) {
        this.addSchemaValueCompletions(schema.schema, collector, '');
        return;
      }

      if (node.type === 'property' &&
        offset > node.colonOffset) {
        var propertyNode = node;
        var valueNode_1 = propertyNode.value;
        if (valueNode_1 && offset > valueNode_1.end) {
            return; // we are past the value node
        }
        parentKey = propertyNode.key.value;
        node = node.parent;
      }

      var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
      if (node && (parentKey !== null || node.type === 'array')) {
        var matchingSchemas = doc.getMatchingSchemas(schema.schema);
        matchingSchemas.forEach(function (s) {
          if (s.node === node && !s.inverted && s.schema) {
            if (s.schema.items) {
              if (Array.isArray(s.schema.items)) {
                var index = _this.findItemAtOffset(node, document, offset);
                if (index < s.schema.items.length) {
                  _this.addSchemaValueCompletions(s.schema.items[index], collector, separatorAfter, true);
                }
              }
              else if (s.schema.items.type === 'object') {
                var t = _this.getInsertTextForObject(s.schema.items, separatorAfter).insertText;
                collector.add({
                  kind: _this.getSuggestionKind(s.schema.items.type),
                  label: '- (array item)',
                  documentation: "Create an item of an array" + (s.schema.description === undefined
                      ? ''
                      : '(' + s.schema.description + ')'),
                  insertText: "- " + t.trimLeft(), // _this.getInsertTextForObject(s.schema.items, separatorAfter).insertText.trimLeft(),
                  insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
                });
              }
              else {
                _this.addSchemaValueCompletions(s.schema.items, collector, separatorAfter, true);
              }
            }
            if (s.schema.properties) {
              var propertySchema = s.schema.properties[parentKey];
              if (propertySchema) {
                _this.addSchemaValueCompletions(propertySchema, collector, separatorAfter, false);
              }
            }
          }
        });
      }
    };
    YAMLCompletion.prototype.getContributedValueCompletions = function (doc, node, offset, document, collector, 
        // tslint:disable-next-line: no-any
        collectionPromises) {

      if (!node) {
        this.contributions.forEach(function (contribution) {
          var collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
          if (collectPromise) {
            collectionPromises.push(collectPromise);
          }
        });
      }
      else {
        if (node.type === 'string' ||
          node.type === 'number' ||
          node.type === 'boolean' ||
          node.type === 'null') {
          node = node.parent;
        }
        if (node.type === 'property' &&
          offset > node.colonOffset) {
          var parentKey_1 = node.key.value;
          var valueNode = node.value;
          if (!valueNode || offset <= valueNode.end) {
            var location_2 = node.parent.getPath();
            this.contributions.forEach(function (contribution) {
              var collectPromise = contribution.collectValueCompletions(document.uri, location_2, parentKey_1, collector);
              if (collectPromise) {
                collectionPromises.push(collectPromise);
              }
            });
          }
        }
      }
    };

    YAMLCompletion.prototype.getCustomTagValueCompletions = function (collector) {
      var _this = this;
      var validCustomTags = arrUtils_1.filterInvalidCustomTags(this.customTags);
      validCustomTags.forEach(function (validTag) {
        // Valid custom tags are guarenteed to be strings
        var label = validTag.split(' ')[0];
        _this.addCustomTagValueCompletion(collector, ' ', label);
      });
    };

    YAMLCompletion.prototype.addSchemaValueCompletions = function (schema, collector, separatorAfter, forArrayItem) {
      if (forArrayItem === void 0) {
        forArrayItem = false;
      }
      var types = {};
      this.addSchemaValueCompletionsCore(schema, collector, types, separatorAfter, forArrayItem);
      if (types['boolean']) {
        this.addBooleanValueCompletion(true, collector, separatorAfter);
        this.addBooleanValueCompletion(false, collector, separatorAfter);
      }
      if (types['null']) {
        this.addNullValueCompletion(collector, separatorAfter);
      }
    };

    YAMLCompletion.prototype.addSchemaValueCompletionsCore = function (schema, collector, types, separatorAfter, forArrayItem) {
      var _this = this;
      if (forArrayItem === void 0) {
        forArrayItem = false;
      }
      this.addDefaultValueCompletions(schema, collector, separatorAfter, 0, forArrayItem);
      this.addEnumValueCompletions(schema, collector, separatorAfter, forArrayItem);
      this.collectTypes(schema, types);
      if (Array.isArray(schema.allOf)) {
        schema.allOf.forEach(function (s) {
          return _this.addSchemaValueCompletionsCore(s, collector, types, separatorAfter, forArrayItem);
        });
      }
      if (Array.isArray(schema.anyOf)) {
        schema.anyOf.forEach(function (s) {
          return _this.addSchemaValueCompletionsCore(s, collector, types, separatorAfter, forArrayItem);
        });
      }
      if (Array.isArray(schema.oneOf)) {
        schema.oneOf.forEach(function (s) {
          return _this.addSchemaValueCompletionsCore(s, collector, types, separatorAfter, forArrayItem);
        });
      }
    };

    YAMLCompletion.prototype.addDefaultValueCompletions = function (schema, collector, separatorAfter, arrayDepth, forArrayItem) {
      var _this = this;
      if (arrayDepth === void 0) {
        arrayDepth = 0;
      }
      if (forArrayItem === void 0) {
        forArrayItem = false;
      }
      var hasProposals = false;
      if (schema.default) {
        var type = schema.type;
        var value = schema.default;
        for (var i = arrayDepth; i > 0; i--) {
          value = [value];
          type = 'array';
        }
        collector.add({
          kind: this.getSuggestionKind(type),
          label: forArrayItem
              ? "- " + this.getLabelForValue(value)
              : this.getLabelForValue(value),
          insertText: forArrayItem
              ? "- " + this.getInsertTextForValue(value, separatorAfter)
              : this.getInsertTextForValue(value, separatorAfter),
          insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
          detail: localize('json.suggest.default', 'Default value'),
        });
        hasProposals = true;
      }

      if (Array.isArray(schema['examples'])) {
          schema['examples'].forEach(function (example) {
            var type = schema.type;
            var value = example;
            for (var i = arrayDepth; i > 0; i--) {
              value = [value];
              type = 'array';
            }

            collector.add({
              kind: _this.getSuggestionKind(type),
              label: _this.getLabelForValue(value),
              insertText: _this.getInsertTextForValue(value, separatorAfter),
              insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
            });
            hasProposals = true;
          });
        }
      if (!hasProposals && schema.items && !Array.isArray(schema.items)) {
        this.addDefaultValueCompletions(schema.items, collector, separatorAfter, arrayDepth + 1);
      }
    };

    YAMLCompletion.prototype.addEnumValueCompletions = function (schema, collector, separatorAfter, forArrayItem) {
      if (forArrayItem === void 0) {
        forArrayItem = false;
      }
      if (isDefined(schema['const'])) {
        collector.add({
          kind: this.getSuggestionKind(schema.type),
          label: this.getLabelForValue(schema['const']),
          insertText: this.getInsertTextForValue(schema['const'], separatorAfter),
          insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
          documentation: schema.description,
        });
      }
      if (Array.isArray(schema.enum)) {
        for (var i = 0, length_1 = schema.enum.length; i < length_1; i++) {
          var enm = schema.enum[i];
          var documentation = schema.description;
          if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
            documentation = schema.enumDescriptions[i];
          }
          collector.add({
            kind: this.getSuggestionKind(schema.type),
            label: forArrayItem
                ? "- " + this.getLabelForValue(enm)
                : this.getLabelForValue(enm),
            insertText: forArrayItem
                ? "- " + this.getInsertTextForValue(enm, separatorAfter)
                : this.getInsertTextForValue(enm, separatorAfter),
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
            documentation: documentation,
          });
        }
      }
    };

    YAMLCompletion.prototype.collectTypes = function (schema, types) {
      var type = schema.type;
      if (Array.isArray(type)) {
        type.forEach(function (t) { return (types[t] = true); });
      }
      else {
        types[type] = true;
      }
    };

    YAMLCompletion.prototype.addBooleanValueCompletion = function (value, collector, separatorAfter) {
      collector.add({
        kind: this.getSuggestionKind('boolean'),
        label: value ? 'true' : 'false',
        insertText: this.getInsertTextForValue(value, separatorAfter),
        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
        documentation: '',
      });
    };

    YAMLCompletion.prototype.addNullValueCompletion = function (collector, separatorAfter) {
      collector.add({
        kind: this.getSuggestionKind('null'),
        label: 'null',
        insertText: 'null' + separatorAfter,
        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
        documentation: '',
      });
    };
    
    YAMLCompletion.prototype.addCustomTagValueCompletion = function (collector, separatorAfter, label) {
      collector.add({
        kind: this.getSuggestionKind('string'),
        label: label,
        insertText: label + separatorAfter,
        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.Snippet,
        documentation: '',
      });
    };

    // tslint:disable-next-line: no-any
    YAMLCompletion.prototype.getLabelForValue = function (value) {
      var label = typeof value === 'string' ? value : JSON.stringify(value);
      if (label.length > 57) {
        return label.substr(0, 57).trim() + '...';
      }
      return label;
    };

    // tslint:disable-next-line: no-any
    YAMLCompletion.prototype.getSuggestionKind = function (type) {
      if (Array.isArray(type)) {
        // tslint:disable-next-line: no-any
        var array = type;
        type = array.length > 0 ? array[0] : null;
      }
      if (!type) {
        return vscode_languageserver_types_1.CompletionItemKind.Value;
      }
      switch (type) {
        case 'string':
          return vscode_languageserver_types_1.CompletionItemKind.Value;
        case 'object':
          return vscode_languageserver_types_1.CompletionItemKind.Module;
        case 'property':
          return vscode_languageserver_types_1.CompletionItemKind.Property;
        default:
          return vscode_languageserver_types_1.CompletionItemKind.Value;
      }
    };

    YAMLCompletion.prototype.getCurrentWord = function (document, offset) {
      var i = offset - 1;
      var text = document.getText();
      while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
        i--;
      }
      return text.substring(i + 1, offset);
    };

    YAMLCompletion.prototype.findItemAtOffset = function (node, document, offset) {
      var scanner = Json.createScanner(document.getText(), true);
      var children = node.getChildNodes();
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (offset > child.end) {
          scanner.setPosition(child.end);
          var token = scanner.scan();
          if (token === 5 /* CommaToken */ &&
            offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
            return i + 1;
          }
          return i;
        }
        else if (offset >= child.start) {
            return i;
        }
      }
      return 0;
    };

    // private isInComment(document: TextDocument, start: number, offset: number) {
    // 	let scanner = Json.createScanner(document.getText(), false);
    // 	scanner.setPosition(start);
    // 	let token = scanner.scan();
    // 	while (token !== Json.SyntaxKind.EOF && (scanner.getTokenOffset() + scanner.getTokenLength() < offset)) {
    // 		token = scanner.scan();
    // 	}
    // 	return (token === Json.SyntaxKind.LineCommentTrivia || token === Json.SyntaxKind.BlockCommentTrivia) && scanner.getTokenOffset() <= offset;
    // }

    YAMLCompletion.prototype.getInsertTextForPlainText = function (text) {
      return text.replace(/[\\\$\}]/g, '\\$&'); // escape $, \ and }
    };
    
    // tslint:disable-next-line: no-any
    YAMLCompletion.prototype.getInsertTextForValue = function (value, separatorAfter) {
      var text = value;
      if (text === '{}') {
        return '{\n\t$1\n}' + separatorAfter;
      }
      else if (text === '[]') {
        return '[\n\t$1\n]' + separatorAfter;
      }
      return this.getInsertTextForPlainText(text + separatorAfter);
    };

    YAMLCompletion.prototype.getInsertTextForObject = function (schema, separatorAfter, indent, insertIndex) {
      var _this = this;
      if (indent === void 0) {
        indent = '\t';
      }
      if (insertIndex === void 0) {
        insertIndex = 1;
      }
      var insertText = '';
      if (!schema.properties) {
        insertText = indent + "$" + insertIndex++ + "\n";
        return {
          insertText: insertText,
          insertIndex: insertIndex
        };
      }

      Object.keys(schema.properties).forEach(function (key) {
        var propertySchema = schema.properties[key];
        var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
        if (!type) {
          if (propertySchema.properties) {
            type = 'object';
          }
          if (propertySchema.items) {
            type = 'array';
          }
        }

        if (schema.required && schema.required.indexOf(key) > -1) {
          switch (type) {
            case 'boolean':
            case 'string':
            case 'number':
            case 'integer':
              insertText += "" + indent + key + ": $" + insertIndex++ + "\n";
              break;

            case 'array':
              var arrayInsertResult = _this.getInsertTextForArray(propertySchema.items, separatorAfter, indent + "\t", insertIndex++);
              insertIndex = arrayInsertResult.insertIndex;
              insertText += "" + indent + key + ":\n" + indent + "\t- " + arrayInsertResult.insertText + "\n";
              break;

            case 'object':
              var objectInsertResult = _this.getInsertTextForObject(propertySchema, separatorAfter, indent + "\t", insertIndex++);
              insertIndex = objectInsertResult.insertIndex;
              insertText += "" + indent + key + ":\n" + objectInsertResult.insertText + "\n";
              break;
          }
        }
        /* QM: do not insert default values, not interesting at all
        else if (propertySchema.default !== undefined) {
          switch (type) {
            case 'boolean':
            case 'string':
            case 'number':
            case 'integer':
              insertText += "" + indent + key + ": ${" + insertIndex++ + ":" + propertySchema.default + "}\n";
              break;
            case 'array':
            case 'object':
              // TODO: support default value for array object
              break;
          }
        }
        */
      });

      if (insertText.trim().length === 0) {
        insertText = indent + "$" + insertIndex++ + "\n";
      }
      insertText = insertText.trimRight() + separatorAfter;
      return { insertText: insertText, insertIndex: insertIndex };
    };

    YAMLCompletion.prototype.getInsertTextForArray = function (schema, separatorAfter, indent, insertIndex) {
      if (indent === void 0) {
        indent = '\t';
      }
      if (insertIndex === void 0) {
        insertIndex = 1;
      }
      var insertText = '';
      if (!schema) {
        insertText = "$" + insertIndex++;
      }
      var type = Array.isArray(schema.type) ? schema.type[0] : schema.type;
      if (!type) {
        if (schema.properties) {
          type = 'object';
        }
        if (schema.items) {
          type = 'array';
        }
      }
      switch (schema.type) {
        case 'boolean':
          insertText = "${" + insertIndex++ + ":false}";
          break;
        case 'number':
        case 'integer':
          insertText = "${" + insertIndex++ + ":0}";
          break;
        case 'string':
          insertText = "${" + insertIndex++ + ":null}";
          break;
        case 'object':
          var objectInsertResult = this.getInsertTextForObject(schema, separatorAfter, indent + "\t", insertIndex++);
          insertText = objectInsertResult.insertText.trimLeft();
          insertIndex = objectInsertResult.insertIndex;
          break;
      }
      return { insertText: insertText, insertIndex: insertIndex };
    };

    YAMLCompletion.prototype.getInsertTextForProperty = function (key, propertySchema, addValue, separatorAfter, ident) {
      if (ident === void 0) {
        ident = '\t';
      }
      var propertyText = this.getInsertTextForValue(key, '');
      // if (!addValue) {
      //     return propertyText;
      // }
      var resultText = propertyText + ':';
      var value;

      if (propertySchema) {
        // Add default value 
        if (propertySchema.default !== undefined) {
          value = " ${1:" + propertySchema.default + "}";
        }
        else if (propertySchema.properties) {
          // This is an object
          var newInsert = this.getInsertTextForObject(propertySchema, separatorAfter, ident);
          return resultText + "\n" + newInsert.insertText;
        }
        else if (propertySchema.items) {
          // This is an array
          return resultText + "\n\t- " + this.getInsertTextForArray(propertySchema.items, separatorAfter, ident).insertText;
        }
        else {
          var type = Array.isArray(propertySchema.type)
              ? propertySchema.type[0]
              : propertySchema.type;
          switch (type) {
            case 'boolean':
              value = ' $1';
              break;
            case 'string':
              value = ' $1';
              break;
            case 'object':
              value = '\n\t';
              break;
            case 'array':
              value = '\n\t- ';
              break;
            case 'number':
            case 'integer':
              value = ' ${1:0}';
              break;
            case 'null':
              value = ' ${1:null}';
              break;
            default:
              return propertyText;
          }
        }
      }

      if (!value) {
        value = '$1';
      }
      return resultText + value + separatorAfter;
    };

    YAMLCompletion.prototype.evaluateSeparatorAfter = function (document, offset) {
      // let scanner = Json.createScanner(document.getText(), true);
      // scanner.setPosition(offset);
      // let token = scanner.scan();
      // switch (token) {
      // 	case Json.SyntaxKind.CommaToken:
      // 	case Json.SyntaxKind.CloseBraceToken:
      // 	case Json.SyntaxKind.CloseBracketToken:
      // 	case Json.SyntaxKind.EOF:
      // 		return '';
      // 	default:
      // 		return '';
      // }
      return '';
    };

    /**
     * Corrects simple syntax mistakes to load possible nodes even if a semicolon is missing
     */
    YAMLCompletion.prototype.completionHelper = function (document, textDocumentPosition) {
      // Get the string we are looking at via a substring
      var linePos = textDocumentPosition.line;
      var position = textDocumentPosition;
      var lineOffset = arrUtils_1.getLineOffsets(document.getText());
      var start = lineOffset[linePos]; // Start of where the autocompletion is happening
      var end = 0; // End of where the autocompletion is happening
      if (lineOffset[linePos + 1]) {
        end = lineOffset[linePos + 1];
      }
      else {
        end = document.getText().length;
      }

      while (end - 1 >= 0 &&
        this.is_EOL(document.getText().charCodeAt(end - 1))) {
        end--;
      }

      var textLine = document.getText().substring(start, end);
      // Check if the string we are looking at is a node
      if (textLine.indexOf(':') === -1) {
        // We need to add the ":" to load the nodes
        var newText = '';
        // This is for the empty line case
        var trimmedText = textLine.trim();
        if (trimmedText.length === 0 || (trimmedText.length === 1 && trimmedText[0] === '-')) {
          // Add a temp node that is in the document but we don't use at all.
          newText = document.getText().substring(0, start + textLine.length) +
              (trimmedText[0] === '-' && !textLine.endsWith(' ') ? ' ' : '') +
              'holder:\r\n' +
              document.getText().substr(lineOffset[linePos + 1] || document.getText().length);
          // For when missing semi colon case
        }
        else {
          // Add a semicolon to the end of the current line so we can validate the node
          newText =
            document.getText().substring(0, start + textLine.length) +
            ':\r\n' +
            document.getText().substr(lineOffset[linePos + 1] || document.getText().length);
        }
        return {
          newText: newText,
          newPosition: textDocumentPosition,
        };
      }
      else {
        // All the nodes are loaded
        position.character = position.character - 1;
        return {
          newText: document.getText(),
          newPosition: position,
        };
      }
    };

    YAMLCompletion.prototype.is_EOL = function (c) {
      return c === 0x0a /* LF */ || c === 0x0d /* CR */;
    };

    // Called by onCompletion
    YAMLCompletion.prototype.setKubernetesParserOption = function (jsonDocuments, option) {
      for (var jsonDoc in jsonDocuments) {
        jsonDocuments[jsonDoc].configureSettings({
            isKubernetes: option,
        });
      }
    };
    return YAMLCompletion;
  }());

  exports.YAMLCompletion = YAMLCompletion;

  // tslint:disable-next-line: no-any
  function isDefined(val) {
    return val !== undefined;
  }
});

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(
      'vs/language/yaml/languageservice/services/yamlHover',
      [
        "require",
        "exports",
        "../utils/arrUtils",
        "../parser/yamlParser07",
        "vscode-json-languageservice/lib/umd/services/jsonHover"
      ],
      factory
    );
  }
})(function (require, exports) {
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Red Hat, Inc. All rights reserved.
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var arrUtils_1 = require("../utils/arrUtils");
  var yamlParser07_1 = require("../parser/yamlParser07");
  var jsonHover_1 = require("vscode-json-languageservice/lib/umd/services/jsonHover");
  var YAMLHover = /** @class */ (function () {

    function YAMLHover(schemaService, promiseConstructor) {
      this.promise = promiseConstructor || Promise;
      this.shouldHover = true;
      this.jsonHover = new jsonHover_1.JSONHover(schemaService, [], Promise);
    }

    YAMLHover.prototype.configure = function (languageSettings) {
      if (languageSettings) {
        this.shouldHover = languageSettings.hover;
      }
    };

    YAMLHover.prototype.doHover = function (document, position) {
      if (!this.shouldHover || !document) {
          return this.promise.resolve(void 0);
      }
      var doc = yamlParser07_1.parse(document.getText());
      var offset = document.offsetAt(position);
      var currentDoc = arrUtils_1.matchOffsetToDocument2(offset, doc);
      if (currentDoc === null) {
          return this.promise.resolve(void 0);
      }
      var currentDocIndex = doc.documents.indexOf(currentDoc);
      currentDoc.currentDocIndex = currentDocIndex;
      return this.jsonHover.doHover(document, position, currentDoc);
    };
    return YAMLHover;
  }());
  
  exports.YAMLHover = YAMLHover;
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try { step(generator.next(value)); } catch (e) { reject(e); }
      }
      function rejected(value) {
        try { step(generator["throw"](value)); } catch (e) { reject(e); }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  },
  typeof Symbol === "function" && (
    g[Symbol.iterator] = function() { return this; }
  ), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      }
      catch (e) {
        op = [6, e];
        y = 0;
      }
      finally {
        f = t = 0;
      }
      if (op[0] & 5)
        throw op[1];

      return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};

var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('vs/language/yaml/languageservice/services/yamlValidation',["require", "exports", "../parser/yamlParser07", "vscode-json-languageservice/lib/umd/services/jsonValidation"], factory);
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Red Hat, Inc. All rights reserved.
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var yamlParser07_1 = require("../parser/yamlParser07");
    var jsonValidation_1 = require("vscode-json-languageservice/lib/umd/services/jsonValidation");
    var YAMLValidation = /** @class */ (function () {
        function YAMLValidation(schemaService, promiseConstructor) {
            this.MATCHES_MULTIPLE = 'Matches multiple schemas when only one must validate.';
            this.promise = promiseConstructor || Promise;
            this.validationEnabled = true;
            this.jsonValidation = new jsonValidation_1.JSONValidation(schemaService, this.promise);
        }
        YAMLValidation.prototype.configure = function (settings) {
            if (settings) {
                this.validationEnabled = settings.validate;
                this.customTags = settings.customTags;
            }
        };
        YAMLValidation.prototype.doValidation = function (textDocument, isKubernetes) {
            if (isKubernetes === void 0) { isKubernetes = false; }
            return __awaiter(this, void 0, void 0, function () {
                var yamlDocument, validationResult, index, _a, _b, currentYAMLDoc, validation, syd, e_1_1, foundSignatures, duplicateMessagesRemoved, _c, _d, err, errSig;
                var e_1, _e, e_2, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (!this.validationEnabled) {
                                return [2 /*return*/, this.promise.resolve([])];
                            }
                            yamlDocument = yamlParser07_1.parse(textDocument.getText(), this.customTags);
                            validationResult = [];
                            index = 0;
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 6, 7, 8]);
                            _a = __values(yamlDocument.documents), _b = _a.next();
                            _g.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            currentYAMLDoc = _b.value;
                            currentYAMLDoc.isKubernetes = isKubernetes;
                            currentYAMLDoc.currentDocIndex = index;
                            return [4 /*yield*/, this.jsonValidation.doValidation(textDocument, currentYAMLDoc)];
                        case 3:
                            validation = _g.sent();
                            syd = currentYAMLDoc;
                            if (syd.errors.length > 0) {
                                validationResult.push.apply(validationResult, __spread(syd.errors));
                            }
                            validationResult.push.apply(validationResult, __spread(validation));
                            index++;
                            _g.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _g.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            foundSignatures = new Set();
                            duplicateMessagesRemoved = [];
                            try {
                                for (_c = __values(validationResult), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    err = _d.value;
                                    /**
                                     * A patch ontop of the validation that removes the
                                     * 'Matches many schemas' error for kubernetes
                                     * for a better user experience.
                                     */
                                    if (isKubernetes && err.message === this.MATCHES_MULTIPLE) {
                                        continue;
                                    }
                                    errSig = err.range.start.line +
                                        ' ' +
                                        err.range.start.character +
                                        ' ' +
                                        err.message;
                                    if (!foundSignatures.has(errSig)) {
                                        duplicateMessagesRemoved.push(err);
                                        foundSignatures.add(errSig);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return [2 /*return*/, duplicateMessagesRemoved];
                    }
                });
            });
        };
        return YAMLValidation;
    }());
    exports.YAMLValidation = YAMLValidation;
});

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('vs/language/yaml/languageservice/services/yamlFormatter',["require", "exports", "vscode-languageserver-types"], factory);
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Red Hat, Inc. All rights reserved.
     *  Copyright (c) Adam Voss. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var vscode_languageserver_types_1 = require("vscode-languageserver-types");
    var YAMLFormatter = /** @class */ (function () {
        function YAMLFormatter() {
            this.formatterEnabled = true;
        }
        YAMLFormatter.prototype.configure = function (shouldFormat) {
            if (shouldFormat) {
                this.formatterEnabled = shouldFormat.format;
            }
        };
        YAMLFormatter.prototype.format = function (document, options) {
            if (!this.formatterEnabled) {
                return [];
            }
            try {
                var prettier = require('prettier/standalone');
                var parser = require('prettier/parser-yaml');
                var text = document.getText();
                var formatted = prettier.format(text, Object.assign(options, { parser: 'yaml', plugins: [parser] }));
                return [
                    vscode_languageserver_types_1.TextEdit.replace(vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(0, 0), document.positionAt(text.length)), formatted),
                ];
            }
            catch (error) {
                return [];
            }
        };
        return YAMLFormatter;
    }());
    exports.YAMLFormatter = YAMLFormatter;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('vs/language/yaml/languageservice/yamlLanguageService',["require", "exports", "./services/yamlSchemaService", "./services/documentSymbols", "./services/yamlCompletion", "./services/yamlHover", "./services/yamlValidation", "./services/yamlFormatter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var yamlSchemaService_1 = require("./services/yamlSchemaService");
    var documentSymbols_1 = require("./services/documentSymbols");
    var yamlCompletion_1 = require("./services/yamlCompletion");
    var yamlHover_1 = require("./services/yamlHover");
    var yamlValidation_1 = require("./services/yamlValidation");
    var yamlFormatter_1 = require("./services/yamlFormatter");
    function getLanguageService(schemaRequestService, workspaceContext, contributions, promiseConstructor) {
        var promise = promiseConstructor || Promise;
        var schemaService = new yamlSchemaService_1.YAMLSchemaService(schemaRequestService, workspaceContext);
        var completer = new yamlCompletion_1.YAMLCompletion(schemaService, contributions, promise);
        var hover = new yamlHover_1.YAMLHover(schemaService, promise);
        var yamlDocumentSymbols = new documentSymbols_1.YAMLDocumentSymbols(schemaService);
        var yamlValidation = new yamlValidation_1.YAMLValidation(schemaService, promise);
        var formatter = new yamlFormatter_1.YAMLFormatter();
        return {
            configure: function (settings) {
                schemaService.clearExternalSchemas();
                if (settings.schemas) {
                    settings.schemas.forEach(function (settings) {
                        schemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
                    });
                }
                yamlValidation.configure(settings);
                hover.configure(settings);
                var customTagsSetting = settings && settings['customTags'] ? settings['customTags'] : [];
                completer.configure(settings, customTagsSetting);
                formatter.configure(settings);
            },
            registerCustomSchemaProvider: function (schemaProvider) {
                schemaService.registerCustomSchemaProvider(schemaProvider);
            },
            doComplete: completer.doComplete.bind(completer),
            doResolve: completer.doResolve.bind(completer),
            doValidation: yamlValidation.doValidation.bind(yamlValidation),
            doHover: hover.doHover.bind(hover),
            findDocumentSymbols: yamlDocumentSymbols.findDocumentSymbols.bind(yamlDocumentSymbols),
            findDocumentSymbols2: yamlDocumentSymbols.findHierarchicalDocumentSymbols.bind(yamlDocumentSymbols),
            resetSchema: function (uri) { return schemaService.onResourceChange(uri); },
            doFormat: formatter.format.bind(formatter),
        };
    }
    exports.getLanguageService = getLanguageService;
});

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define('vs/language/yaml/yamlWorker',["require", "exports", "vscode-languageserver-types", "./languageservice/yamlLanguageService"], factory);
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Red Hat, Inc. All rights reserved.
     *  Copyright (c) Adam Voss. All rights reserved.
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = monaco.Promise;
    var ls = require("vscode-languageserver-types");
    var yamlService = require("./languageservice/yamlLanguageService");
    var defaultSchemaRequestService;
    if (typeof fetch !== 'undefined') {
        defaultSchemaRequestService = function (url) {
            return fetch(url).then(function (response) { return response.text(); });
        };
    }
    var YAMLWorker = /** @class */ (function () {
        function YAMLWorker(ctx, createData) {
            var prefix = createData.prefix || '';
            var service = function (url) {
                return defaultSchemaRequestService("" + prefix + url);
            };
            this._ctx = ctx;
            this._languageSettings = createData.languageSettings;
            this._languageId = createData.languageId;
            this._languageService = yamlService.getLanguageService(createData.enableSchemaRequest && service, null, []);
            this._isKubernetes = createData.isKubernetes || false;
            this._languageService.configure(__assign(__assign({}, this._languageSettings), { hover: true, isKubernetes: this._isKubernetes }));
        }
        YAMLWorker.prototype.doValidation = function (uri) {
            var document = this._getTextDocument(uri);
            if (document) {
                return this._languageService.doValidation(document, this._isKubernetes);
            }
            return Promise.as([]);
        };
        YAMLWorker.prototype.doComplete = function (uri, position) {
            var document = this._getTextDocument(uri);
            return this._languageService.doComplete(document, position, this._isKubernetes);
        };
        YAMLWorker.prototype.doResolve = function (item) {
            return this._languageService.doResolve(item);
        };
        YAMLWorker.prototype.doHover = function (uri, position) {
            var document = this._getTextDocument(uri);
            return this._languageService.doHover(document, position);
        };
        YAMLWorker.prototype.format = function (uri, range, options) {
            var document = this._getTextDocument(uri);
            var textEdits = this._languageService.doFormat(document, options);
            return Promise.as(textEdits);
        };
        YAMLWorker.prototype.resetSchema = function (uri) {
            return Promise.as(this._languageService.resetSchema(uri));
        };
        YAMLWorker.prototype.findDocumentSymbols = function (uri) {
            var document = this._getTextDocument(uri);
            var symbols = this._languageService.findDocumentSymbols2(document);
            return Promise.as(symbols);
        };
        YAMLWorker.prototype._getTextDocument = function (uri) {
            var e_1, _a;
            var models = this._ctx.getMirrorModels();
            try {
                for (var models_1 = __values(models), models_1_1 = models_1.next(); !models_1_1.done; models_1_1 = models_1.next()) {
                    var model = models_1_1.value;
                    if (model.uri.toString() === uri) {
                        return ls.TextDocument.create(uri, this._languageId, model.version, model.getValue());
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return null;
        };
        return YAMLWorker;
    }());
    exports.YAMLWorker = YAMLWorker;
    function create(ctx, createData) {
        return new YAMLWorker(ctx, createData);
    }
    exports.create = create;
});

