
/**
 * zh-CN.js
 *
 * i18n file
 */

module.exports = {
	'common': {
		'title': '买么（买买买）'
		, 'description': '「买么」是全球首家关注「产品信仰」的社区。欢迎你与我们一道，分享独特的「消费文化」。'
		, 'app-title': '买么'
		, 'domain': 'mai3.me'
		, 'tagline': '传播产品信仰 分享消费文化'
	}
	, 'menu': {
		'nav': {
			'home': '首页'
			, 'club': '我的社团'
			, 'ranking': '排行榜'
			, 'help': '使用指南'
			, 'toggle': '导航'
		}
		, 'login': {
			'twitter': '登录'
			, 'github': '登录'
		}
	}
	, 'main': {
		'line-1': '虽然我们还不知道'
		, 'line-2': '它会有什么功能'
		, 'line-3': '但我们隐约之中'
		, 'line-4': '已经感到它光明的未来'
		, 'thanks': '感谢注册，请静候本站的变化'
		, 'oauth-error': 'OAuth 登陆失败'
		, 'login': '请在登录后访问这个功能'
	}
	, 'error': {
		'status-code': 'Error %{code}'
		, 'not-found': 'Error 404'
		, 'internal-server': 'Error 500'
		, 'forbidden': 'Error 403'
		, 'internal-service-down': '非常抱歉，看来我们的内部服务出了点问题'
		, 'access-control': '看来你没有权限执行这个操作'
		, 'invalid-csrf-token': '你提交的内容缺乏验证用的安全Token，请慎防第三方页面诈骗'
		, 'not-found-page': '你要找的页面不存在'
		, 'not-found-user': '你要找的团员不存在'
		, 'not-found-club': '你要找的社团不存在'
		, 'form-required-input-missing': '必填的内容不应为空'
		, 'form-input-invalid': '提交内容的格式不符合要求'
		, 'form-internal-error': '非常抱歉，看来我们的内部服务出了点问题，请重新提交'
		, 'insufficient-action-point': '看来你的信仰值不足执行动作，需要 %{required} 点信仰，你目前只有 %{current} 点'
		, 'oauth-error-response': '请求 %{provider} 访问权限时发生错误，你允许了我们的请求吗？请再次尝试登陆。'
		, 'oauth-error-profile': '请求 %{provider} 用户数据时发生错误，如重复出现，请联系我们反馈错误。'
		, 'oauth-invalid-profile': '请求 %{provider} 时得到了不正确的用户数据，如重复出现，请联系我们反馈错误。'
	}
	, 'user-profile': {
		'from': '来自站点'
		, 'faith': '%{current} / %{base} 点信仰值'
		, 'placeholder-1': '感谢注册，请静候本站的变化。'
		, 'placeholder-2': '等不及？请到 %{feedback} 或 %{developer} 反馈你的好点子！'
	}
	, 'club': {
		'create-button': '创建社团'
		, 'create-message': '你现在可以添加社团了！'
		, 'create-stats': '你还有 %{current} / %{base} 点信仰值，创建新社团需要投入 10 点信仰。'
		, 'search-title': '搜索社团'
		, 'search-placeholder': '至少两个字符'
		, 'search-note': '找不到你想要的东西？尝试搜索简写。'
		, 'search-submit': '提交'
		, 'new-club-intro': '创建社团'
		, 'new-club-help': '欢迎创建属于你的社团，如果这是你第一次尝试创建社团，请务必看看%{help}'
		, 'new-club-title': '社团名称'
		, 'new-club-slug': '社团路径'
		, 'new-club-submit': '确认创建'
		, 'new-club-title-placeholder': '允许2-16个字符'
		, 'new-club-title-note': '示例：Love Live'
		, 'new-club-slug-placeholder': '允许2-16个字符'
		, 'new-club-slug-note': '示例：love-live'
		, 'already-exist': '同路径的社团已存在，请选择另一个路径。'
		, 'does-not-exist': '社团不存在。'
		, 'my-club-list': '我创建的社团 (%{count})'
		, 'my-joined-club-list': '我加入的社团 (%{count})'
		, 'search-club-list': '以 %{search} 开头的社团 (%{count})'
		, 'welcome-to-the-club': '欢迎访问 %{title} 社团！'
		, 'welcome-club-stats': '成为正式社团需要 5 名成员，目前社团有 %{members} 成员。'
		, 'club-owner': '社团创始人'
		, 'join-button': '加入社团'
		, 'leave-button': '退出社团'
		, 'join-stats': '你还有 %{current} / %{base} 点信仰值，加入社团需要投入 2 点信仰。'
		, 'share-button': '分享至Twitter'
		, 'share-button-text': '我创建了一个叫%{title}的社团，却被告知部员要达到5人才能保留，你能来帮忙吗？'
		, 'owner-management': '管理社团'
		, 'owner-management-intro': '欢迎回来，部长。在这里你可以管理社团的各种常见设定：名称、路径、简介、团徽等等。更多功能将随着社团的成长加入！'
		, 'edit-club-submit': '确认修改'
	}
};
