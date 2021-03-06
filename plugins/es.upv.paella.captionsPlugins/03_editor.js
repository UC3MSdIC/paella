/*

paella.plugins.CaptionsEditorPlugin = Class.create(paella.editor.TrackPlugin,{
	tracks:null,
	selectedTrackItem:null,
	
	checkEnabled:function(onSuccess) {
		var This = this;
		this.tracks = [];
		paella.data.read('captions',{id:paella.initDelegate.getId()},function(data,status) {
			if (data && typeof(data)=='object' && data.captions && data.captions.length>0) {
				This.tracks = data.captions;
			}
			onSuccess(true);
		});
	},

	setup:function() {
		if (paella.utils.language()=="es") {
			var esDict = {
				'Captions':'Subtítulos',
				'Caption':'Subtítulo',
				'Create a new caption in the current position': 'Añade un subtítulo en el instante actual',
				'Delete selected caption': 'Borra el subtítulo seleccionado'
			};
			paella.dictionary.addDictionary(esDict);
		}
	},

	getTrackItems:function() {
		return this.tracks;
	},
	
	getTools:function() {
		return [
			{name:'create',label:paella.dictionary.translate('Create'),hint:paella.dictionary.translate('Create a new caption in the current position')},
			{name:'delete',label:paella.dictionary.translate('Delete'),hint:paella.dictionary.translate('Delete selected caption')}
		];
	},
	
	onToolSelected:function(toolName) {
		if (this.selectedTrackItem && toolName=='delete' && this.selectedTrackItem) {
			paella.events.trigger(paella.events.documentChanged);
			this.tracks.splice(this.tracks.indexOf(this.selectedTrackItem),1);
			return true;
		}
		else if (toolName=='create') {
			paella.events.trigger(paella.events.documentChanged);
			var start = paella.player.videoContainer.currentTime();
			var end = start + 30;
			var id = this.getTrackUniqueId();
			var content = paella.dictionary.translate('Caption');
			this.tracks.push({id:id,s:start,e:end,content:content,name:content});
			return true;
		}
	},
	
	getTrackUniqueId:function() {
		var newId = -1;
		if (this.tracks.length==0) return 1;
		for (var i=0;i<this.tracks.length;++i) {
			if (newId<=this.tracks[i].id) {
				newId = this.tracks[i].id + 1;
			}
		}
		return newId;
	},
	
	getName:function() {
		return "es.upv.paella.editor.trackCaptions";
	},
	
	getTrackName:function() {
		return paella.dictionary.translate("Captions");
	},
	
	getColor:function() {
		return 'rgb(159, 166, 88)';
	},
	
	getTextColor:function() {
		return 'rgb(90,90,90)';
	},
	
	onTrackChanged:function(id,start,end) {
		paella.events.trigger(paella.events.documentChanged);
		var item = this.getTrackItem(id);
		if (item) {
			item.s = start;
			item.e = end;
			this.selectedTrackItem = item;
		}
	},
	
	onTrackContentChanged:function(id,content) {
		paella.events.trigger(paella.events.documentChanged);
		var item = this.getTrackItem(id);
		if (item) {
			item.content = paella.AntiXSS.htmlEscape(content);
			item.name = paella.AntiXSS.htmlEscape(content);
		}
	},
	
	allowEditContent:function() {
		return true;
	},
	
	getTrackItem:function(id) {
		for (var i=0;i<this.tracks.length;++i) {
			if (this.tracks[i].id==id) return this.tracks[i];
		}
	},
	
	contextHelpString:function() {
		if (paella.utils.language()=="es") {
			return "Utiliza esta herramienta para crear, borrar y editar subtítulos. Para crear un subtítulo, selecciona el instante de tiempo haciendo clic en el fondo de la línea de tiempo, y pulsa el botón 'Crear'. Utiliza esta pestaña para editar el texto de los subtítulos";
		}
		else {
			return "Use this tool to create, delete and edit video captions. To create a caption, select the time instant clicking the timeline's background and press 'create' button. Use this tab to edit the caption text.";
		}
	},
	
	onSave:function(success) {
		var data = {
			captions:[]
		};
		for (var i = 0; i<this.tracks.length; ++i) {
			var track = this.tracks[i];
			var trackParams = {};
			for (var key in track) {
				// Avoid write the DOM element
				if (key!='elem') {
					trackParams[key] = track[key];
				}
			}
			data.captions.push(trackParams);
		}
		paella.data.write('captions',{id:paella.initDelegate.getId()},data,function(response,status) {
			paella.plugins.captionsPlayerlugin.captions = data.captions;
			success(status);
		});

		if (data.captions.length >= 1) paella.plugins.activeCaptionsPlugin.setButtonEnabled(true);
      	else paella.plugins.activeCaptionsPlugin.setButtonEnabled(false);
	}
});

paella.plugins.captionsEditorPlugin = new paella.plugins.CaptionsEditorPlugin();

*/
