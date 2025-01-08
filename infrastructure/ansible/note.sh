ansible all -i inventory.yml -m ping
ansible soda_server -i inventory.yml -m ping

ansible-playbook -i inventory.yml playbook/setup_server.yml
