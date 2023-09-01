/**
 * Minified by jsDelivr using Terser v5.15.1.
 * Original file: /npm/@tinymce/tinymce-webcomponent@2.0.2/dist/tinymce-webcomponent.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function() {
	"use strict";
	const t = "undefined" != typeof window ? window : Function("return this;")(),
		e = (e, o) => ((e, o) => {
			let n = null != o ? o : t;
			for (let t = 0; t < e.length && null != n; ++t) n = n[e[t]];
			return n
		})(e.split("."), o),
		o = Object.keys,
		n = Object.hasOwnProperty,
		s = (t, e) => n.call(t, e);
	let i = 0;
	const r = t => {
			const e = (new Date).getTime(),
				o = Math.floor(1e9 * Math.random());
			return i++, t + "_" + o + i + String(e)
		},
		a = () => ({
			listeners: [],
			scriptId: r("tiny-script"),
			scriptLoaded: !1
		}),
		l = (() => {
			let t = a();
			return {
				load: (e, o, n) => {
					t.scriptLoaded ? n() : (t.listeners.push(n), e.getElementById(t.scriptId) || ((t, e, o, n) => {
						const s = e.createElement("script");
						s.referrerPolicy = "origin", s.type = "application/javascript", s.id = t, s.src = o;
						const i = () => {
							s.removeEventListener("load", i), n()
						};
						s.addEventListener("load", i), e.head && e.head.appendChild(s)
					})(t.scriptId, e, o, (() => {
						t.listeners.forEach((t => t())), t.scriptLoaded = !0
					})))
				},
				reinitialize: () => {
					t = a()
				}
			}
		})();
	var d;
	! function(t) {
		t[t.Raw = 0] = "Raw", t[t.Initializing = 1] = "Initializing", t[t.Ready = 2] = "Ready"
	}(d || (d = {}));
	const u = (t, e) => {
			const o = e.closest(t);
			if (null !== o) return o;
			const n = e.getRootNode().host;
			return null != n ? u(t, n) : null
		},
		h = t => e => ((t, e) => s(t, e))(t, e) ? t[e] : e,
		c = e,
		m = t => t,
		_ = h({
			false: !1
		}),
		p = h({
			true: !0,
			false: !1
		}),
		f = t => /^\d+$/.test(t) ? Number.parseInt(t, 10) : t,
		g = {
			setup: c,
			toolbar: _,
			menubar: _,
			plugins: m,
			content_css: m,
			content_style: m,
			width: f,
			height: f,
			toolbar_mode: m,
			contextmenu: _,
			quickbars_insert_toolbar: _,
			quickbars_selection_toolbar: _,
			powerpaste_word_import: m,
			powerpaste_html_import: m,
			powerpaste_allow_local_images: p,
			resize: p,
			skin: m,
			skin_url: m,
			images_upload_url: m,
			images_upload_handler: c,
			images_upload_base_path: m,
			images_upload_credentials: p,
			images_reuse_filename: p,
			icons: m,
			icons_url: m,
			promotion: p
		},
		v = {};
	class b extends HTMLElement {
		static get formAssociated() {
			return !0
		}
		static get observedAttributes() {
			return ["form", "readonly", "autofocus", "placeholder"].concat(["on-BeforePaste", "on-Blur", "on-Click", "on-ContextMenu", "on-Copy", "on-Cut", "on-Dblclick", "on-Drag", "on-DragDrop", "on-DragEnd", "on-DragGesture", "on-DragOver", "on-Drop", "on-Focus", "on-FocusIn", "on-FocusOut", "on-KeyDown", "on-KeyPress", "on-KeyUp", "on-MouseDown", "on-MouseEnter", "on-MouseLeave", "on-MouseMove", "on-MouseOut", "on-MouseOver", "on-MouseUp", "on-Paste", "on-SelectionChange"]).concat(["on-Activate", "on-AddUndo", "on-BeforeAddUndo", "on-BeforeExecCommand", "on-BeforeGetContent", "on-BeforeRenderUI", "on-BeforeSetContent", "on-Change", "on-ClearUndos", "on-Deactivate", "on-Dirty", "on-ExecCommand", "on-GetContent", "on-Hide", "on-Init", "on-LoadContent", "on-NodeChange", "on-PostProcess", "on-PostRender", "on-PreProcess", "on-ProgressState", "on-Redo", "on-Remove", "on-Reset", "on-SaveContent", "on-SetAttrib", "on-ObjectResizeStart", "on-ObjectResized", "on-ObjectSelected", "on-SetContent", "on-Show", "on-Submit", "on-Undo", "on-VisualAid"])
		}
		constructor() {
			super(), this._eventAttrHandler = t => {
				t.forEach((t => {
					var e;
					"attributes" === t.type && t.target === this && (null === (e = t.attributeName) || void 0 === e ? void 0 : e.toLowerCase().startsWith("on-")) && this._updateEventAttr(t.attributeName, this.getAttribute(t.attributeName))
				}))
			}, this._formDataHandler = t => {
				const e = this.name;
				if (null != e) {
					const o = this.value;
					if (null != o) {
						t.formData.append(e, o)
					}
				}
			}, this._status = d.Raw, this._shadowDom = this.attachShadow({
				mode: "open"
			}), this._form = null, this._eventHandlers = {}, this._mutationObserver = new MutationObserver(this._eventAttrHandler)
		}
		_updateEventAttr(t, o) {
			const n = t.substring("on-".length).toLowerCase(),
				s = null !== o ? e(o) : void 0,
				i = "function" == typeof s ? s : void 0;
			this._eventHandlers[n] !== i && (this._editor && this._eventHandlers[n] && this._editor.off(n, this._eventHandlers[n]), i ? (this._editor && this._editor.on(n, i), this._eventHandlers[n] = i) : delete this._eventHandlers[n])
		}
		_updateForm() {
			if (this.isConnected) {
				const t = this.getAttribute("form"),
					e = null !== t ? this.ownerDocument.querySelector("form#" + t) : u("form", this);
				this._form !== e && (null !== this._form && this._form.removeEventListener("formdata", this._formDataHandler), this._form = e, null !== this._form && this._form.addEventListener("formdata", this._formDataHandler))
			} else null !== this._form && (this._form.removeEventListener("formdata", this._formDataHandler), this._form = null)
		}
		_getTinymce() {
			return t.tinymce
		}
		_getConfig() {
			var t, e;
			const o = null !== (e = c(null !== (t = this.getAttribute("config")) && void 0 !== t ? t : "")) && void 0 !== e ? e : {};
			for (let t = 0; t < this.attributes.length; t++) {
				const e = this.attributes.item(t);
				if (null !== e && s(g, e.name)) {
					o[s(v, e.name) ? v[e.name] : e.name] = g[e.name](e.value)
				}
			}
			return this.readonly && (o.readonly = !0), this.autofocus && (o.auto_focus = !0), delete o.target, delete o.selector, o
		}
		_getEventHandlers() {
			const t = {};
			for (let o = 0; o < this.attributes.length; o++) {
				const n = this.attributes.item(o);
				if (null !== n && n.name.toLowerCase().startsWith("on-")) {
					const o = n.name.toLowerCase().substring("on-".length),
						s = e(n.value);
					"function" == typeof s && (t[o] = s)
				}
			}
			return t
		}
		_doInit() {
			var t;
			this._status = d.Initializing;
			const e = document.createElement("textarea");
			e.value = null !== (t = this.textContent) && void 0 !== t ? t : "", null !== this.placeholder && (e.placeholder = this.placeholder), this._shadowDom.appendChild(e);
			const n = this._getConfig(),
				s = Object.assign(Object.assign({}, n), {
					target: e,
					setup: t => {
						this._editor = t, t.on("init", (t => {
							this._status = d.Ready
						})), t.on("SwitchMode", (t => {
							this.readonly = this.readonly
						})), ((t, e) => {
							const n = o(t);
							for (let o = 0, s = n.length; o < s; o++) {
								const s = n[o];
								e(t[s], s)
							}
						})(this._eventHandlers, ((e, o) => {
							void 0 !== e && t.on(o, e)
						})), "function" == typeof n.setup && n.setup(t)
					}
				});
			this._getTinymce().init(s)
		}
		_getTinymceSrc() {
			var t;
			const e = this.getAttribute("src");
			if (e) return e;
			const o = null !== (t = this.getAttribute("channel")) && void 0 !== t ? t : "6";
			return `https://cdn.tiny.cloud/1/${this.hasAttribute("api-key")?this.getAttribute("api-key"):"no-api-key"}/tinymce/${o}/tinymce.min.js`
		}
		_loadTinyDoInit() {
			this._getTinymce() ? this._doInit() : l.load(this.ownerDocument, this._getTinymceSrc(), (() => this._doInit()))
		}
		attributeChangedCallback(t, e, o) {
			e !== o && ("form" === t ? this._updateForm() : "readonly" === t ? this.readonly = null !== o : "autofocus" === t ? this.autofocus = null !== o : "placeholder" === t ? this.placeholder = o : t.toLowerCase().startsWith("on-") && this._updateEventAttr(t, o))
		}
		connectedCallback() {
			this._eventHandlers = this._getEventHandlers(), this._mutationObserver.observe(this, {
				attributes: !0,
				childList: !1,
				subtree: !1
			}), this._updateForm(), this._status === d.Raw && this._loadTinyDoInit()
		}
		disconnectedCallback() {
			this._mutationObserver.disconnect(), this._updateForm()
		}
		get value() {
			var t, e;
			return null !== (e = this._status === d.Ready ? null === (t = this._editor) || void 0 === t ? void 0 : t.getContent() : void 0) && void 0 !== e ? e : null
		}
		set value(t) {
			var e;
			this._status === d.Ready && null != t && (null === (e = this._editor) || void 0 === e || e.setContent(t))
		}
		get readonly() {
			return this._editor ? "readonly" === this._editor.mode.get() : this.hasAttribute("readonly")
		}
		set readonly(t) {
			t ? (this._editor && "readonly" !== this._editor.mode.get() && this._editor.mode.set("readonly"), this.hasAttribute("readonly") || this.setAttribute("readonly", "")) : (this._editor && "readonly" === this._editor.mode.get() && this._editor.mode.set("design"), this.hasAttribute("readonly") && this.removeAttribute("readonly"))
		}
		get placeholder() {
			return this.getAttribute("placeholder")
		}
		set placeholder(t) {
			if (this._editor) {
				const e = this._editor.getElement();
				null !== e && (null !== t ? e.setAttribute("placeholder", t) : e.removeAttribute("placeholder"))
			}
			null !== t ? this.getAttribute("placeholder") !== t && this.setAttribute("placeholder", t) : this.hasAttribute("placeholder") && this.removeAttribute("placeholder")
		}
		get autofocus() {
			return this.hasAttribute("autofocus")
		}
		set autofocus(t) {
			t ? this.hasAttribute("autofocus") || this.setAttribute("autofocus", "") : this.hasAttribute("autofocus") && this.removeAttribute("autofocus")
		}
		get form() {
			return this._form
		}
		get name() {
			return this.getAttribute("name")
		}
		get type() {
			return this.localName
		}
	}
	window.customElements.define("tinymce-editor", b)
}();
//# sourceMappingURL=/sm/2757ad9e2d77b84e09d0b2e3ddcb82886320c3b584025ef417b9bd48b5ab78f0.map