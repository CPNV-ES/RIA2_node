// TODO mettre dans repertoir lib
export class SqlBuilder {

    public insertFaceDetection(ip: any, objectUrl: string, fileName: string, hash: string, result: any): string {
        
        return `
            INSERT INTO \`image\`(\`url\`, \`name\`, \`hash\` ) 
            VALUES ('${objectUrl}', '${fileName}', '${hash}');
            
            INSERT INTO \`analysis\` (\`image_id\`, \`ip\`, \`created_at\`, \`updated_at\`) 
            VALUES (LAST_INSERT_ID(), INET_ATON('${ip}'), NOW(), NOW());
            
            SELECT \`id\` INTO @analysis_id FROM \`analysis\` WHERE \`id\` = LAST_INSERT_ID();
            
            ${result[0].landmarks.map((landmark: any) => `
                INSERT INTO \`object\` ( \`analysis_id\`, \`name\`, \`category\`) 
                VALUES ( @analysis_id, '${landmark.type}', 'landmark');
                    
                SELECT \`id\` INTO @object_id FROM \`object\` WHERE \`id\` = LAST_INSERT_ID();

                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
                VALUES (@object_id, 'position-x', 'number', '${landmark.position.x}'); 

                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`)
                VALUES (@object_id, 'position-y', 'number', '${landmark.position.y}'); 

                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`)
                VALUES (@object_id, 'position-z', 'number', '${landmark.position.z}');      
            `).join("")}


            INSERT INTO \`object\` (\`analysis_id\`, \`name\`, \`category\`)
            VALUES (@analysis_id, 'vertices', 'boundingPoly');

            SELECT \`id\` INTO @object_id FROM \`object\` WHERE \`id\` = LAST_INSERT_ID();

            ${result[0].boundingPoly.vertices.map((vertice: any) => `
                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
                VALUES (@object_id, 'vertice-x', 'number', '${vertice.x}');

                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
                VALUES (@object_id, 'vertice-y', 'number', '${vertice.y}');      
            `).join("")}


            INSERT INTO \`object\` ( \`analysis_id\`, \`name\`, \`category\`) 
            VALUES ( @analysis_id, 'vertices', 'boundingPoly');   
            
            SELECT \`id\` INTO @object_id FROM \`object\` WHERE \`id\` = LAST_INSERT_ID();
        
            ${result[0].fdBoundingPoly.vertices.map((vertice: any) => `
                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
                VALUES ( @object_id, 'vertice-x', 'number', '${vertice.x}');

                INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
                VALUES (@object_id, 'vertice-y', 'number', '${vertice.y}');      
            `).join("")}        

            INSERT INTO \`object\` (\`analysis_id\`, \`name\`, \`category\`) 
            VALUES (@analysis_id, 'meta', 'meta');
            
            SELECT \`id\` INTO @object_id FROM \`object\` WHERE \`id\` = LAST_INSERT_ID();

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
            VALUES (@object_id, 'rollAngle', 'number', '${result[0].rollAngle}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
            VALUES (@object_id, 'panAngle', 'number', '${result[0].panAngle}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
            VALUES (@object_id, 'tiltAngle', 'number', '${result[0].tiltAngle}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
            VALUES (@object_id, 'detectionConfidence', 'number', '${result[0].detectionConfidence}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_number\`) 
            VALUES ( @object_id, 'landmarkingConfidence', 'number', '${result[0].landmarkingConfidence}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'joyLikelihood', 'string', '${result[0].joyLikelihood}');

            INSERT INTO \`attribute\` ( \`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'sorrowLikelihood', 'string', '${result[0].sorrowLikelihood}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'angerLikelihood', 'string', '${result[0].angerLikelihood}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'surpriseLikelihood', 'string', '${result[0].surpriseLikelihood}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'underExposedLikelihood', 'string', '${result[0].underExposedLikelihood}');

            INSERT INTO \`attribute\` (\`object_id\`, \`name\`, \`value_type\`, \`value_string\`) 
            VALUES (@object_id, 'headwearLikelihood', 'string', '${result[0].headwearLikelihood}');

        `;
    }
}
