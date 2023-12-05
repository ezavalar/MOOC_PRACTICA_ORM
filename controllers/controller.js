module.exports = function (models) {
    var module = {};

    let Hospital = models.Hospital;
    let Patient = models.Patient;
    let Doctor = models.Doctor;

    // Buscar todos los hospitales
    module.list_hospitals = async function() {
        // Modificado por Ericka Zavala
        let hospitales= await Hospital.findAll();
        return hospitales;
    }

    // Filtra los hospitales por ciudad
    module.filterHospitalsByCity = async function (city) {
        // Modificado por Ericka Zavala
        let hospitales= await Hospital.findAll({
            where: {city: city}
        });
        return hospitales;
    }

    // Buscar pacientes de un hospital ordenadors por el nombre (de la A a la Z)
    module.list_hospital_patients = async function(hospital_id) {
        // Modificado por Ericka Zavala
        let pacientes= await Patient.findAll({
            where: {hospital_id: hospital_id}
        });
        return pacientes;
    }

    // Muestra la informacion de un paciente
    module.read = async function(patient_id) {
        // Modificado por Ericka Zavala
        let paciente= await Patient.findOne({
            where: {id: patient_id}
        });
        return paciente;
    }

    // Crea un paciente en un hospital
    module.create = async function(hospital_id, name, surname, dni) {
        // Modificado por Ericka Zavala
        let paciente= await Patient.create({
            name: name,
            surname: surname,
            dni: dni,
            hospital_id: hospital_id
        });
        return paciente;
    }

    // Actualiza un paciente
    module.update= async function(patient_id, name, surname, dni) {
        // Modificado por Ericka Zavala
        let paciente= await Patient.update({
            name: name,
            surname: surname,
            dni: dni
        },
        {
            where: {id: patient_id}
        });
        return paciente;
    }

    // Borra un paciente
    module.delete = async function(patient_id) {
        // Modificado por Ericka Zavala
        await Patient.destroy({
            where: {id: patient_id}
        });
    }

    // Asigna un doctor y devuelve los datos del paciente
    module.assignDoctor = async function (patient_id, doctor_id) {
        // Modificado por Ericka Zavala
        Patient.belongsToMany(Doctor, {through: 'patient_doctor'});
        let paciente= await Patient.findByPk(patient_id);
        let doctor = await Doctor.build({
            id: doctor_id
        });
        await paciente.addDoctor(doctor);
        await paciente.save();
        return paciente;
    }

    // Muestras los medicos de un paciente
    module.showPatientDoctors = async function (patient_id) {
        // Modificado por Ericka Zavala
        Patient.belongsToMany(Doctor, {through: 'patient_doctor'});
        let paciente=await Patient.findByPk(patient_id);
        let doctor= await paciente.getDoctors();
        return doctor;
    }


    return module;
};