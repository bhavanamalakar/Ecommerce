module.exports = {
    apps: [
        {
            name: 'bestglobeshop',
            script: 'manage.py',
            args: 'runserver 0.0.0.0:8181',
            interpreter: 'python3',
            instances: 1,
            autorestart: true,
            watch: true, // Set this to true to enable watching for file changes
            max_memory_restart: '1G',
            env: {
                DJANGO_SETTINGS_MODULE: 'bestglobeshop.settings',
                PYTHONUNBUFFERED: '1',
            },
        },
    ],
};
