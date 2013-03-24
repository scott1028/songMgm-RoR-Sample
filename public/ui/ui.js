Ext.onReady(function(){
	store = Ext.create('Ext.data.Store', {
		fields:['id', 'sid', 'category', 'label', 'artist'],
		proxy: {
			type: 'ajax',
			url: '/songlists.json',
			reader: {
				type: 'json',
				root: 'data'
			}
		},
		autoLoad:true
	});

	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [
			{
				id:'main_grid',
				xtype:'grid',
				region:'center',
				columns: [
					{
						width: 40,
						xtype: 'rownumberer'
					},
					{
						text: '編號',
						flex: 1,
						sortable: false,
						dataIndex: 'sid',
						sortable: true
					},
					{
						text: '類型',
						flex: 1,
						sortable: false,
						dataIndex: 'category',
						sortable: true
					},
					{
						text: '歌名',
						flex: 3,
						sortable: false,
						dataIndex: 'label',
						sortable: true
					},
					{
						text: '作者',
						flex: 1,
						sortable: false,
						dataIndex: 'artist',
						sortable: true
					},
				],
				store: store,
				dockedItems: [
					{
						xtype: 'toolbar',
						dock: 'top',
						items: [
							{
								xtype:'label',
								text:'編號(選擇)',
								margin: '0 5 0 5'
							},
							{
								id:'search_sid',
								xtype:'textfield',
								//flex: 1,
								width: 50,
								listeners: {
									keypress:{
            									element: 'el',
										fn:search
									}
								}
							},
							{
								xtype:'label',
								text:'類型(選擇)',
								margin: '0 5 0 5'
							},
							{
								id:'search_category',
								xtype:'combobox',
								//flex: 1,
								width: 100,
								listeners: {
									keypress:{
            									element: 'el',
										fn:search
									}
								},
								store: ["3","7","A","C","D","E","F","G","H","J","K","M","O","P","Q","T","V","X","Y","Z"].sort()
							},
							{
								xtype:'label',
								text:'歌名關鍵字',
								margin: '0 5 0 5'
							},
							{
								id:'search_keyword',
								xtype:'textfield',
								flex: 1,
								listeners: {
									keypress:{
            									element: 'el',
										fn:search
									}
								}
							},
							{
								text: '<b>搜尋</b>',
								iconCls: 'icon-search',
								width: 100,
								handler:search
							}
						]
					}
				]
			}
		]
	});
});

//處裡搜尋的部分
var search=function(event,dom,cmp){
	if(event.button==12 || event.button==undefined){
		var _store=Ext.getCmp('main_grid').store;
		
		var _proxy=_store.getProxy();
		_proxy.extraParams={
			sid:Ext.getCmp('search_sid').value,
			category:Ext.getCmp('search_category').value,
			keyword:Ext.getCmp('search_keyword').value
		};

		_store.load();
	}
}