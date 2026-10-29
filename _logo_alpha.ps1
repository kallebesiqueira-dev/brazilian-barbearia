Add-Type -AssemblyName System.Drawing

# rodar com Windows PowerShell 5.1 (powershell.exe): System.Drawing nativo do .NET Framework
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class LogoAlpha {
  // Converte o fundo escuro em transparencia: luminancia abaixo de 'lo' vira
  // alfa 0, acima de 'hi' vira opaco, rampa suave (smoothstep) no meio.
  public static void Process(string inPath, string outPath, int lo, int hi) {
    using (var src = new Bitmap(inPath))
    using (var dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb)) {
      var rect = new Rectangle(0, 0, src.Width, src.Height);
      var sd = src.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
      var dd = dst.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
      int bytes = Math.Abs(sd.Stride) * src.Height;
      byte[] buf = new byte[bytes];
      Marshal.Copy(sd.Scan0, buf, 0, bytes);
      for (int i = 0; i < bytes; i += 4) {
        int b = buf[i], g = buf[i + 1], r = buf[i + 2];
        int m = Math.Max(r, Math.Max(g, b));
        if (m <= lo) { buf[i] = buf[i + 1] = buf[i + 2] = 0; buf[i + 3] = 0; continue; }
        double t = m >= hi ? 1.0 : (m - lo) / (double)(hi - lo);
        t = t * t * (3 - 2 * t); // smoothstep: esmaga residuo do fundo, preserva o grafico
        double s = 255.0 / m;    // "unmultiply": devolve a cor plena ao pixel semitransparente
        buf[i]     = (byte)Math.Min(255, (int)Math.Round(b * s));
        buf[i + 1] = (byte)Math.Min(255, (int)Math.Round(g * s));
        buf[i + 2] = (byte)Math.Min(255, (int)Math.Round(r * s));
        buf[i + 3] = (byte)Math.Round(255 * t);
      }
      Marshal.Copy(buf, 0, dd.Scan0, bytes);
      src.UnlockBits(sd);
      dst.UnlockBits(dd);
      dst.Save(outPath, ImageFormat.Png);
    }
  }
}
"@

[LogoAlpha]::Process(
  (Join-Path $PWD 'img\logo.jpeg'),
  (Join-Path $PWD 'img\logo-hero.png'),
  50, 140)
"gerado: $((Get-Item 'img\logo-hero.png').Length / 1KB) KB"
