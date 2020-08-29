/**
 *  自定义网站配置
 */
const config = {
  title: "uuui 导航", //write your website title
  subtitle: "快速帮你获取 UI 项目", //write your website subtitle
  logo_icon: "sitemap", //select your logo by semantic-ui icon (you can get more msg in:https://semantic-ui.com/elements/icon.html)
  hitokoto: false, //use hitokoto or not
  search: true, //enable search function
  search_engine: [
    //choose search engine which you use
    {
      name: "谷 歌（镜像）",
      template:
        "https://jpso.azurewebsites.net/search?source=hp&ei=Ou1JX6PWMMi2mAWcnLmoAg&q=$s",
    },
    {
      name: "多 吉",
      template: "https://www.dogedoge.com/results?q=$s",
    },
    {
      name: "必 应",
      template: "https://www.bing.com/search?q=$s",
    },
    {
      name: "searX",
      template: "https://searx.laquadrature.net/?q=$s",
    },
  ],
  selling_ads: false, //Selling your domain or not.(turning on may be helpful for selling this domain by showing some ads.)
  sell_info: {
    domain: "example.com",
    price: 500, //domain price
    mon_unit: "yen sign", //monetary unit
    contact: [
      //how to contact you
      {
        type: "envelope", //contact type ("weixin","qq","telegram plane","envelope" or "phone")
        content: "info@example.com",
      },
    ],
  },
  lists: [
    //Url list
    {
      name: "技术",
      icon: "code",
      list: [
        {
          imgurl:
            "https://sh-1258129568.cos.ap-shanghai.myqcloud.com/img/photo-1598555724961-8b5633aaf266.jpeg",
          url: "https://stackoverflow.com/",
          name: "Stack Overflow",
          desc: "开发者问题「交友」网站",
        },
        {
          imgurl:
            "https://sh-1258129568.cos.ap-shanghai.myqcloud.com/img/photo-1598555724961-8b5633aaf266.jpeg",
          url: "https://v2ex.com",
          name: "V2EX",
          desc: "国内开发者划水点",
        },
        {
          imgurl:
            "https://sh-1258129568.cos.ap-shanghai.myqcloud.com/img/photo-1598555724961-8b5633aaf266.jpeg",
          url: "https://github.com/",
          name: "Github",
          desc: "代码托管平台，开源项目集散地",
        },
      ],
    },
  ],
};
const el = (tag, attrs, content) =>
  `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

async function handleRequest(request) {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  };
  return new Response(
    renderHTML(renderIndex(), config.selling_ads ? renderSeller() : null),
    init
  );
}
addEventListener("fetch", (event) => {
  return event.respondWith(handleRequest(event.request));
});

/*通过分析链接 实时获取favicon
 * @url 需要分析的Url地址
 */
function getFavicon(url) {
  if (url.match(/https{0,1}:\/\//)) {
    return (
      "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" +
      url.split("//")[1]
    );
    //return "https://www.google.cn/s2/favicons?sz=64&domain_url=" + url;
  } else {
    return (
      "https://ui-avatars.com/api/?bold=true&size=36&background=0D8ABC&color=fff&rounded=true&name=" +
      url
    );
    //return "https://www.google.cn/s2/favicons?sz=64&domain_url=http://" + url;
  }
}

/** Render Functions
 *  渲染模块函数
 */

function renderIndex() {
  const footer = el(
    "footer",
    [],
    el(
      "div",
      ['class="footer"'],
      "Powered by" +
        el(
          "a",
          [
            'class="ui label"',
            'href="https://github.com/sleepwood/cf-worker-dir"',
            'target="_blank"',
          ],
          el("i", ['class="github icon"'], "") + "Cf-Worker-Dir"
        ) +
        " &copy; Base on " +
        el(
          "a",
          ['class="ui label"'],
          el("i", ['class="balance scale icon"'], "") + "MIT License"
        )
    )
  );
  return renderHeader() + renderMain() + footer;
}

function renderHeader() {
  const item = (template, name) =>
    el("a", ['class="item"', `data-url="${template}"`], name);

  var nav = el(
    "div",
    ['class="ui large secondary inverted menu"'],
    el("div", ['class="item"'], el("p", ['id="hitokoto"'], "条条大路通罗马"))
  );
  var title = el(
    "h1",
    ['class="ui inverted header"'],
    el("i", [`class="${config.logo_icon} icon"`], "") +
      el(
        "div",
        ['class="content"'],
        config.title + el("div", ['class="sub header"'], config.subtitle)
      )
  );
  var menu = el(
    "div",
    ['id="sengine"', 'class="ui inverted secondary menu"'],
    el("div", ['class="header item"'], "&nbsp;") +
      config.search_engine
        .map((link, key) => {
          if (key == 0) {
            return el(
              "a",
              ['class="active item"', `data-url="${link.template}"`],
              link.name
            );
          } else {
            return item(link.template, link.name);
          }
        })
        .join("")
  );
  var input = el(
    "div",
    ['class="ui left corner labeled right icon fluid large input"'],
    el(
      "div",
      ['class="ui left"'],
      el("img", ['id=""', 'class=""', 'src=""'], "")
    ) +
      el(
        "input",
        [
          'id="searchinput"',
          'type="search"',
          'placeholder="搜索你想要知道的……"',
          'autocomplete="o"',
        ],
        ""
      ) +
      el("i", ['class="inverted circular search link icon"'], "")
  );
  return el(
    "header",
    [],
    el(
      "div",
      [
        'id="head"',
        'class="ui inverted vertical masthead center aligned segment"',
      ],
      (config.hitokoto
        ? el("div", ['id="nav"', 'class="ui container"'], nav)
        : "") +
        el(
          "div",
          ['id="title"', 'class="ui text container"'],
          title +
            (config.search ? input + menu : "") +
            `${
              config.selling_ads
                ? '<div><a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a></div>'
                : ""
            }`
        )
    )
  );
}

function renderMain() {
  var main = config.lists
    .map((item) => {
      const card = (imgurl, url, name, desc) =>
        el(
          "a",
          ['class="card"', `href=${url}`, 'target="_blank"'],
          el("img", ['class="ui image"', `src=${imgurl}`], "") +
            el(
              "div",
              ['class="content"'],
              el(
                "img",
                [
                  'class="left floated avatar ui image"',
                  `src = ${getFavicon(url)}`,
                ],
                ""
              ) +
                el("div", ['class="header"'], name) +
                el("div", ['class="meta"'], desc)
            )
        );

      const divider = el(
        "h4",
        ['class="ui horizontal divider header"'],
        el("i", [`class= "${item.icon} icon"`], "") + item.name
      );

      var content = el(
        "div",
        ['class="ui four stackable cards"'],
        item.list
          .map((link) => {
            return card(link.imgurl, link.url, link.name, link.desc);
          })
          .join("")
      );

      return el("div", ['class="ui basic segment"'], divider + content);
    })
    .join("");

  return el("main", [], el("div", ['class="ui container"'], main));
}

function renderHTML(index, seller) {
  return (
    `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>${config.title} - ${config.subtitle}</title>
              <link href="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.css" rel="stylesheet">
                <link href="https://cdn.jsdelivr.net/gh/STANAPO/CF-Worker-Dir-master@master/style.css" rel="stylesheet">
                  <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
                  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-css@2.4.1/semantic.min.js"></script>
  </head>
                <body>
                  ${index}
                  <!-- ${config.selling_ads ? seller : ""} -->
    <!-- <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script> -->
    <script>
                    $('#sengine a').on('click', function (e) {
                      $('#sengine a.active').toggleClass('active');
                    $(e.target).toggleClass('active');
        $('#search-fav').attr('src',$(e.target).data('url').match(` +
    /https{0,1}:\/\/\S+\// +
    `)[0] + '/favicon.ico') ;
                  });
      $('.search').on('click', function (e) {
          var url = $('#sengine a.active').data('url');
                    url = url.replace(` +
    /\$s/ +
    `,$('#searchinput').val());
                    window.open(url);
                });
                /* 鼠标聚焦时，回车事件 */
      $("#searchinput").bind("keypress", function(){
          if (event.keyCode == 13){
                      // 触发需要调用的方法
                      $(".search").click();
                    }
                });
      $('#menubtn').on('click', function (e) {
                      $('#seller').modal('show');
                    });
    </script>
                </body>
  </html>`
  );
}
