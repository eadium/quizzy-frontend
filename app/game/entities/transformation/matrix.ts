export default class Matrix {
    protected _values: Array<Array<number>>;
    protected _height: number;
    protected _width: number;

    public get Height(): number {
        return this._height;
    }

    public get Width(): number {
        return this._width;
    }

    public GetByIndex(row: number, column: number) {
        return this._values[row][column];
    }


    constructor(array: Array<number>, width: number, height: number) {
        this._width = width;
        this._height = height;
        this._values = new Array<Array<number>>();

        for(let i: number = 0; i < height; i++) {
            this._values[i] = new Array<number>(this._width);

            for(let j: number = 0; j < width; j++)
                this._values[i][j] = array[i * width + j];
        }
    }

    public DropValues() {
        for(let i: number = 0; i < this._height; i++)
            for(let j: number = 0; j < this._width; j++)
                this._values[i][j] = 0;
    }

    public static Empty(width: number, height: number) : Matrix {
        let initArray = new Array<number>(height * width);
        let matrix = new Matrix(initArray, width, height);
        matrix.DropValues();

        return matrix;
    }

    public static IsDimensionsXYMismatch(m1: Matrix, m2: Matrix) : boolean {
        return m1._height != m2._height || m1._width != m2._width;
    }

    public Add(matrix: Matrix) {
        if(Matrix.IsDimensionsXYMismatch(this, matrix))
            throw new Error("dimensions doesn't match");

        for(let i: number = 0; i < this._height; i++)
            for(let j: number = 0; j < this._width; j++)
                this._values[i][j] += matrix._values[i][j];
    }
    
    public Substract(matrix: Matrix) {
        if(Matrix.IsDimensionsXYMismatch(this, matrix))
            throw new Error("dimensions doesn't match");

        for(let i: number = 0; i < this._height; i++)
            for(let j: number = 0; j < this._width; j++)
                this._values[i][j] -= matrix._values[i][j];
    }

    public Transpose() : Matrix {
        let res = Matrix.Empty(this._height, this._width)

        for(let i: number = 0; i < this._height; i++)
            for(let j: number = 0; j < this._width; j++)
                res._values[i][j] = this._values[j][i];

        return res;
    }

    public static Sum(m1: Matrix, m2: Matrix) : Matrix {
        let res = Matrix.Empty(m1._width, m2._height);

        res.Add(m1);
        res.Add(m2);

        return res;
    }

    public static Difference(m1: Matrix, m2: Matrix) : Matrix {
        let res = Matrix.Empty(m1._width, m2._height);

        res.Substract(m1);
        res.Substract(m2);

        return res;
    }

    public static Multiply(m1: Matrix, m2: Matrix) : Matrix {
        if(m2._height != m1._width)
            throw new Error("dimensions doesn't match");

        let res: Matrix = Matrix.Empty(m2._width, m1._height);
        
        for(let i: number = 0; i < res._height; i++)
            for(let j: number = 0; j < res._width; j++){
                for(let k: number = 0; k < m2._height; k++)
                    res._values[i][j] += m1._values[i][k] * m2._values[k][j];
            }

        return res;
    }
}