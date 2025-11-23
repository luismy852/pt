import { jest } from '@jest/globals';

// mockear módulos antes de importar las rutas (ESM)
jest.unstable_mockModule('../controllers/course.controller.js', () => ({
    getCourses: jest.fn((req, res) => {
        res.status(200).json([{ id: 1, name: 'Curso 1' }]);
    }),
      deleteCourse: jest.fn((req, res) => {
    res.status(204).json({ message: 'Curso eliminado' });
  }),
}));

jest.unstable_mockModule('../middlewares/auth.js', () => ({
    authMiddleware: (req, res, next) => next(),
    adminMiddleware: (req, res, next) => next()
}));

let request;

// importar dinámicamente después de declarar los mocks
beforeAll(async () => {
    const { default: testServer } = await import('../utils/testServer.js');
    const { default: courseRoutes } = await import('../routes/course.routes.js');
    request = testServer(courseRoutes);
});

describe("Route courses", () => {
    it("Debe retornar un 200", async () => {
        // arrange
        const expected = 200;
        // act
        const { status: result } = await request.get("/course");
        // assert
        expect(result).toEqual(expected);
    }),

    it("Debe retornar un 200", async () => {
        // arrange
        const expected = 200;
        // act
        const { status: result } = await request.get("/course/1");
        // assert
        expect(result).toEqual(expected);
    });
  
});


