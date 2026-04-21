import * as certService from "../services/certificate.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createCertificate = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : null,
    };

    const cert = await certService.createCertificate(data);
    return successResponse(res, cert, "Certificate created", 201);
  } catch (error) {
    return errorResponse(res, "Failed to create certificate", 500, error);
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certs = await certService.getAllCertificates();
    return successResponse(res, certs, "Certificates fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch certificates", 500, error);
  }
};

export const getCertificate = async (req, res) => {
  try {
    const cert = await certService.getCertificateById(req.params.id);

    if (!cert) {
      return errorResponse(res, "Certificate not found", 404);
    }

    return successResponse(res, cert, "Certificate fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch certificate", 500, error);
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
    };

    if (req.file) {
      data.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const cert = await certService.updateCertificate(req.params.id, data);

    if (!cert) {
      return errorResponse(res, "Certificate not found", 404);
    }

    return successResponse(res, cert, "Certificate updated");
  } catch (error) {
    return errorResponse(res, "Failed to update certificate", 500, error);
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const cert = await certService.deleteCertificate(req.params.id);

    if (!cert) {
      return errorResponse(res, "Certificate not found", 404);
    }

    return successResponse(res, null, "Certificate deleted");
  } catch (error) {
    return errorResponse(res, "Failed to delete certificate", 500, error);
  }
};
