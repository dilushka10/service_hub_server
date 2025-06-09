const service = require("../services/requestService");

exports.createRequest = async (req, res) => {
  try {
    const request = await service.createRequest(req.body);
    res.status(201).json({ message: "Request created", ...request });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await service.getRequestById(req.params.id);
    res.json(request);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const updated = await service.updateRequest(req.params.id, req.body);
    res.json({ message: "Request updated", ...updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const result = await service.deleteRequest(req.params.id);
    res.json({ message: "Request deleted", ...result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getRequestsByCustomer = async (req, res) => {
  try {
    const requests = await service.getRequestsByField("customerId", req.params.uid);
    res.json(requests);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getRequestsByProvider = async (req, res) => {
  try {
    const requests = await service.getRequestsByField("providerId", req.params.uid);
    res.json(requests);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
