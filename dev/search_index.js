var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Overview of all documented structures and functions.","category":"page"},{"location":"workspaces/#WorkSpaces","page":"Work Spaces","title":"Workspaces","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"Workspaces represent the buffers and temporary storage that are used during the computations of LAPACK functions. Upon initialization with a template matrix, work buffers will be allocated that are appropriate to be used during the factorization of matrices similar to the template, e.g. both Float64 and Float32 Matrices work, but also Complex numbers are allowed when appropriate.","category":"page"},{"location":"workspaces/#Workspace","page":"Work Spaces","title":"Workspace","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"The following convenience function is supplied in order to construct the correct Workspace for a given LAPACK function. This can then be used to perform the decompositions without extra allocations.","category":"page"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"Workspace","category":"page"},{"location":"workspaces/#FastLapackInterface.Workspace","page":"Work Spaces","title":"FastLapackInterface.Workspace","text":"Workspace(lapack_function, A)\n\nWill create the correct Workspace for the target lapack_function and matrix A.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = Workspace(LAPACK.geqrt!, A)\nQRWYWs{Float64, Matrix{Float64}}\n  work: 4-element Vector{Float64}\n  T: 2×2 Matrix{Float64}\n\n\njulia> LinearAlgebra.QRCompactWY(factorize!(ws, A)...)\nQRCompactWY{Float64, Matrix{Float64}, Matrix{Float64}}\nQ factor:\n2×2 QRCompactWYQ{Float64, Matrix{Float64}, Matrix{Float64}}:\n -0.190022  -0.98178\n -0.98178    0.190022\nR factor:\n2×2 Matrix{Float64}:\n -6.31506  -3.67692\n  0.0      -1.63102\n\n\n\n\n\n","category":"type"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"Each Workspace also has a function to resize! to allow for its use with larger matrices or with more features (e.g. the computation of left eigenvectors and right eigenvectors using EigenWs).","category":"page"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"resize!(::Workspace, ::AbstractMatrix; kwargs...)","category":"page"},{"location":"workspaces/#Base.resize!-Tuple{Workspace, AbstractMatrix}","page":"Work Spaces","title":"Base.resize!","text":"resize!(ws, A; kwargs...)\n\nResizes the ws to be appropriate for use with matrix A. The kwargs can be used to communicate which features should be supported by the Workspace, such as left and right eigenvectors while using EigenWs. This function is mainly used for automatic resizing inside LAPACK functions.\n\n\n\n\n\n","category":"method"},{"location":"workspaces/#QR-id","page":"Work Spaces","title":"QR","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"QRWs\nQRWYWs\nQRPivotedWs","category":"page"},{"location":"workspaces/#FastLapackInterface.QRWs","page":"Work Spaces","title":"FastLapackInterface.QRWs","text":"QRWs\n\nWorkspace for standard LinearAlgebra.QR factorization using the LAPACK.geqrf! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = QRWs(A)\nQRWs{Float64}\n  work: 64-element Vector{Float64}\n  τ: 2-element Vector{Float64}\n\njulia> t = QR(LAPACK.geqrf!(ws, A)...)\nQR{Float64, Matrix{Float64}, Vector{Float64}}\nQ factor:\n2×2 QRPackedQ{Float64, Matrix{Float64}, Vector{Float64}}:\n -0.190022  -0.98178\n -0.98178    0.190022\nR factor:\n2×2 Matrix{Float64}:\n -6.31506  -3.67692\n  0.0      -1.63102\n\njulia> Matrix(t)\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#FastLapackInterface.QRWYWs","page":"Work Spaces","title":"FastLapackInterface.QRWYWs","text":"QRWYWs\n\nWorkspace to be used with the LinearAlgebra.QRCompactWY representation of the blocked QR factorization which uses the LAPACK.geqrt! function. By default the blocksize for the algorithm is taken as min(36, min(size(template))), this can be overridden by using the blocksize keyword of the constructor.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = QRWYWs(A)\nQRWYWs{Float64, Matrix{Float64}}\n  work: 4-element Vector{Float64}\n  T: 2×2 Matrix{Float64}\n\njulia> t = QRCompactWY(LAPACK.geqrt!(ws, A)...)\nQRCompactWY{Float64, Matrix{Float64}, Matrix{Float64}}\nQ factor:\n2×2 QRCompactWYQ{Float64, Matrix{Float64}, Matrix{Float64}}:\n -0.190022  -0.98178\n -0.98178    0.190022\nR factor:\n2×2 Matrix{Float64}:\n -6.31506  -3.67692\n  0.0      -1.63102\n\njulia> Matrix(t)\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#FastLapackInterface.QRPivotedWs","page":"Work Spaces","title":"FastLapackInterface.QRPivotedWs","text":"QRPivotedWs\n\nWorkspace to be used with the LinearAlgebra.QRPivoted representation of the QR factorization which uses the LAPACK.geqp3! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = QRPivotedWs(A)\nQRPivotedWs{Float64}\n  work: 100-element Vector{Float64}\n  τ: 2-element Vector{Float64}\n  jpvt: 2-element Vector{Int64}\n\njulia> t = QRPivoted(LAPACK.geqp3!(ws, A)...)\nQRPivoted{Float64, Matrix{Float64}, Vector{Float64}, Vector{Int64}}\nQ factor:\n2×2 QRPackedQ{Float64, Matrix{Float64}, Vector{Float64}}:\n -0.190022  -0.98178\n -0.98178    0.190022\nR factor:\n2×2 Matrix{Float64}:\n -6.31506  -3.67692\n  0.0      -1.63102\npermutation:\n2-element Vector{Int64}:\n 1\n 2\n\njulia> Matrix(t)\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#Schur-id","page":"Work Spaces","title":"Schur","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"SchurWs\nGeneralizedSchurWs","category":"page"},{"location":"workspaces/#FastLapackInterface.SchurWs","page":"Work Spaces","title":"FastLapackInterface.SchurWs","text":"SchurWs\n\nWorkspace to be used with the LinearAlgebra.Schur representation of the Schur decomposition which uses the LAPACK.gees! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = SchurWs(A)\nSchurWs{Float64}\n  work: 68-element Vector{Float64}\n  wr: 2-element Vector{Float64}\n  wi: 2-element Vector{Float64}\n  vs: 2×2 Matrix{Float64}\n  sdim: Base.RefValue{Int64}\n  bwork: 2-element Vector{Int64}\n  eigen_values: 2-element Vector{ComplexF64}\n\njulia> t = Schur(LAPACK.gees!(ws, 'V', A)...)\nSchur{Float64, Matrix{Float64}, Vector{Float64}}\nT factor:\n2×2 Matrix{Float64}:\n -1.6695  -3.9\n  0.0      6.1695\nZ factor:\n2×2 Matrix{Float64}:\n -0.625424  -0.780285\n  0.780285  -0.625424\neigenvalues:\n2-element Vector{Float64}:\n -1.6695025194532018\n  6.169502519453203\n\njulia> Matrix(t)\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#FastLapackInterface.GeneralizedSchurWs","page":"Work Spaces","title":"FastLapackInterface.GeneralizedSchurWs","text":"GeneralizedSchurWs\n\nWorkspace to be used with the LinearAlgebra.GeneralizedSchur representation of the Generalized Schur decomposition which uses the LAPACK.gges! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> B = [8.2 0.3\n            1.7 4.3]\n2×2 Matrix{Float64}:\n 8.2  0.3\n 1.7  4.3\n\njulia> ws = GeneralizedSchurWs(A)\nGeneralizedSchurWs{Float64}\n  work: 90-element Vector{Float64}\n  αr: 2-element Vector{Float64}\n  αi: 2-element Vector{Float64}\n  β: 2-element Vector{Float64}\n  vsl: 2×2 Matrix{Float64}\n  vsr: 2×2 Matrix{Float64}\n  sdim: Base.RefValue{Int64}\n  bwork: 2-element Vector{Int64}\n  eigen_values: 2-element Vector{ComplexF64}\n  \njulia> t = GeneralizedSchur(LAPACK.gges!(ws, 'V','V', A, B)...)\nGeneralizedSchur{Float64, Matrix{Float64}, Vector{ComplexF64}, Vector{Float64}}\nS factor:\n2×2 Matrix{Float64}:\n -1.43796  1.63843\n  0.0      7.16295\nT factor:\n2×2 Matrix{Float64}:\n 5.06887  -4.00221\n 0.0       6.85558\nQ factor:\n2×2 Matrix{Float64}:\n -0.857329  0.514769\n  0.514769  0.857329\nZ factor:\n2×2 Matrix{Float64}:\n -0.560266  0.828313\n  0.828313  0.560266\nα:\n2-element Vector{ComplexF64}:\n -1.4379554610733563 + 0.0im\n   7.162947865097022 + 0.0im\nβ:\n2-element Vector{Float64}:\n 5.068865029631368\n 6.855578082442485\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#LU-id","page":"Work Spaces","title":"LU","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"LUWs","category":"page"},{"location":"workspaces/#FastLapackInterface.LUWs","page":"Work Spaces","title":"FastLapackInterface.LUWs","text":"LUWs\n\nWorkspace to be used with the LinearAlgebra.LU representation of the LU factorization which uses the LAPACK.getrf! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = LUWs(A)\nLUWs\n  ipiv: 2-element Vector{Int64}\n\njulia> t = LU(LAPACK.getrf!(ws, A)...)\nLU{Float64, Matrix{Float64}, Vector{Int64}}\nL factor:\n2×2 Matrix{Float64}:\n 1.0       0.0\n 0.193548  1.0\nU factor:\n2×2 Matrix{Float64}:\n 6.2  3.3\n 0.0  1.66129\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#Eigen-id","page":"Work Spaces","title":"Eigen","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"EigenWs\nHermitianEigenWs\nGeneralizedEigenWs","category":"page"},{"location":"workspaces/#FastLapackInterface.EigenWs","page":"Work Spaces","title":"FastLapackInterface.EigenWs","text":"EigenWs\n\nWorkspace for LinearAlgebra.Eigen factorization using the LAPACK.geevx! function.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = EigenWs(A, rvecs=true)\nEigenWs{Float64, Matrix{Float64}, Float64}\n  work: 260-element Vector{Float64}\n  rwork: 2-element Vector{Float64}\n  VL: 0×2 Matrix{Float64}\n  VR: 2×2 Matrix{Float64}\n  W: 2-element Vector{Float64}\n  scale: 2-element Vector{Float64}\n  iwork: 0-element Vector{Int64}\n  rconde: 0-element Vector{Float64}\n  rcondv: 0-element Vector{Float64}\n\n\njulia> t = LAPACK.geevx!(ws, 'N', 'N', 'V', 'N', A);\n\njulia> LinearAlgebra.Eigen(t[2], t[5])\nEigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}\nvalues:\n2-element Vector{Float64}:\n -1.6695025194532018\n  6.169502519453203\nvectors:\n2×2 Matrix{Float64}:\n -0.625424  -0.420019\n  0.780285  -0.907515\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#FastLapackInterface.HermitianEigenWs","page":"Work Spaces","title":"FastLapackInterface.HermitianEigenWs","text":"HermitianEigenWs\n\nWorkspace to be used with Hermitian diagonalization using the LAPACK.syevr! function. Supports both Real and Complex Hermitian matrices.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> ws = HermitianEigenWs(A, vecs=true)\nHermitianEigenWs{Float64, Matrix{Float64}, Float64}\n  work: 66-element Vector{Float64}\n  rwork: 0-element Vector{Float64}\n  iwork: 20-element Vector{Int64}\n  w: 2-element Vector{Float64}\n  Z: 2×2 Matrix{Float64}\n  isuppz: 4-element Vector{Int64}\n\n\njulia> LinearAlgebra.Eigen(LAPACK.syevr!(ws, 'V', 'A', 'U', A, 0.0, 0.0, 0, 0, 1e-6)...)\nEigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}\nvalues:\n2-element Vector{Float64}:\n -0.2783393759541063\n  4.778339375954106\nvectors:\n2×2 Matrix{Float64}:\n -0.841217  0.540698\n  0.540698  0.841217\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#FastLapackInterface.GeneralizedEigenWs","page":"Work Spaces","title":"FastLapackInterface.GeneralizedEigenWs","text":"GeneralizedEigenWs\n\nWorkspace that can be used for LinearAlgebra.GeneralizedEigen factorization using LAPACK.ggev!. Supports Real and Complex matrices.\n\nExamples\n\njulia> A = [1.2 2.3\n            6.2 3.3]\n2×2 Matrix{Float64}:\n 1.2  2.3\n 6.2  3.3\n\njulia> B = [8.2 1.7\n            5.9 2.1]\n2×2 Matrix{Float64}:\n 8.2  1.7\n 5.9  2.1\n\njulia> ws = GeneralizedEigenWs(A, rvecs=true)\nGeneralizedEigenWs{Float64, Matrix{Float64}, Float64}\n  work: 78-element Vector{Float64}\n  vl: 0×2 Matrix{Float64}\n  vr: 2×2 Matrix{Float64}\n  αr: 2-element Vector{Float64}\n  αi: 2-element Vector{Float64}\n  β: 2-element Vector{Float64}\n\n\njulia> αr, αi, β, _, vr = LAPACK.ggev!(ws, 'N', 'V', A, B);\n\njulia> LinearAlgebra.GeneralizedEigen(αr ./ β, vr)\nGeneralizedEigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}\nvalues:\n2-element Vector{Float64}:\n -0.8754932558185097\n  1.6362721153456299\nvectors:\n2×2 Matrix{Float64}:\n -0.452121  -0.0394242\n  1.0        1.0\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#BunchKaufman-id","page":"Work Spaces","title":"BunchKaufman","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"BunchKaufmanWs","category":"page"},{"location":"workspaces/#FastLapackInterface.BunchKaufmanWs","page":"Work Spaces","title":"FastLapackInterface.BunchKaufmanWs","text":"BunchKaufmanWs\n\nWorkspace for LinearAlgebra.BunchKaufman factorization using the LAPACK.sytrf! or LAPACK.sytrf_rook! functions for symmetric matrices, and LAPACK.hetrf! or LAPACK.hetrf_rook! functions for hermitian matrices (e.g. with ComplexF64 or ComplexF32 elements).\n\nExamples\n\njulia> A = [1.2 7.8\n            7.8 3.3]\n2×2 Matrix{Float64}:\n 1.2  7.8\n 7.8  3.3\n\njulia> ws = BunchKaufmanWs(A)\nBunchKaufmanWs{Float64}\n  work: 128-element Vector{Float64}\n  ipiv: 2-element Vector{Int64}\n\n\njulia> A, ipiv, info = LAPACK.sytrf!(ws, 'U', A)\n([1.2 7.8; 7.8 3.3], [-1, -1], 0)\n\njulia> t = LinearAlgebra.BunchKaufman(A, ipiv,'U', true, false, info)\nBunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}\nD factor:\n2×2 Tridiagonal{Float64, Vector{Float64}}:\n 1.2  7.8\n 7.8  3.3\nU factor:\n2×2 UnitUpperTriangular{Float64, Matrix{Float64}}:\n 1.0  0.0\n  ⋅   1.0\npermutation:\n2-element Vector{Int64}:\n 1\n 2\n\njulia> A = [1.2 7.8\n            7.8 3.3]\n2×2 Matrix{Float64}:\n 1.2  7.8\n 7.8  3.3\n\njulia> ws = BunchKaufmanWs(A)\nBunchKaufmanWs{Float64}\n  work: 128-element Vector{Float64}\n  ipiv: 2-element Vector{Int64}\n\n\njulia> A, ipiv, info = LAPACK.sytrf_rook!(ws, 'U', A)\n([1.2 7.8; 7.8 3.3], [-1, -2], 0)\n\njulia> t = LinearAlgebra.BunchKaufman(A, ipiv,'U', true, true, info)\nBunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}\nD factor:\n2×2 Tridiagonal{Float64, Vector{Float64}}:\n 1.2  7.8\n 7.8  3.3\nU factor:\n2×2 UnitUpperTriangular{Float64, Matrix{Float64}}:\n 1.0  0.0\n  ⋅   1.0\npermutation:\n2-element Vector{Int64}:\n 1\n 2\n\n\n\n\n\n","category":"type"},{"location":"workspaces/#Cholesky-id","page":"Work Spaces","title":"Cholesky","text":"","category":"section"},{"location":"workspaces/","page":"Work Spaces","title":"Work Spaces","text":"CholeskyPivotedWs","category":"page"},{"location":"workspaces/#FastLapackInterface.CholeskyPivotedWs","page":"Work Spaces","title":"FastLapackInterface.CholeskyPivotedWs","text":"CholeskyPivotedWs\n\nWorkspace for LinearAlgebra.CholeskyPivoted factorization using the LAPACK.pstrf! function. The standard LinearAlgebra.Cholesky uses LAPACK.potrf! which is non-allocating and does not require a separate Workspace.\n\nExamples\n\njulia> A = [1.2 7.8\n            7.8 3.3]\n2×2 Matrix{Float64}:\n 1.2  7.8\n 7.8  3.3\n\njulia> ws = CholeskyPivotedWs(A)\nCholeskyPivotedWs{Float64}\n  work: 4-element Vector{Float64}\n  piv: 2-element Vector{Int64}\n\n\njulia> AA, piv, rank, info = LAPACK.pstrf!(ws, 'U', A, 1e-6)\n([1.816590212458495 4.293758683992806; 7.8 -17.236363636363635], [2, 1], 1, 1)\n\njulia> CholeskyPivoted(AA, 'U', piv, rank, 1e-6, info)\nCholeskyPivoted{Float64, Matrix{Float64}, Vector{Int64}}\nU factor with rank 1:\n2×2 UpperTriangular{Float64, Matrix{Float64}}:\n 1.81659    4.29376\n  ⋅       -17.2364\npermutation:\n2-element Vector{Int64}:\n 2\n 1\n\n\n\n\n\n","category":"type"},{"location":"LAPACK/#LAPACK","page":"LAPACK","title":"LAPACK","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"This section details the LAPACK functions that are supported for use with various Workspaces. Each function has a resize keyword argument that is true by default, allowing for automatic resizing of the workspaces to accomodate larger Matrices or different features than they were originally constructed for.","category":"page"},{"location":"LAPACK/#Unified-Interface","page":"LAPACK","title":"Unified Interface","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"After having created the Workspace that corresponds to the targeted factorization or decomposition, one of the following two aliases can be used to dispatch the call to the correct LAPACK function.","category":"page"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"decompose!\nfactorize!","category":"page"},{"location":"LAPACK/#FastLapackInterface.decompose!","page":"LAPACK","title":"FastLapackInterface.decompose!","text":"decompose!(ws, args...)\n\nWill use the previously created Workspace ws to dispatch to the correct LAPACK call.  \n\n\n\n\n\n","category":"function"},{"location":"LAPACK/#FastLapackInterface.factorize!","page":"LAPACK","title":"FastLapackInterface.factorize!","text":"factorize!(ws, args...)\n\nAlias for decompose!.\n\n\n\n\n\n","category":"function"},{"location":"LAPACK/#QR","page":"LAPACK","title":"QR","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.geqrf!(::QRWs, ::AbstractMatrix)\nLinearAlgebra.LAPACK.ormqr!(::QRWs, ::AbstractChar, ::AbstractChar, ::AbstractMatrix, ::AbstractVecOrMat)\nLinearAlgebra.LAPACK.geqrt!(::QRWYWs, ::AbstractMatrix)\nLinearAlgebra.LAPACK.geqp3!(::QRPivotedWs, ::AbstractMatrix)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.geqrf!-Tuple{QRWs, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.geqrf!","text":"geqrf!(ws, A; resize=true) -> (A, ws.τ)\n\nCompute the QR factorization of A, A = QR, using previously allocated QRWs workspace ws. ws.τ contains scalars which parameterize the elementary reflectors of the factorization. ws.τ must have length greater than or equal to the smallest dimension of A. If this is not the case, and resize==true the workspace will be automatically resized to the appropriate size.\n\nA and ws.τ modified in-place.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.ormqr!-Tuple{QRWs, AbstractChar, AbstractChar, AbstractMatrix, AbstractVecOrMat}","page":"LAPACK","title":"LinearAlgebra.LAPACK.ormqr!","text":"ormqr!(ws, side, trans, A, C) -> C\n\nComputes Q * C (trans = N), transpose(Q) * C (trans = T), adjoint(Q) * C (trans = C) for side = L or the equivalent right-sided multiplication for side = R using Q from a QR factorization of A computed using geqrf!. Uses preallocated workspace ws and the factors are assumed to be stored in ws.τ. C is overwritten.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.geqrt!-Tuple{QRWYWs, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.geqrt!","text":"geqrt!(ws, A; resize=true) -> (A, ws.T)\n\nCompute the blocked QR factorization of A, A = QR, using a preallocated QRWYWs workspace ws. ws.T contains upper triangular block reflectors which parameterize the elementary reflectors of the factorization. The first dimension of ws.T sets the block size and it must satisfy 1 <= size(ws.T, 1) <= min(size(A)...). The second dimension of T must equal the smallest dimension of A, i.e. size(ws.T, 2) == size(A, 2). If this is not the case and resize==true, the workspace will automatically be resized to the appropriate dimensions.\n\nA and ws.T are modified in-place.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.geqp3!-Tuple{QRPivotedWs, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.geqp3!","text":"geqp3!(ws, A; resize=true) -> (A, ws.τ, ws.jpvt)\n\nCompute the pivoted QR factorization of A, AP = QR using BLAS level 3, using the preallocated QRPivotedWs workspace ws. P is a pivoting matrix, represented by ws.jpvt. ws.τ stores the elementary reflectors. ws.jpvt must have length greater than or equal to n if A is an (m x n) matrix and ws.τ must have length greater than or equal to the smallest dimension of A. If this is not the case and resize == true the workspace will be appropriately resized.\n\nA, ws.jpvt, and ws.τ are modified in-place.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#Schur","page":"LAPACK","title":"Schur","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.gees!(::SchurWs, ::AbstractChar, ::AbstractMatrix)\nLinearAlgebra.LAPACK.gges!(::GeneralizedSchurWs, ::AbstractChar, ::AbstractChar, ::AbstractMatrix, ::AbstractMatrix)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.gees!-Tuple{SchurWs, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.gees!","text":"gees!(ws, jobvs, A; select=nothing, resize=true) -> (A, vs, ws.eigen_values)\n\nComputes the eigenvalues (jobvs = N) or the eigenvalues and Schur vectors (jobvs = V) of matrix A, using the preallocated SchurWs worspace ws. If ws is not of the appropriate size and resize==true it will be resized for A.  A is overwritten by its Schur form, and ws.eigen_values is overwritten with the eigenvalues.\n\nIt is possible to specify select, a function used to sort the eigenvalues during the decomponsition. The function should have the signature f(wr::T, wi::T) -> Bool, where wr and wi are the real and imaginary parts of the eigenvalue, and T == eltype(A). \n\nReturns A, vs containing the Schur vectors, and ws.eigen_values.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.gges!-Tuple{GeneralizedSchurWs, AbstractChar, AbstractChar, AbstractMatrix, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.gges!","text":"gges!(ws, jobvsl, jobvsr, A, B; select=nothing, resize=true) -> (A, B, ws.eigen_values, ws.β, ws.vsl, ws.vsr)\n\nComputes the generalized eigenvalues, generalized Schur form, left Schur vectors (jobsvl = V), or right Schur vectors (jobvsr = V) of A and B, using preallocated GeneralizedSchurWs workspace ws. If ws is not of the right size, and resize==true it will be resized appropriately.\n\nIt is possible to specify select, a function used to sort the eigenvalues during the decomposition. The function should have the signature f(αr::T, αi::T, β::T) -> Bool, where αr and αi are the real and imaginary parts of the eigenvalue, β the factor, and `T == eltype(A). \n\nThe generalized eigenvalues are returned in ws.eigen_values and ws.β. The left Schur vectors are returned in ws.vsl and the right Schur vectors are returned in ws.vsr.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LU","page":"LAPACK","title":"LU","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.getrf!(::LUWs, ::AbstractMatrix)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.getrf!-Tuple{LUWs, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.getrf!","text":"getrf!(ws, A; resize=true) -> (A, ws.ipiv, info)\n\nCompute the pivoted LU factorization of A, A = LU, using the preallocated LUWs workspace ws. If the workspace is too small and resize==true it will be resized appropriately for A.\n\nReturns A, modified in-place, ws.ipiv, the pivoting information, and the ws.info code which indicates success (info = 0), a singular value in U (info = i, in which case U[i,i] is singular), or an error code (info < 0).\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#Eigen","page":"LAPACK","title":"Eigen","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.geevx!(::EigenWs, ::AbstractChar, ::AbstractChar, ::AbstractChar, ::AbstractChar, ::AbstractMatrix)\nLinearAlgebra.LAPACK.syevr!(::HermitianEigenWs, ::AbstractChar, ::AbstractChar,\n       ::AbstractChar, ::AbstractMatrix, ::AbstractFloat, ::AbstractFloat, ::Integer, ::Integer,\n       ::AbstractFloat)\nLinearAlgebra.LAPACK.ggev!(::GeneralizedEigenWs, ::AbstractChar, ::AbstractChar, ::AbstractMatrix,\n      ::AbstractMatrix)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.geevx!-Tuple{EigenWs, AbstractChar, AbstractChar, AbstractChar, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.geevx!","text":"geevx!(ws, balanc, jobvl, jobvr, sense, A; resize=true) -> (A, ws.W, [ws.rwork,] ws.VL, ws.VR, ilo, ihi, ws.scale, abnrm, ws.rconde, ws.rcondv)\n\nFinds the eigensystem of A with matrix balancing using a preallocated EigenWs. If jobvl = N, the left eigenvectors of A aren't computed. If jobvr = N, the right eigenvectors of A aren't computed. If jobvl = V or jobvr = V, the corresponding eigenvectors are computed. If balanc = N, no balancing is performed. If balanc = P, A is permuted but not scaled. If balanc = S, A is scaled but not permuted. If balanc = B, A is permuted and scaled. If sense = N, no reciprocal condition numbers are computed. If sense = E, reciprocal condition numbers are computed for the eigenvalues only. If sense = V, reciprocal condition numbers are computed for the right eigenvectors only. If sense = B, reciprocal condition numbers are computed for the right eigenvectors and the eigenvectors. If sense = E,B, the right and left eigenvectors must be computed. ws.rwork is only returned in the Real case. If ws does not have the appropriate size for A and the work to be done, if resize=true, it will be automatically resized accordingly. \n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.syevr!-Tuple{HermitianEigenWs, AbstractChar, AbstractChar, AbstractChar, AbstractMatrix, AbstractFloat, AbstractFloat, Integer, Integer, AbstractFloat}","page":"LAPACK","title":"LinearAlgebra.LAPACK.syevr!","text":"syevr!(ws, jobz, range, uplo, A, vl, vu, il, iu, abstol; resize=true) -> (ws.W, ws.Z)\n\nFinds the eigenvalues (jobz = N) or eigenvalues and eigenvectors (jobz = V) of a symmetric matrix A using a preallocated HermitianEigenWs. If the workspace is not appropriate for A and resize==true it will be automatically resized. If uplo = U, the upper triangle of A is used. If uplo = L, the lower triangle of A is used. If range = A, all the eigenvalues are found. If range = V, the eigenvalues in the half-open interval (vl, vu] are found. If range = I, the eigenvalues with indices between il and iu are found. abstol can be set as a tolerance for convergence.\n\nThe eigenvalues are returned as ws.W and the eigenvectors in ws.Z.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.ggev!-Tuple{GeneralizedEigenWs, AbstractChar, AbstractChar, AbstractMatrix, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.ggev!","text":"ggev!(ws, jobvl, jobvr, A, B; resize=true) -> (ws.αr, [ws.αi,], ws.β, ws.vl, ws.vr)\n\nFinds the generalized eigendecomposition of A and B usin a preallocated GeneralizedEigenWs. If the workspace is not appropriately sized and resize == true, it will automatically be resized. If jobvl = N, the left eigenvectors aren't computed. If jobvr = N, the right eigenvectors aren't computed. If jobvl = V or jobvr = V, the corresponding eigenvectors are computed. ws.αi is only returned in the Real case.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#BunchKaufman","page":"LAPACK","title":"BunchKaufman","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.sytrf!(::BunchKaufmanWs, ::AbstractChar, ::AbstractMatrix)\nLinearAlgebra.LAPACK.sytrf_rook!(::BunchKaufmanWs, ::AbstractChar, ::AbstractMatrix)\nLinearAlgebra.LAPACK.hetrf!(::BunchKaufmanWs, ::AbstractChar, ::AbstractMatrix)\nLinearAlgebra.LAPACK.hetrf_rook!(::BunchKaufmanWs, ::AbstractChar, ::AbstractMatrix)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.sytrf!-Tuple{BunchKaufmanWs, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.sytrf!","text":"sytrf!(ws, uplo, A; resize=true) -> (A, ws.ipiv, info)\n\nComputes the Bunch-Kaufman factorization of a symmetric matrix A, using previously allocated workspace ws. If the workspace was too small and resize==true it will automatically resized. If uplo = U, the upper half of A is stored. If uplo = L, the lower half is stored.\n\nReturns A, overwritten by the factorization, a pivot vector ws.ipiv, and the error code info which is a non-negative integer. If info is positive the matrix is singular and the diagonal part of the factorization is exactly zero at position info.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.sytrf_rook!-Tuple{BunchKaufmanWs, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.sytrf_rook!","text":"sytrf_rook!(ws, uplo, A; resize=true) -> (A, ws.ipiv, info)\n\nSimilar to sytrf! but using the bounded (\"rook\") diagonal pivoting method.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.hetrf!-Tuple{BunchKaufmanWs, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.hetrf!","text":"hetrf!(ws, uplo, A; resize=true) -> (A, ws.ipiv, info)\n\nSimilar as sytrf! but for Hermitian matrices.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#LinearAlgebra.LAPACK.hetrf_rook!-Tuple{BunchKaufmanWs, AbstractChar, AbstractMatrix}","page":"LAPACK","title":"LinearAlgebra.LAPACK.hetrf_rook!","text":"hetrf_rook!(ws, uplo, A; resize=true) -> (A, ws.ipiv, info)\n\nSimilar to hetrf! but using the bounded (\"rook\") diagonal pivoting method.\n\n\n\n\n\n","category":"method"},{"location":"LAPACK/#Cholesky","page":"LAPACK","title":"Cholesky","text":"","category":"section"},{"location":"LAPACK/","page":"LAPACK","title":"LAPACK","text":"LinearAlgebra.LAPACK.pstrf!(::CholeskyPivotedWs, ::AbstractChar, ::AbstractMatrix, ::Real)","category":"page"},{"location":"LAPACK/#LinearAlgebra.LAPACK.pstrf!-Tuple{CholeskyPivotedWs, AbstractChar, AbstractMatrix, Real}","page":"LAPACK","title":"LinearAlgebra.LAPACK.pstrf!","text":"pstrf!(ws, uplo, A, tol; resize=true) -> (A, ws.piv, rank, info)\n\nComputes the (upper if uplo = U, lower if uplo = L) pivoted Cholesky decomposition of positive-definite matrix A with a user-set tolerance tol, using a preallocated CholeskyPivotedWs. If the workspace was too small and resize==true it will be automatically resized. A is overwritten by its Cholesky decomposition.\n\nReturns A, the pivots piv, the rank of A, and an info code. If info = 0, the factorization succeeded. If info = i > 0, then A is indefinite or rank-deficient.\n\n\n\n\n\n","category":"method"},{"location":"#man-fastlapack","page":"Home","title":"Fast Lapack Interface","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The goal of FastLapackInterface is to eliminate any temporary allocations when using certain LAPACK functions compared to Base julia. This is achieved by providing some Workspaces that can then be used during the computation of LAPACK functions. Eliminating most of the allocations not only improves the computation time of the functions, but dramatically improves GC impact when performing multithreaded workloads.","category":"page"},{"location":"","page":"Home","title":"Home","text":"note: Note\nFor now the target functionality is limited to QR, Schur, LU, Eigen, Bunch-Kaufman, and CholeskyPivoted related decompositions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"DocTestSetup = quote\n    using LinearAlgebra, FastLapackInterface\n    using LinearAlgebra: LAPACK\nend","category":"page"}]
}
