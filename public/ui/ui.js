Ext.onReady(function(){
	store = Ext.create('Ext.data.ArrayStore', {
		fields:['id', 'sid', 'category', 'label', 'artist'],
		proxy: {
			type: 'ajax',
			url: '/songlists.json',
			reader: {
				type: 'json',
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
								flex: 0.2,							
							},
							{
								xtype:'label',
								text:'類型(選擇)',
								margin: '0 5 0 5'
							},
							{
								id:'search_category',
								xtype:'textfield',
								flex: 0.2,							
							},
							{
								xtype:'label',
								text:'歌名關鍵字',
								margin: '0 5 0 5'
							},
							{
								id:'search_keyword',
								xtype:'textfield',
								flex: 2,
								listeners: {
									change:{
            									element: 'el',
										fn:search
									}
								}
							},
							{
								text: '搜尋',
								iconCls: 'icon-search',
								width: 200,
								flex: 0.5,
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
var search=function(){
	var _store=Ext.getCmp('main_grid').store;
	
	var _proxy=_store.getProxy();
	_proxy.extraParams={
		sid:Ext.getCmp('search_sid').value,
		category:Ext.getCmp('search_category').value,
		keyword:Ext.getCmp('search_keyword').value
	};

	_store.load();
}