# Khazix-Skills

A collection of AI Skills for managing and evolving your skill library. These tools help you create, maintain, and continuously improve AI skills from GitHub repositories.

## Skills Overview

| Skill | Description |
|-------|-------------|
| [github-to-skills](./github-to-skills/) | Convert GitHub repos into AI skills automatically |
| [skill-manager](./skill-manager/) | Manage skill lifecycle - check updates, list, delete |
| [skill-evolution-manager](./skill-evolution-manager/) | Evolve skills based on user feedback and experience |

---

## github-to-skills

**Automated factory for converting GitHub repositories into specialized AI skills.**

### Features
- Fetches repository metadata (README, latest commit hash)
- Creates standardized skill directory structure
- Generates `SKILL.md` with extended frontmatter for lifecycle management
- Creates wrapper scripts for tool invocation

### Usage
```
/github-to-skills <github_url>
```
Or: "Package this repo into a skill: <url>"

### Example
```
/github-to-skills https://github.com/yt-dlp/yt-dlp
```

---

## skill-manager

**Lifecycle manager for GitHub-based skills.**

### Features
- **Audit**: Scan local skills folder for GitHub-based skills
- **Check**: Compare local commit hashes against remote HEAD
- **Report**: Generate status report (Stale/Current)
- **Update**: Guided workflow for upgrading skills
- **Inventory**: List all skills, delete unwanted ones

### Usage
```
/skill-manager check     # Scan for updates
/skill-manager list      # List all skills
/skill-manager delete <name>  # Remove a skill
```

### Scripts
| Script | Purpose |
|--------|---------|
| `scan_and_check.py` | Scan directories, parse frontmatter, check remote versions |
| `update_helper.py` | Backup files before update |
| `list_skills.py` | List installed skills with metadata |
| `delete_skill.py` | Permanently remove a skill |

---

## skill-evolution-manager

**Continuously improve skills based on user feedback and conversation insights.**

### Core Concepts
1. **Session Review**: Analyze skill performance after conversations
2. **Experience Extraction**: Convert feedback into structured `evolution.json`
3. **Smart Stitching**: Persist learned best practices into `SKILL.md`

### Usage
```
/evolve
```
Or: "Save this experience to the skill"

### Workflow
1. **Review**: Agent analyzes what worked/didn't work
2. **Extract**: Creates structured JSON with preferences, fixes, custom prompts
3. **Persist**: Merges into `evolution.json`
4. **Stitch**: Updates `SKILL.md` with learned best practices

### Scripts
| Script | Purpose |
|--------|---------|
| `merge_evolution.py` | Incrementally merge new experience data |
| `smart_stitch.py` | Generate/update best practices section in SKILL.md |
| `align_all.py` | Batch re-stitch all skills after updates |

---

## Installation

1. Clone this repository:
```bash
git clone https://github.com/KKKKhazix/Khazix-Skills.git
```

2. Copy desired skills to your Claude skills directory:
```bash
# Windows
copy /E Khazix-Skills\github-to-skills %USERPROFILE%\.claude\skills\

# macOS/Linux
cp -r Khazix-Skills/github-to-skills ~/.claude/skills/
```

3. Restart Claude to load the new skills.

---

## Requirements

- Python 3.8+
- Git (for checking remote repositories)
- PyYAML (`pip install pyyaml`)

---

## How It Works

```
+------------------+     +----------------+     +------------------------+
| github-to-skills | --> | skill-manager  | --> | skill-evolution-manager|
+------------------+     +----------------+     +------------------------+
        |                       |                         |
    Create new             Maintain &                 Evolve &
    skills from            update skills              improve based
    GitHub repos                                      on feedback
```

**The Complete Skill Lifecycle:**
1. **Create**: Use `github-to-skills` to wrap a GitHub repo as a skill
2. **Maintain**: Use `skill-manager` to check for updates and upgrade
3. **Evolve**: Use `skill-evolution-manager` to capture learnings and improve

---

## License

MIT

---

## Contributing

Contributions are welcome! Feel free to:
- Report issues
- Submit pull requests
- Share your own skills

---

## Author

**KKKKhazix**

If you find these skills useful, consider giving this repo a star!
