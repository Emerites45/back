
module.exports = (sequelize,DataTypes)=> {

    return sequelize.define('pdfs_formation',
    {
         
        
        id_pdf:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_formation: {
            type: DataTypes.INTEGER,
            allowNull:false,
           
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: {msg: 'Le nom ne doit pas être vide'},
              notNull: {msg: 'Le nom est une propriété requise'}
            }},

            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: {msg: 'Le path ne doit pas être vide'},
                  notNull: {msg: 'Le path est une propriété requise'}
                }},

                chemin:{
                    type: DataTypes.TEXT,
                   
                    unique:{
                       msg: 'ce chemin  est deja pris' 
                    },
                }, 
   
   

},
{
    timestamps:true,
    createdAt:'date_img',
    updatedAt:false
}
    )}