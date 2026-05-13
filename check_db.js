const { Client } = require('pg');

async function checkStandardDetail() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'calibration',
        password: '349224',
        port: 5432,
    });

    try {
        await client.connect();
        
        // 1. Get the latest task with equipment name
        const resTask = await client.query(`
            SELECT t.id, t.pm_no, t.status, e.name as equip_name 
            FROM tasks t
            LEFT JOIN equipment e ON t.equipment_id = e.id
            ORDER BY t.id DESC LIMIT 1
        `);
        if (resTask.rows.length === 0) {
            console.log('No tasks found.');
            return;
        }
        const taskId = resTask.rows[0].id;
        const equipName = resTask.rows[0].equip_name;
        console.log(`Latest Task ID: ${taskId}, PM No: ${resTask.rows[0].pm_no}, Equipment: "${equipName}"`);

        // 2. Check settings for this equipment name
        const resSettings = await client.query('SELECT parameter_name, standard_tool_id FROM calibration_settings WHERE equipment_name = $1', [equipName]);
        console.log(`Found ${resSettings.rows.length} settings for equipment "${equipName}":`);
        console.table(resSettings.rows);

        // 2. Check standard_detail for this task
        const resDetail = await client.query('SELECT * FROM standard_detail WHERE task_id = $1', [taskId]);
        console.log(`Found ${resDetail.rows.length} standard tools for this task:`);
        console.table(resDetail.rows);

    } catch (err) {
        console.error('Error connecting to DB:', err);
    } finally {
        await client.end();
    }
}

checkStandardDetail();
