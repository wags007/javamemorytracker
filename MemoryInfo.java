public class MemoryInfo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long maxMemory = runtime.maxMemory();
        
        System.out.println("Total Memory: " + formatBytes(totalMemory));
        System.out.println("Free Memory: " + formatBytes(freeMemory));
        System.out.println("Max Memory: " + formatBytes(maxMemory));
        System.out.println("Used Memory: " + formatBytes(totalMemory - freeMemory));
    }
    
    private static String formatBytes(long bytes) {
        final long K = 1024;
        final long M = K * K;
        final long G = M * K;
        
        if (bytes / G > 0) {
            return String.format("%.2f GB", (double) bytes / G);
        } else if (bytes / M > 0) {
            return String.format("%.2f MB", (double) bytes / M);
        } else if (bytes / K > 0) {
            return String.format("%.2f KB", (double) bytes / K);
        } else {
            return bytes + " Bytes";
        }
    }
}
