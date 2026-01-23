import uuid
from datetime import datetime, timedelta
from app.models.database import SessionLocal, engine
from app.models.models import Event, Base

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def seed_events():
    db = SessionLocal()
    
    # Clean up existing events to avoid duplicates and ensure fresh data
    db.query(Event).delete()
    db.commit()
    print("Cleaned up existing events.")
    
    # 20 Mock Events (Political, Economic, Tech, Cultural) with focus on AI
    events_data = [
        # --- AI & Tech (Focus: 8-10 events) ---
        {
            "title": "OpenAI 发布 GPT-5 预览版，推理能力大幅提升",
            "content": "OpenAI 今日意外发布了 GPT-5 的早期预览版本，并在基准测试中展现了惊人的逻辑推理能力。新模型在数学奥赛和代码生成任务上的表现超越了人类专家水平。行业分析师认为，这将进一步加速 AGI 的到来，并对现有 SaaS 软件生态造成巨大冲击。",
            "source": "TechCrunch CN",
            "url": "https://techcrunch.cn/2026/01/22/openai-gpt-5-preview",
            "category": "Tech"
        },
        {
            "title": "谷歌 DeepMind 推出新一代机器人基础模型",
            "content": "谷歌 DeepMind 团队展示了名为 'Robo-X' 的通用机器人基础模型。该模型允许机器人通过观察人类视频快速学习新技能，无需复杂的编程。演示视频中，机器人成功完成了折叠衣物、烹饪简单菜肴等任务。这标志着具身智能领域的一大突破。",
            "source": "Google Blog",
            "url": "https://blog.google/technology/ai/deepmind-robo-x",
            "category": "Tech"
        },
        {
            "title": "英伟达发布 H200 AI 芯片，算力再次翻倍",
            "content": "在今天的 GTC 大会上，英伟达 CEO 黄仁勋发布了新一代 H200 AI 加速卡。凭借采用全新的显存技术，H200 在大模型推理任务上的速度比 H100 提升了近两倍。英伟达股价应声大涨 5%，市值逼近新的里程碑。",
            "source": "Bloomberg CN",
            "url": "https://bloomberg.cn/news/nvidia-h200-launch",
            "category": "Tech"
        },
        {
            "title": "微软宣布将 Copilot 深度集成至 Windows 13 核心",
            "content": "微软官方确认，下一代操作系统 Windows 13 将从内核层面集成 AI Copilot。用户可以通过自然语言完全控制操作系统，包括文件管理、系统设置和故障排查。此举引发了关于隐私和安全的新一轮讨论。",
            "source": "The Verge CN",
            "url": "https://theverge.cn/microsoft-windows-13-copilot",
            "category": "Tech"
        },
        {
            "title": "苹果 Siri 迎来重大升级，基于端侧大模型重构",
            "content": "苹果在 WWDC 上展示了全新的 Siri，完全基于本地运行的小型大语言模型重构。新版 Siri 能够理解复杂的上下文指令，并跨应用执行任务，且无需联网，最大程度保护用户隐私。这被视为苹果在 AI 时代的重要反击。",
            "source": "Apple Newsroom",
            "url": "https://apple.com.cn/newsroom/siri-ai-upgrade",
            "category": "Tech"
        },
        {
            "title": "Meta 开源 Llama 4，参数量高达 400B",
            "content": "Meta 继续坚持开源路线，发布了 Llama 4 系列模型，其中最大的版本参数量达到 4000 亿。扎克伯格表示，开源 AI 将是未来创新的关键。社区开发者对此反应热烈，认为这将打破闭源模型的垄断地位。",
            "source": "Meta AI Blog",
            "url": "https://ai.meta.com/blog/llama-4-release",
            "category": "Tech"
        },
        {
            "title": "特斯拉 FSD V13获批在中国全面落地",
            "content": "据知情人士透露，特斯拉的全自动驾驶（FSD）V13 版本已获得中国监管部门的初步批准，将在上海和深圳进行大规模测试。如果测试顺利，预计将在年底前向所有中国用户推送。这将加剧国内自动驾驶市场的竞争。",
            "source": "Caixin Global",
            "url": "https://caixin.com/tesla-fsd-china-approval",
            "category": "Tech"
        },
        {
            "title": "Anthropic 获得亚马逊追加 40 亿美元投资",
            "content": "AI 初创公司 Anthropic 宣布获得亚马逊追加的 40 亿美元投资，双方将深化在云计算和芯片领域的合作。Anthropic 的 Claude 模型将优先部署在 AWS 的 Trainium 芯片上，以降低训练成本。",
            "source": "Reuters CN",
            "url": "https://reuters.cn/amazon-anthropic-investment",
            "category": "Tech"
        },
        {
            "title": "AI 换脸诈骗涉案金额破亿，多国联合打击",
            "content": "国际刑警组织宣布破获一起跨国 AI 换脸诈骗案，涉案金额高达 1.5 亿美元。犯罪团伙利用生成式 AI 伪造公司高管视频会议，诱导财务人员转账。各国政府呼吁加强 AI 监管立法。",
            "source": "BBC News CN",
            "url": "https://bbc.com/zhongwen/ai-deepfake-scam",
            "category": "Tech"
        },
        
        # --- Political (3 events) ---
        {
            "title": "联合国通过首个全球 AI 治理框架决议",
            "content": "联合国大会今日全票通过了关于人工智能治理的决议，确立了“以人为本、智能向善”的全球原则。决议呼吁各国在 AI 军事应用上保持克制，并建立国际合作机制以防止技术滥用。",
            "source": "UN News",
            "url": "https://news.un.org/zh/story/2026/01/ai-resolution",
            "category": "Political"
        },
        {
            "title": "欧盟正式实施《人工智能法案》，违者面临巨额罚款",
            "content": "经过两年的讨论，欧盟《人工智能法案》于今日正式生效。法案根据风险等级对 AI 应用进行分类管理，禁止使用实时生物特征识别等高风险技术。违规企业最高可被处以全球营业额 7% 的罚款。",
            "source": "Euronews",
            "url": "https://euronews.com/eu-ai-act-implementation",
            "category": "Political"
        },
        {
            "title": "G20 峰会聚焦全球供应链重构与数字经济税收",
            "content": "在里约热内卢举行的 G20 峰会上，各国领导人就全球供应链的多元化达成共识。同时，关于跨国数字巨头的最低税率协议也取得了实质性进展，旨在解决数字经济时代的税基侵蚀问题。",
            "source": "CCTV News",
            "url": "https://news.cctv.com/g20-summit-supply-chain",
            "category": "Political"
        },

        # --- Economic (4 events) ---
        {
            "title": "美联储宣布降息 25 个基点，暗示紧缩周期结束",
            "content": "美联储在最新的议息会议上宣布将联邦基金利率下调 25 个基点。鲍威尔在发布会上表示，通胀已得到有效控制，经济软着陆的可能性增加。全球股市对此反应积极，主要指数全线上扬。",
            "source": "WSJ CN",
            "url": "https://wsj.com/zh/fed-rate-cut-jan-2026",
            "category": "Economic"
        },
        {
            "title": "中国前三季度 GDP 增长 5.2%，高技术制造业领跑",
            "content": "国家统计局发布数据显示，前三季度中国 GDP 同比增长 5.2%，略超市场预期。其中，新能源汽车、太阳能电池和工业机器人等高技术制造业增长迅猛，成为推动经济转型的新引擎。",
            "source": "Xinhua",
            "url": "https://xinhuanet.com/economy/gdp-q3-2025",
            "category": "Economic"
        },
        {
            "title": "原油价格受地缘政治影响大幅波动，突破 90 美元",
            "content": "受中东局势紧张影响，布伦特原油期货价格今日盘中一度突破 90 美元大关。分析人士担心，如果冲突进一步升级，可能引发新一轮能源危机，推高全球通胀预期。",
            "source": "Financial Times CN",
            "url": "https://ftchinese.com/oil-prices-surge-geopolitics",
            "category": "Economic"
        },
        {
            "title": "全球加密货币市场回暖，比特币重返 6 万美元",
            "content": "随着现货 ETF 获批带来的资金流入，加密货币市场近期持续回暖。比特币价格今日重新站上 60,000 美元关口，以太坊等主流代币也跟随上涨。机构投资者对数字资产的兴趣正在复苏。",
            "source": "CoinDesk",
            "url": "https://coindesk.com/bitcoin-reclaims-60k",
            "category": "Economic"
        },

        # --- Cultural (4 events) ---
        {
            "title": "AI 生成画作获得威尼斯双年展金狮奖引发争议",
            "content": "在今年的威尼斯艺术双年展上，一幅由 AI 辅助创作的油画意外获得金狮奖。评委会称赞其“拓展了艺术的边界”，但传统艺术家群体对此表示强烈抗议，认为这削弱了人类创造力的价值。",
            "source": "ArtNet",
            "url": "https://artnet.com/venice-biennale-ai-art-winner",
            "category": "Cultural"
        },
        {
            "title": "巴黎圣母院修复工程完工，重新向公众开放",
            "content": "历经近七年的修复，巴黎圣母院终于在火灾后涅槃重生，于今日重新向全球游客开放。修复团队采用了传统工艺与现代数字建模技术相结合的方法，完美还原了这座哥特式建筑的辉煌。",
            "source": "Le Monde",
            "url": "https://lemonde.fr/notre-dame-reopening",
            "category": "Cultural"
        },
        {
            "title": "好莱坞编剧工会与制片方达成关于 AI 使用的协议",
            "content": "经过长达数月的谈判，好莱坞编剧工会（WGA）与制片方终于就 AI 在剧本创作中的使用范围达成协议。协议规定，AI 生成的内容不能作为“文学材料”，且必须署名人类编剧。这为创意产业的 AI 规范树立了标杆。",
            "source": "Variety",
            "url": "https://variety.com/wga-ai-deal-reached",
            "category": "Cultural"
        },
        {
            "title": "中国科幻电影《三体：黑暗森林》定档春节",
            "content": "备受期待的国产科幻巨制《三体：黑暗森林》宣布定档大年初一。预告片中展示的“水滴”攻击场面视觉效果震撼，被誉为中国电影工业化的新高度。影迷对此次改编寄予厚望。",
            "source": "Mtime",
            "url": "https://mtime.com/three-body-dark-forest-release",
            "category": "Cultural"
        }
    ]
    
    added_count = 0
    base_time = datetime.now()
    
    for i, event_data in enumerate(events_data):
        # Stagger published_at times
        pub_time = base_time - timedelta(hours=i*2)
        
        event = Event(
            id=str(uuid.uuid4()),
            title=event_data["title"],
            content=event_data["content"],
            source=event_data["source"],
            published_at=pub_time,
            url=event_data["url"],
            analysis_status="pending"
        )
        db.add(event)
        added_count += 1
        
    db.commit()
    print(f"Successfully added {added_count} events.")
    db.close()

if __name__ == "__main__":
    seed_events()
