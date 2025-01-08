## ansible

Run setup remote server by step

# Information

- Script: note.sh
- Server information: inventory.ini
- ssh key: folder ssh
- Playbook: step run setup - folder playbook

# Guide

1. Run docker compose up -d => run ansible in container => remote container
2. Edit file config: hosts (inventory), playbook
3. Run command to setup: `ansible-playbook -i inventory.yml playbook/setup_server.yml`
